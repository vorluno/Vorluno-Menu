# Supabase Storage Setup

## Creating the Product Images Bucket

To enable image uploads for products, you need to create a Storage bucket in Supabase:

### Step 1: Create Bucket

1. Go to your Supabase project dashboard
2. Navigate to **Storage** in the left sidebar
3. Click **New bucket**
4. Enter the following details:
   - **Name**: `product-images`
   - **Public bucket**: ✅ Enabled (so images are publicly accessible)
   - **Allowed MIME types**: Leave empty or add: `image/jpeg`, `image/png`, `image/webp`, `image/gif`
   - **File size limit**: `5242880` (5MB)
5. Click **Create bucket**

### Step 2: Set Up Storage Policies (Optional - for security)

If you want to restrict uploads to authenticated users only:

1. Go to **Storage** → **Policies**
2. Click **New policy** for `product-images` bucket

**Upload Policy (Authenticated users only):**
```sql
CREATE POLICY "Authenticated users can upload images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'product-images');
```

**Public Read Policy (Everyone can view):**
```sql
CREATE POLICY "Public read access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'product-images');
```

**Delete Policy (Authenticated users only):**
```sql
CREATE POLICY "Authenticated users can delete images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'product-images');
```

### Step 3: Verify Setup

1. Try uploading an image through the admin panel
2. Check that the image appears in Storage → product-images
3. Verify the public URL works by visiting it in a browser

## Image Upload Features

The ImageUpload component supports:
- ✅ Drag & drop or click to upload
- ✅ File validation (images only, max 5MB)
- ✅ Preview before/after upload
- ✅ Upload to Supabase Storage
- ✅ Alternative: Paste external URL
- ✅ Remove uploaded images

## Troubleshooting

### Images not uploading
- Check that the `product-images` bucket exists
- Verify the bucket is set to **Public**
- Check browser console for errors
- Ensure user is authenticated

### Images not displaying
- Check the public URL format in Storage settings
- Verify the image URL in the database
- Check Next.js image domain configuration in `next.config.ts`
