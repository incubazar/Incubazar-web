import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { DocumentGenerator } from '@/lib/documents/generator'
import { generateSAFETemplate, SAFETemplate } from '@/lib/documents/templates/safe'
import { generatePAS4Template, PAS4Template } from '@/lib/documents/templates/pas4'
import { logger } from '@/lib/logger'

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    
    // Check authentication
    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { documentType, dealId, investorId } = await request.json()

    if (!documentType || !dealId) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 })
    }

    // Get deal information
    const { data: deal, error: dealError } = await supabase
      .from('startup_deals')
      .select(`
        *,
        founder_profiles (
          startup_name,
          user_id,
          users!user_id (
            full_name,
            email
          )
        )
      `)
      .eq('id', dealId)
      .single()

    if (dealError || !deal) {
      return NextResponse.json({ error: 'Deal not found' }, { status: 404 })
    }

    // Get investor information if provided
    let investorData = null
    if (investorId) {
      const { data: investor } = await supabase
        .from('investor_profiles')
        .select(`
          *,
          users!user_id (
            full_name,
            email
          )
        `)
        .eq('id', investorId)
        .single()
      
      investorData = investor
    }

    let pdfBuffer: Uint8Array
    let documentUrl: string

    if (documentType === 'safe') {
      if (!investorData) {
        return NextResponse.json({ error: 'Investor information required for SAFE' }, { status: 400 })
      }

      const safeData: SAFETemplate = {
        companyName: deal.founder_profiles.startup_name,
        founderName: deal.founder_profiles.users.full_name,
        founderEmail: deal.founder_profiles.users.email,
        investorName: investorData.users.full_name,
        investorEmail: investorData.users.email,
        investmentAmount: deal.min_investment,
        valuationCap: deal.fundraising_goal,
        discountRate: 20, // Default discount rate
        date: new Date().toLocaleDateString('en-IN'),
        companyAddress: 'Registered Office Address', // This should come from company profile
        investorAddress: 'Investor Address' // This should come from investor profile
      }

      pdfBuffer = await DocumentGenerator.generateSAFE(safeData)
    } else if (documentType === 'pas4') {
      if (!investorData) {
        return NextResponse.json({ error: 'Investor information required for PAS-4' }, { status: 400 })
      }

      const pas4Data: PAS4Template = {
        companyName: deal.founder_profiles.startup_name,
        companyAddress: 'Registered Office Address', // This should come from company profile
        incorporationNumber: 'CIN123456789', // This should come from company profile
        dateOfIncorporation: '2023-01-01', // This should come from company profile
        authorizedCapital: 10000000,
        paidUpCapital: 1000000,
        investorName: investorData.users.full_name,
        investorAddress: 'Investor Address', // This should come from investor profile
        investorPAN: 'ABCDE1234F', // This should come from investor profile
        investmentAmount: deal.min_investment,
        numberOfShares: Math.floor(deal.min_investment / 10), // Assuming ₹10 face value
        faceValue: 10,
        premium: 90, // Assuming ₹100 per share with ₹10 face value
        totalConsideration: deal.min_investment,
        date: new Date().toLocaleDateString('en-IN'),
        place: 'Mumbai'
      }

      pdfBuffer = await DocumentGenerator.generatePAS4(pas4Data)
    } else {
      return NextResponse.json({ error: 'Invalid document type' }, { status: 400 })
    }

    // Upload PDF to Supabase Storage
    const fileName = `${documentType}_${dealId}_${Date.now()}.pdf`
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('documents')
      .upload(fileName, pdfBuffer, {
        contentType: 'application/pdf',
        upsert: false
      })

    if (uploadError) {
      return NextResponse.json({ error: 'Failed to upload document' }, { status: 500 })
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('documents')
      .getPublicUrl(fileName)

    documentUrl = urlData.publicUrl

    // Save document record to database
    const { data: documentRecord, error: documentError } = await supabase
      .from('generated_documents')
      .insert({
        startup_deal_id: dealId,
        document_type: documentType,
        document_url: documentUrl,
        signature_status: 'draft'
      })
      .select()
      .single()

    if (documentError) {
      return NextResponse.json({ error: 'Failed to save document record' }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      document: {
        id: documentRecord.id,
        type: documentType,
        url: documentUrl,
        status: 'draft'
      }
    })

  } catch (error) {
    logger.error('Document generation failed', error as Error, {
      component: 'DOCUMENTS',
      action: 'GENERATE'
    })
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}