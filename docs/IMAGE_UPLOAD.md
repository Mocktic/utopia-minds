# Image Upload Functionality

This document describes the image upload functionality added to the admin panel for blog cover images.

## Features

- **Dual Input Options**: Users can either enter an image URL or upload a file from their local computer
- **Vercel Blob Integration**: Local files are automatically uploaded to Vercel Blob storage
- **File Validation**: Supports JPEG, PNG, WebP, and GIF formats with a maximum size of 5MB
- **Real-time Preview**: Shows image preview as soon as URL is entered or file is uploaded
- **Progress Indicator**: Displays upload progress during file uploads
- **Error Handling**: Comprehensive error messages for various failure scenarios

## Components

### ImageUpload.vue
A reusable Vue component that provides:
- URL input field
- File upload button
- Progress indicator
- Image preview
- Error handling and validation

### useImageUpload.js
A composable that handles:
- File validation
- Upload to Vercel Blob
- Progress tracking
- Error management

## API Endpoints

### POST /api/admin/upload-image
Handles file uploads to Vercel Blob storage.

**Authentication**: Requires Bearer token in Authorization header

**Request**: Multipart form data with 'image' field

**Response**:
```json
{
  "success": true,
  "data": {
    "url": "https://blob.vercel-storage.com/...",
    "filename": "blog-covers/timestamp-random.ext"
  }
}
```

**Error Response**:
```json
{
  "statusCode": 400,
  "statusMessage": "Invalid file type: image/bmp. Only JPEG, PNG, WebP, and GIF are allowed."
}
```

## Configuration

### Environment Variables
- `BLOB_READ_WRITE_TOKEN`: Vercel Blob read/write token (required)

### File Constraints
- **Supported formats**: JPEG, JPG, PNG, WebP, GIF
- **Maximum size**: 5MB
- **Storage location**: `blog-covers/` directory in Vercel Blob

## Usage

### In Admin Pages
The ImageUpload component is used in both create and edit blog pages:

```vue
<ImageUpload 
  v-model="form.coverImage"
  label="Cover Image"
  placeholder="https://example.com/image.jpg"
  :preview-alt="form.title || 'Cover image preview'"
  help-text="Enter an image URL or upload a file from your computer."
/>
```

### Workflow
1. Admin enters image URL OR selects local file
2. If file is selected:
   - File is validated (type, size)
   - File is uploaded to Vercel Blob
   - Public URL is returned and set in the URL field
3. Image preview is shown
4. On form submission, the URL (whether entered or uploaded) is saved to MongoDB

## Security

- Authentication required for all upload operations
- File type validation prevents malicious uploads
- File size limits prevent abuse
- Unique filenames prevent conflicts
- Public access URLs for easy integration

## Error Handling

The system handles various error scenarios:
- Invalid file types
- Files too large
- Network errors during upload
- Missing authentication
- Vercel Blob configuration issues
- Image loading failures

## Future Enhancements

Potential improvements:
- Image resizing/optimization before upload
- Multiple image upload support
- Drag and drop interface
- Image cropping functionality
- CDN integration for better performance