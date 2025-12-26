'use client'

import { useState, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { uploadImage } from '@/lib/supabase/storage'
import { Loader2, Upload, X, Link as LinkIcon } from 'lucide-react'
import Image from 'next/image'
import { toast } from 'sonner'

interface ImageUploadProps {
  value: string
  onChange: (url: string) => void
  disabled?: boolean
  productId?: string
}

export function ImageUpload({ value, onChange, disabled, productId = 'temp' }: ImageUploadProps) {
  const t = useTranslations('admin')
  const [uploading, setUploading] = useState(false)
  const [showUrlInput, setShowUrlInput] = useState(false)
  const [urlInput, setUrlInput] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be less than 5MB')
      return
    }

    setUploading(true)

    try {
      const path = `products/${productId}-${Date.now()}.${file.name.split('.').pop()}`
      const result = await uploadImage(file, path)

      if (result.error) {
        toast.error(result.error)
        return
      }

      if (result.url) {
        onChange(result.url)
        toast.success('Image uploaded successfully')
      }
    } catch (error) {
      toast.error('Failed to upload image')
    } finally {
      setUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      onChange(urlInput.trim())
      setUrlInput('')
      setShowUrlInput(false)
      toast.success('Image URL updated')
    }
  }

  const handleRemove = () => {
    onChange('')
    toast.success('Image removed')
  }

  return (
    <div className="space-y-3">
      <Label>Image</Label>

      {/* Image Preview */}
      {value && (
        <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-border bg-muted">
          <Image
            src={value}
            alt="Product preview"
            fill
            className="object-cover"
            onError={() => toast.error('Failed to load image')}
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2"
            onClick={handleRemove}
            disabled={disabled || uploading}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Upload Options */}
      <div className="flex gap-2">
        {/* Upload File Button */}
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled || uploading}
          className="flex-1"
        >
          {uploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Upload File
            </>
          )}
        </Button>

        {/* URL Button */}
        <Button
          type="button"
          variant="outline"
          onClick={() => setShowUrlInput(!showUrlInput)}
          disabled={disabled || uploading}
        >
          <LinkIcon className="h-4 w-4" />
        </Button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* URL Input */}
      {showUrlInput && (
        <div className="flex gap-2">
          <Input
            type="url"
            placeholder="https://example.com/image.jpg"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            disabled={disabled || uploading}
          />
          <Button
            type="button"
            onClick={handleUrlSubmit}
            disabled={disabled || uploading || !urlInput.trim()}
          >
            Set URL
          </Button>
        </div>
      )}

      <p className="text-xs text-muted-foreground">
        Upload an image file (max 5MB) or provide an external URL
      </p>
    </div>
  )
}
