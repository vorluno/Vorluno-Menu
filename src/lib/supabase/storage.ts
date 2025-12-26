import { createClient } from './client'

const BUCKET_NAME = 'product-images'

export async function uploadImage(file: File, path: string): Promise<{ url?: string; error?: string }> {
  try {
    const supabase = createClient()

    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: true,
      })

    if (error) {
      console.error('Upload error:', error)
      return { error: error.message }
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(data.path)

    return { url: publicUrl }
  } catch (error) {
    console.error('Unexpected error:', error)
    return { error: 'Failed to upload image' }
  }
}

export async function deleteImage(path: string): Promise<{ error?: string }> {
  try {
    const supabase = createClient()

    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([path])

    if (error) {
      console.error('Delete error:', error)
      return { error: error.message }
    }

    return {}
  } catch (error) {
    console.error('Unexpected error:', error)
    return { error: 'Failed to delete image' }
  }
}

export function getImagePath(productId: string, filename: string): string {
  const timestamp = Date.now()
  const ext = filename.split('.').pop()
  return `products/${productId}-${timestamp}.${ext}`
}
