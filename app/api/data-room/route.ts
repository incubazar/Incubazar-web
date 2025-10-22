import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { logger } from '@/lib/logger'
import {
  FolderCategory,
  getDataRoomPath,
  getMaxFileSize
} from '@/lib/storage/data-room'

// GET - Fetch all files in data room
export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()
    
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get founder profile
    const { data: founderProfile } = await supabase
      .from('founder_profiles')
      .select('id')
      .eq('user_id', user.id)
      .single()

    if (!founderProfile) {
      return NextResponse.json(
        { error: 'Founder profile not found' },
        { status: 404 }
      )
    }

    // Fetch files
    const { data: files, error: filesError } = await supabase
      .from('data_room_files')
      .select('*')
      .eq('founder_profile_id', founderProfile.id)
      .order('created_at', { ascending: false })
    
    if (filesError) {
      throw filesError
    }

    return NextResponse.json({ files: files || [] })
  } catch (error) {
    logger.error('Failed to fetch data room files', error as Error, {
      component: 'DATA_ROOM_API',
      action: 'GET'
    })
    return NextResponse.json(
      { error: 'Failed to fetch files' },
      { status: 500 }
    )
  }
}

// POST - Upload file to data room
export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get founder profile
    const { data: founderProfile } = await supabase
      .from('founder_profiles')
      .select('id')
      .eq('user_id', user.id)
      .single()

    if (!founderProfile) {
      return NextResponse.json(
        { error: 'Founder profile not found' },
        { status: 404 }
      )
    }

    // Parse form data
    const formData = await request.formData()
    const file = formData.get('file') as File
    const category = formData.get('category') as FolderCategory

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    if (!category) {
      return NextResponse.json(
        { error: 'Category is required' },
        { status: 400 }
      )
    }

    // Validate file size
    const maxSize = getMaxFileSize(category)
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: `File size exceeds maximum allowed size of ${Math.round(maxSize / 1024 / 1024)}MB` },
        { status: 400 }
      )
    }

    // Generate storage path
    const filePath = getDataRoomPath(founderProfile.id, category, file.name)

    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('data-rooms')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (uploadError) {
      throw uploadError
    }

    // Create database record
    const { data: dbData, error: dbError } = await supabase
      .from('data_room_files')
      .insert({
        founder_profile_id: founderProfile.id,
        file_name: file.name,
        file_path: uploadData.path,
        file_size: file.size,
        file_type: file.type || 'application/octet-stream',
        folder_category: category,
        uploaded_by: user.id,
        is_public: false
      })
      .select()
      .single()

    if (dbError) {
      // Clean up uploaded file if database insert fails
      await supabase.storage.from('data-rooms').remove([uploadData.path])
      throw dbError
    }

    logger.info('File uploaded to data room', {
      component: 'DATA_ROOM_API',
      action: 'UPLOAD',
      file_name: file.name,
      category,
      file_size: file.size
    })

    return NextResponse.json({
      success: true,
      file: dbData
    })
  } catch (error: any) {
    logger.error('Failed to upload file', error, {
      component: 'DATA_ROOM_API',
      action: 'POST'
    })
    return NextResponse.json(
      { error: error.message || 'Failed to upload file' },
      { status: 500 }
    )
  }
}

// DELETE - Delete file from data room
export async function DELETE(request: NextRequest) {
  try {
    const supabase = createClient()
    
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get founder profile
    const { data: founderProfile } = await supabase
      .from('founder_profiles')
      .select('id')
      .eq('user_id', user.id)
      .single()

    if (!founderProfile) {
      return NextResponse.json(
        { error: 'Founder profile not found' },
        { status: 404 }
      )
    }

    // Get file_id from query params
    const { searchParams } = new URL(request.url)
    const fileId = searchParams.get('file_id')

    if (!fileId) {
      return NextResponse.json(
        { error: 'file_id is required' },
        { status: 400 }
      )
    }

    // Get file info first
    const { data: fileData, error: fetchError } = await supabase
      .from('data_room_files')
      .select('file_path, founder_profile_id')
      .eq('id', fileId)
      .single()

    if (fetchError) throw fetchError

    // Verify ownership
    if (fileData.founder_profile_id !== founderProfile.id) {
      return NextResponse.json(
        { error: 'Unauthorized: You can only delete your own files' },
        { status: 403 }
      )
    }

    // Delete from storage
    const { error: storageError } = await supabase.storage
      .from('data-rooms')
      .remove([fileData.file_path])

    if (storageError) throw storageError

    // Delete from database
    const { error: dbError } = await supabase
      .from('data_room_files')
      .delete()
      .eq('id', fileId)

    if (dbError) throw dbError

    logger.info('File deleted from data room', {
      component: 'DATA_ROOM_API',
      action: 'DELETE',
      file_id: fileId
    })

    return NextResponse.json({
      success: true,
      message: 'File deleted successfully'
    })
  } catch (error: any) {
    logger.error('Failed to delete file', error, {
      component: 'DATA_ROOM_API',
      action: 'DELETE'
    })
    return NextResponse.json(
      { error: error.message || 'Failed to delete file' },
      { status: 500 }
    )
  }
}

