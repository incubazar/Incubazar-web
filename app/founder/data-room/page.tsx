"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { logger } from '@/lib/logger'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Upload,
  File,
  FileText,
  Trash2,
  Download,
  Folder,
  FolderOpen,
  CheckCircle,
  AlertCircle,
  Loader2,
  Info
} from 'lucide-react'
import { toast } from 'sonner'
import { FOLDER_CATEGORIES, type FolderCategory } from '@/lib/storage/data-room'

interface DataRoomFile {
  id: string
  file_name: string
  file_path: string
  file_size: number
  file_type: string
  folder_category: FolderCategory
  created_at: string
}

export default function DataRoomPage() {
  const [files, setFiles] = useState<DataRoomFile[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<FolderCategory | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    fetchFiles()
  }, [])

  const fetchFiles = async () => {
    try {
      const response = await fetch('/api/data-room')
      const data = await response.json()

      if (!response.ok) throw new Error(data.error)

      setFiles(data.files || [])
    } catch (error) {
      logger.error('Failed to fetch data room files', error as Error, {
        component: 'DATA_ROOM_PAGE',
        action: 'FETCH'
      })
      toast.error('Failed to load files')
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = async (category: FolderCategory, file: File) => {
    setUploading(true)
    setUploadProgress(0)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('category', category)

      // Simulate progress for UX
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90))
      }, 200)

      const response = await fetch('/api/data-room', {
        method: 'POST',
        body: formData
      })

      clearInterval(progressInterval)
      setUploadProgress(100)

      const data = await response.json()

      if (!response.ok) throw new Error(data.error)

      toast.success(`File uploaded to ${category.replace('_', ' ')}`)
      fetchFiles()
      setSelectedCategory(null)
    } catch (error: any) {
      logger.error('Failed to upload file', error, {
        component: 'DATA_ROOM_PAGE',
        action: 'UPLOAD'
      })
      toast.error(error.message || 'Failed to upload file')
    } finally {
      setUploading(false)
      setUploadProgress(0)
    }
  }

  const handleDeleteFile = async (fileId: string, fileName: string) => {
    if (!confirm(`Are you sure you want to delete "${fileName}"?`)) return

    try {
      const response = await fetch(`/api/data-room?file_id=${fileId}`, {
        method: 'DELETE'
      })

      const data = await response.json()

      if (!response.ok) throw new Error(data.error)

      toast.success('File deleted')
      fetchFiles()
    } catch (error: any) {
      logger.error('Failed to delete file', error, {
        component: 'DATA_ROOM_PAGE',
        action: 'DELETE'
      })
      toast.error(error.message || 'Failed to delete file')
    }
  }

  const handleDownloadFile = async (filePath: string, fileName: string) => {
    try {
      const { data, error } = await supabase.storage
        .from('data-rooms')
        .createSignedUrl(filePath, 3600)

      if (error) throw error

      // Open in new tab for download
      window.open(data.signedUrl, '_blank')
    } catch (error) {
      logger.error('Failed to download file', error as Error, {
        component: 'DATA_ROOM_PAGE',
        action: 'DOWNLOAD'
      })
      toast.error('Failed to download file')
    }
  }

  const getFilesByCategory = (category: FolderCategory) => {
    return files.filter(f => f.folder_category === category)
  }

  const getCategoryCompletion = () => {
    let completed = 0
    FOLDER_CATEGORIES.forEach(cat => {
      if (cat.value !== 'other' && getFilesByCategory(cat.value).length > 0) {
        completed++
      }
    })
    return Math.round((completed / (FOLDER_CATEGORIES.length - 1)) * 100)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  const getFileIcon = (fileType: string) => {
    if (fileType.includes('pdf')) return <FileText className="h-8 w-8 text-red-500" />
    if (fileType.includes('video')) return <File className="h-8 w-8 text-purple-500" />
    if (fileType.includes('image')) return <File className="h-8 w-8 text-blue-500" />
    return <File className="h-8 w-8 text-gray-500" />
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  const completionPercentage = getCategoryCompletion()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Data Room</h1>
        <p className="text-gray-600">Organize your startup documents for investor review</p>
      </div>

      {/* Info Alert */}
      <Alert className="border-blue-200 bg-blue-50">
        <Info className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <strong>What is a Data Room?</strong> A secure place to store all your important documents.
          Investors you approve will be able to access these files for due diligence.
        </AlertDescription>
      </Alert>

      {/* Completion Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Data Room Completion</span>
            <Badge variant={completionPercentage === 100 ? 'default' : 'secondary'}>
              {completionPercentage}% Complete
            </Badge>
          </CardTitle>
          <CardDescription>
            Upload at least one document in each category to complete your data room
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={completionPercentage} className="h-3" />
          <p className="text-sm text-gray-500 mt-2">
            {completionPercentage === 100 
              ? 'Great! Your data room is complete.' 
              : `${FOLDER_CATEGORIES.length - 1 - Math.floor(completionPercentage / 20)} categories remaining`
            }
          </p>
        </CardContent>
      </Card>

      {/* Upload Progress */}
      {uploading && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-blue-800">Uploading file...</span>
                <span className="text-sm text-blue-600">{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Folders */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {FOLDER_CATEGORIES.map((category) => {
          const categoryFiles = getFilesByCategory(category.value)
          const hasFiles = categoryFiles.length > 0

          return (
            <Card
              key={category.value}
              className={`hover-lift cursor-pointer ${
                selectedCategory === category.value ? 'border-primary shadow-lg' : ''
              }`}
              onClick={() => setSelectedCategory(
                selectedCategory === category.value ? null : category.value
              )}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg flex items-center gap-2">
                      {selectedCategory === category.value ? (
                        <FolderOpen className="h-5 w-5 text-primary" />
                      ) : (
                        <Folder className="h-5 w-5 text-gray-400" />
                      )}
                      {category.label}
                    </CardTitle>
                    <CardDescription className="text-sm mt-1">
                      {category.description}
                    </CardDescription>
                  </div>
                  {hasFiles && (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {/* File count */}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Files:</span>
                    <Badge variant={hasFiles ? 'default' : 'secondary'}>
                      {categoryFiles.length}
                    </Badge>
                  </div>

                  {/* Upload button */}
                  {selectedCategory === category.value && (
                    <div className="space-y-3 pt-3 border-t">
                      <input
                        type="file"
                        id={`upload-${category.value}`}
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            handleFileUpload(category.value, file)
                          }
                          e.target.value = ''
                        }}
                        disabled={uploading}
                      />
                      <label htmlFor={`upload-${category.value}`}>
                        <Button
                          className="w-full"
                          size="sm"
                          variant="outline"
                          disabled={uploading}
                          asChild
                        >
                          <span>
                            <Upload className="h-4 w-4 mr-2" />
                            Upload File
                          </span>
                        </Button>
                      </label>

                      {/* Files list */}
                      {categoryFiles.length > 0 && (
                        <div className="space-y-2 max-h-48 overflow-y-auto">
                          {categoryFiles.map((file) => (
                            <div
                              key={file.id}
                              className="flex items-center justify-between p-2 bg-gray-50 rounded text-sm"
                            >
                              <div className="flex items-center gap-2 flex-1 min-w-0">
                                {getFileIcon(file.file_type)}
                                <div className="min-w-0 flex-1">
                                  <p className="font-medium truncate">{file.file_name}</p>
                                  <p className="text-xs text-gray-500">
                                    {formatFileSize(file.file_size)}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-1">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleDownloadFile(file.file_path, file.file_name)
                                  }}
                                >
                                  <Download className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleDeleteFile(file.id, file.file_name)
                                  }}
                                >
                                  <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Compliance Notice */}
      <Card className="border-orange-200 bg-orange-50">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-orange-800">
                Data Security & Access
              </h3>
              <p className="text-sm text-orange-700 mt-1">
                Your documents are securely stored and encrypted. Only investors you explicitly approve
                will be able to access your data room. You can revoke access at any time.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


