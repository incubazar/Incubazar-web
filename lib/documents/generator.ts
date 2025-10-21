import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'
import { generateSAFETemplate, SAFETemplate } from './templates/safe'
import { generatePAS4Template, PAS4Template } from './templates/pas4'

export class DocumentGenerator {
  /**
   * Generate a SAFE agreement PDF
   */
  static async generateSAFE(data: SAFETemplate): Promise<Uint8Array> {
    const pdfDoc = await PDFDocument.create()
    const page = pdfDoc.addPage([595.28, 841.89]) // A4 size
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
    
    const { width, height } = page.getSize()
    const margin = 50
    const lineHeight = 20
    let yPosition = height - margin
    
    // Title
    page.drawText('SIMPLE AGREEMENT FOR FUTURE EQUITY (SAFE)', {
      x: margin,
      y: yPosition,
      size: 16,
      font: boldFont,
      color: rgb(0, 0, 0),
    })
    yPosition -= lineHeight * 2
    
    // Company and Investor details
    page.drawText(`Company: ${data.companyName}`, {
      x: margin,
      y: yPosition,
      size: 12,
      font: font,
      color: rgb(0, 0, 0),
    })
    yPosition -= lineHeight
    
    page.drawText(`Founder: ${data.founderName}`, {
      x: margin,
      y: yPosition,
      size: 12,
      font: font,
      color: rgb(0, 0, 0),
    })
    yPosition -= lineHeight
    
    page.drawText(`Investor: ${data.investorName}`, {
      x: margin,
      y: yPosition,
      size: 12,
      font: font,
      color: rgb(0, 0, 0),
    })
    yPosition -= lineHeight * 2
    
    // Investment details
    page.drawText('INVESTMENT DETAILS:', {
      x: margin,
      y: yPosition,
      size: 14,
      font: boldFont,
      color: rgb(0, 0, 0),
    })
    yPosition -= lineHeight
    
    page.drawText(`Investment Amount: ₹${data.investmentAmount.toLocaleString()}`, {
      x: margin,
      y: yPosition,
      size: 12,
      font: font,
      color: rgb(0, 0, 0),
    })
    yPosition -= lineHeight
    
    page.drawText(`Valuation Cap: ₹${data.valuationCap.toLocaleString()}`, {
      x: margin,
      y: yPosition,
      size: 12,
      font: font,
      color: rgb(0, 0, 0),
    })
    yPosition -= lineHeight
    
    page.drawText(`Discount Rate: ${data.discountRate}%`, {
      x: margin,
      y: yPosition,
      size: 12,
      font: font,
      color: rgb(0, 0, 0),
    })
    yPosition -= lineHeight * 2
    
    // Terms and conditions
    const terms = [
      '1. INVESTMENT',
      'The Investor hereby agrees to invest the Investment Amount in the Company in exchange for the right to receive equity securities of the Company upon the occurrence of a Liquidity Event.',
      '',
      '2. VALUATION CAP AND DISCOUNT',
      'The conversion of this SAFE shall be subject to the Valuation Cap and Discount Rate specified above.',
      '',
      '3. CONVERSION',
      'This SAFE shall convert into equity securities of the Company upon the occurrence of a Liquidity Event.',
      '',
      '4. GOVERNING LAW',
      'This Agreement shall be governed by and construed in accordance with the laws of India.',
      '',
      '5. ENTIRE AGREEMENT',
      'This Agreement constitutes the entire agreement between the parties and supersedes all prior negotiations, representations, or agreements.'
    ]
    
    for (const term of terms) {
      if (yPosition < 100) {
        // Add new page if needed
        const newPage = pdfDoc.addPage([595.28, 841.89])
        yPosition = height - margin
        page.drawText(term, {
          x: margin,
          y: yPosition,
          size: 12,
          font: term.match(/^\d+\./) ? boldFont : font,
          color: rgb(0, 0, 0),
        })
      } else {
        page.drawText(term, {
          x: margin,
          y: yPosition,
          size: 12,
          font: term.match(/^\d+\./) ? boldFont : font,
          color: rgb(0, 0, 0),
        })
      }
      yPosition -= lineHeight
    }
    
    // Signatures
    yPosition -= lineHeight * 2
    page.drawText('IN WITNESS WHEREOF, the parties have executed this Agreement:', {
      x: margin,
      y: yPosition,
      size: 12,
      font: boldFont,
      color: rgb(0, 0, 0),
    })
    yPosition -= lineHeight * 2
    
    page.drawText('COMPANY:', {
      x: margin,
      y: yPosition,
      size: 12,
      font: boldFont,
      color: rgb(0, 0, 0),
    })
    yPosition -= lineHeight
    
    page.drawText(`${data.founderName}`, {
      x: margin,
      y: yPosition,
      size: 12,
      font: font,
      color: rgb(0, 0, 0),
    })
    yPosition -= lineHeight
    
    page.drawText(`Date: ${data.date}`, {
      x: margin,
      y: yPosition,
      size: 12,
      font: font,
      color: rgb(0, 0, 0),
    })
    yPosition -= lineHeight * 2
    
    page.drawText('INVESTOR:', {
      x: margin,
      y: yPosition,
      size: 12,
      font: boldFont,
      color: rgb(0, 0, 0),
    })
    yPosition -= lineHeight
    
    page.drawText(`${data.investorName}`, {
      x: margin,
      y: yPosition,
      size: 12,
      font: font,
      color: rgb(0, 0, 0),
    })
    yPosition -= lineHeight
    
    page.drawText(`Date: ${data.date}`, {
      x: margin,
      y: yPosition,
      size: 12,
      font: font,
      color: rgb(0, 0, 0),
    })
    
    return await pdfDoc.save()
  }
  
  /**
   * Generate a PAS-4 form PDF
   */
  static async generatePAS4(data: PAS4Template): Promise<Uint8Array> {
    const pdfDoc = await PDFDocument.create()
    const page = pdfDoc.addPage([595.28, 841.89]) // A4 size
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
    
    const { width, height } = page.getSize()
    const margin = 50
    const lineHeight = 18
    let yPosition = height - margin
    
    // Title
    page.drawText('FORM PAS-4', {
      x: margin,
      y: yPosition,
      size: 16,
      font: boldFont,
      color: rgb(0, 0, 0),
    })
    yPosition -= lineHeight
    
    page.drawText('PRIVATE PLACEMENT OFFER LETTER', {
      x: margin,
      y: yPosition,
      size: 14,
      font: boldFont,
      color: rgb(0, 0, 0),
    })
    yPosition -= lineHeight * 2
    
    // Company details
    page.drawText('COMPANY DETAILS:', {
      x: margin,
      y: yPosition,
      size: 12,
      font: boldFont,
      color: rgb(0, 0, 0),
    })
    yPosition -= lineHeight
    
    page.drawText(`Company Name: ${data.companyName}`, {
      x: margin,
      y: yPosition,
      size: 11,
      font: font,
      color: rgb(0, 0, 0),
    })
    yPosition -= lineHeight
    
    page.drawText(`CIN: ${data.incorporationNumber}`, {
      x: margin,
      y: yPosition,
      size: 11,
      font: font,
      color: rgb(0, 0, 0),
    })
    yPosition -= lineHeight
    
    page.drawText(`Registered Office: ${data.companyAddress}`, {
      x: margin,
      y: yPosition,
      size: 11,
      font: font,
      color: rgb(0, 0, 0),
    })
    yPosition -= lineHeight
    
    page.drawText(`Date of Incorporation: ${data.dateOfIncorporation}`, {
      x: margin,
      y: yPosition,
      size: 11,
      font: font,
      color: rgb(0, 0, 0),
    })
    yPosition -= lineHeight
    
    page.drawText(`Authorized Capital: ₹${data.authorizedCapital.toLocaleString()}`, {
      x: margin,
      y: yPosition,
      size: 11,
      font: font,
      color: rgb(0, 0, 0),
    })
    yPosition -= lineHeight
    
    page.drawText(`Paid-up Capital: ₹${data.paidUpCapital.toLocaleString()}`, {
      x: margin,
      y: yPosition,
      size: 11,
      font: font,
      color: rgb(0, 0, 0),
    })
    yPosition -= lineHeight * 2
    
    // Investment details
    page.drawText('INVESTMENT DETAILS:', {
      x: margin,
      y: yPosition,
      size: 12,
      font: boldFont,
      color: rgb(0, 0, 0),
    })
    yPosition -= lineHeight
    
    page.drawText(`Investment Amount: ₹${data.investmentAmount.toLocaleString()}`, {
      x: margin,
      y: yPosition,
      size: 11,
      font: font,
      color: rgb(0, 0, 0),
    })
    yPosition -= lineHeight
    
    page.drawText(`Number of Shares: ${data.numberOfShares.toLocaleString()}`, {
      x: margin,
      y: yPosition,
      size: 11,
      font: font,
      color: rgb(0, 0, 0),
    })
    yPosition -= lineHeight
    
    page.drawText(`Face Value per Share: ₹${data.faceValue}`, {
      x: margin,
      y: yPosition,
      size: 11,
      font: font,
      color: rgb(0, 0, 0),
    })
    yPosition -= lineHeight
    
    page.drawText(`Premium per Share: ₹${data.premium}`, {
      x: margin,
      y: yPosition,
      size: 11,
      font: font,
      color: rgb(0, 0, 0),
    })
    yPosition -= lineHeight
    
    page.drawText(`Total Consideration: ₹${data.totalConsideration.toLocaleString()}`, {
      x: margin,
      y: yPosition,
      size: 11,
      font: font,
      color: rgb(0, 0, 0),
    })
    yPosition -= lineHeight * 2
    
    // Terms and conditions
    page.drawText('TERMS AND CONDITIONS:', {
      x: margin,
      y: yPosition,
      size: 12,
      font: boldFont,
      color: rgb(0, 0, 0),
    })
    yPosition -= lineHeight
    
    const terms = [
      '1. This offer is made to a maximum of 200 persons in aggregate in a financial year.',
      '2. The minimum investment amount is ₹' + data.investmentAmount.toLocaleString() + '.',
      '3. The shares will be issued at a premium of ₹' + data.premium + ' per share.',
      '4. The investor must be a resident of India.',
      '5. The investor must provide PAN and other KYC documents.'
    ]
    
    for (const term of terms) {
      if (yPosition < 100) {
        const newPage = pdfDoc.addPage([595.28, 841.89])
        yPosition = height - margin
      }
      
      page.drawText(term, {
        x: margin,
        y: yPosition,
        size: 10,
        font: font,
        color: rgb(0, 0, 0),
      })
      yPosition -= lineHeight
    }
    
    // Compliance section
    yPosition -= lineHeight
    page.drawText('COMPLIANCE:', {
      x: margin,
      y: yPosition,
      size: 12,
      font: boldFont,
      color: rgb(0, 0, 0),
    })
    yPosition -= lineHeight
    
    const compliance = [
      'This private placement is being made in compliance with:',
      '- Section 42 of the Companies Act, 2013',
      '- Rule 14 of the Companies (Prospectus and Allotment of Securities) Rules, 2014',
      '- SEBI (Issue of Capital and Disclosure Requirements) Regulations, 2018'
    ]
    
    for (const item of compliance) {
      if (yPosition < 100) {
        const newPage = pdfDoc.addPage([595.28, 841.89])
        yPosition = height - margin
      }
      
      page.drawText(item, {
        x: margin,
        y: yPosition,
        size: 10,
        font: font,
        color: rgb(0, 0, 0),
      })
      yPosition -= lineHeight
    }
    
    // Signatures
    yPosition -= lineHeight * 2
    page.drawText('INVESTOR ACCEPTANCE:', {
      x: margin,
      y: yPosition,
      size: 12,
      font: boldFont,
      color: rgb(0, 0, 0),
    })
    yPosition -= lineHeight * 2
    
    page.drawText(`Name: ${data.investorName}`, {
      x: margin,
      y: yPosition,
      size: 11,
      font: font,
      color: rgb(0, 0, 0),
    })
    yPosition -= lineHeight
    
    page.drawText(`Address: ${data.investorAddress}`, {
      x: margin,
      y: yPosition,
      size: 11,
      font: font,
      color: rgb(0, 0, 0),
    })
    yPosition -= lineHeight
    
    page.drawText(`PAN: ${data.investorPAN}`, {
      x: margin,
      y: yPosition,
      size: 11,
      font: font,
      color: rgb(0, 0, 0),
    })
    yPosition -= lineHeight
    
    page.drawText(`Investment Amount: ₹${data.investmentAmount.toLocaleString()}`, {
      x: margin,
      y: yPosition,
      size: 11,
      font: font,
      color: rgb(0, 0, 0),
    })
    yPosition -= lineHeight * 2
    
    page.drawText('Signature: _________________', {
      x: margin,
      y: yPosition,
      size: 11,
      font: font,
      color: rgb(0, 0, 0),
    })
    yPosition -= lineHeight
    
    page.drawText(`Date: ${data.date}`, {
      x: margin,
      y: yPosition,
      size: 11,
      font: font,
      color: rgb(0, 0, 0),
    })
    
    return await pdfDoc.save()
  }
}