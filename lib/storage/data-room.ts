/**
 * Data Room Storage Utilities
 * Pure utility functions for data room operations
 * Note: For file operations, use the API routes in app/api/data-room/
 */

export type FolderCategory = 
  | 'pitch_deck'
  | 'financial_model'
  | 'team_resumes'
  | 'legal_documents'
  | 'product_demo'
  | 'other'

export interface DataRoomFile {
  id: string
  founder_profile_id: string
  file_name: string
  file_path: string
  file_size: number
  file_type: string
  folder_category: FolderCategory
  uploaded_by: string
  is_public: boolean
  created_at: string
  updated_at: string
}

export const FOLDER_CATEGORIES = [
  { value: 'pitch_deck', label: 'Pitch Deck', description: 'Your startup pitch deck' },
  { value: 'financial_model', label: 'Financial Model', description: 'Financial projections and models' },
  { value: 'team_resumes', label: 'Team Resumes', description: 'Resumes and bios of key team members' },
  { value: 'legal_documents', label: 'Legal Documents', description: 'Incorporation, IP, contracts, etc.' },
  { value: 'product_demo', label: 'Product Demo', description: 'Product videos and demos' },
  { value: 'other', label: 'Other Documents', description: 'Additional documents' }
] as const

/**
 * Get the storage path for a data room file
 */
export function getDataRoomPath(
  founderProfileId: string,
  category: FolderCategory,
  fileName: string
): string {
  // Clean filename to remove special characters
  const cleanFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_')
  return `data-rooms/${founderProfileId}/${category}/${Date.now()}_${cleanFileName}`
}

/**
 * Get allowed file types for a category
 */
export function getAllowedFileTypes(category: FolderCategory): string {
  switch (category) {
    case 'pitch_deck':
      return '.pdf,.ppt,.pptx'
    case 'financial_model':
      return '.xlsx,.xls,.csv,.pdf'
    case 'team_resumes':
      return '.pdf,.doc,.docx'
    case 'legal_documents':
      return '.pdf,.doc,.docx'
    case 'product_demo':
      return '.mp4,.mov,.avi,.pdf,.ppt,.pptx'
    case 'other':
      return '.pdf,.doc,.docx,.xlsx,.xls,.ppt,.pptx,.jpg,.jpeg,.png'
    default:
      return '*'
  }
}

/**
 * Get max file size for a category (in bytes)
 */
export function getMaxFileSize(category: FolderCategory): number {
  switch (category) {
    case 'product_demo':
      return 500 * 1024 * 1024 // 500 MB for videos
    case 'pitch_deck':
    case 'financial_model':
    case 'legal_documents':
      return 50 * 1024 * 1024 // 50 MB for documents
    default:
      return 10 * 1024 * 1024 // 10 MB for others
  }
}

/**
 * Validate file size against category limits
 */
export function validateFileSize(file: File, category: FolderCategory): { valid: boolean; error?: string } {
  const maxSize = getMaxFileSize(category)
  if (file.size > maxSize) {
    return {
      valid: false,
      error: `File size exceeds maximum allowed size of ${Math.round(maxSize / 1024 / 1024)}MB`
    }
  }
  return { valid: true }
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
}
