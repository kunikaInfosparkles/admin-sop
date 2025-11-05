import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
  Grid,
  IconButton,
  Alert,
  LinearProgress,
  Card,
  CardMedia,
} from '@mui/material';
import {
  CloudUpload as CloudUploadIcon,
  Close as CloseIcon,
  Image as ImageIcon,
} from '@mui/icons-material';
import { validateImage, getFileSizeInMB, createFilePreview } from '../../utils/fileUploadUtils';

const MultipleImageUpload = ({
  label = 'Upload Images',
  maxImages = 10,
  maxSize,
  onImagesSelect,
  uploadedImages = [],
  disabled = false,
  error = null,
  onRemove = null,
}) => {
  const [images, setImages] = useState(uploadedImages || []);
  const [uploading, setUploading] = useState(false);
  const [localError, setLocalError] = useState(error);
  const fileInputRef = React.useRef(null);

  const handleFileSelect = async (event) => {
    const selectedFiles = Array.from(event.target.files || []);

    if (selectedFiles.length === 0) return;

    setLocalError(null);
    const newImages = [];
    const errors = [];

    for (const file of selectedFiles) {
      if (images.length + newImages.length >= maxImages) {
        errors.push(`Maximum ${maxImages} images allowed`);
        break;
      }

      const validation = validateImage(file, maxSize);

      if (!validation.valid) {
        errors.push(`${file.name}: ${validation.error}`);
        continue;
      }

      try {
        const preview = createFilePreview(file);
        newImages.push({
          ...preview,
          id: `${Date.now()}_${Math.random()}`,
          file,
          status: 'pending',
        });
      } catch (err) {
        errors.push(`${file.name}: ${err.message}`);
      }
    }

    if (errors.length > 0) {
      setLocalError(errors.join('; '));
    }

    if (newImages.length > 0) {
      const updatedImages = [...images, ...newImages];
      setImages(updatedImages);

      if (onImagesSelect) {
        setUploading(true);
        try {
          await onImagesSelect(newImages.map((img) => img.file));
          setImages(updatedImages.map((img) => ({ ...img, status: 'uploaded' })));
        } catch (err) {
          setLocalError(err.message);
          setImages(images);
        } finally {
          setUploading(false);
        }
      }
    }
  };

  const handleRemoveImage = (imageId) => {
    const updatedImages = images.filter((img) => img.id !== imageId);
    setImages(updatedImages);

    if (onRemove) {
      onRemove(imageId);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      const event = {
        target: { files: droppedFiles },
      };
      handleFileSelect(event);
    }
  };

  const canAddMore = images.length < maxImages;

  return (
    <Box>
      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
        {label}
      </Typography>
      <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 2 }}>
        {images.length}/{maxImages} images • Max 3MB each
      </Typography>

      {canAddMore && (
        <Paper
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          sx={{
            border: '2px dashed',
            borderColor: localError ? 'error.main' : 'divider',
            borderRadius: 2,
            p: 3,
            textAlign: 'center',
            cursor: disabled ? 'not-allowed' : 'pointer',
            backgroundColor: localError ? 'error.lighter' : 'background.paper',
            transition: 'all 0.3s ease',
            '&:hover': {
              borderColor: disabled ? 'divider' : 'primary.main',
              backgroundColor: disabled ? 'background.paper' : 'action.hover',
            },
            opacity: disabled ? 0.6 : 1,
            mb: 2,
          }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".jpg,.jpeg,.png,.gif,.webp"
            multiple
            onChange={handleFileSelect}
            disabled={disabled || uploading}
            style={{ display: 'none' }}
          />
          <Button
            component="label"
            variant="text"
            startIcon={<CloudUploadIcon />}
            disabled={disabled || uploading}
            onClick={() => fileInputRef.current?.click()}
            sx={{ textTransform: 'none' }}
          >
            Click to upload or drag and drop images
          </Button>
          <Typography variant="caption" display="block" sx={{ mt: 1, color: 'text.secondary' }}>
            JPG, PNG, GIF, WebP • Up to {maxImages} images
          </Typography>
        </Paper>
      )}

      {localError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {localError}
        </Alert>
      )}

      {uploading && <LinearProgress sx={{ mb: 2 }} />}

      {images.length > 0 && (
        <Grid container spacing={2}>
          {images.map((image) => (
            <Grid size={{ xs: 6, sm: 4, md: 3 }} key={image.id}>
              <Card
                sx={{
                  position: 'relative',
                  '&:hover .delete-button': {
                    opacity: 1,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="150"
                  image={image.preview}
                  alt={image.name}
                  sx={{ objectFit: 'cover' }}
                />
                <Box
                  className="delete-button"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  }}
                >
                  <IconButton
                    size="small"
                    onClick={() => handleRemoveImage(image.id)}
                    disabled={uploading}
                    sx={{ color: 'white' }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Box>
                <Box sx={{ p: 1, backgroundColor: 'background.paper' }}>
                  <Typography
                    variant="caption"
                    sx={{
                      display: 'block',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {image.name}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {image.size} MB
                  </Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default MultipleImageUpload;
