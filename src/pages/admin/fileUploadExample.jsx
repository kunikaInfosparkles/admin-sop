import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Alert,
  Grid,
  Button,
  CircularProgress,
} from '@mui/material';
import { CheckCircle as CheckCircleIcon } from '@mui/icons-material';
import SingleFileUpload from '../../components/fileUpload/SingleFileUpload';
import MultipleImageUpload from '../../components/fileUpload/MultipleImageUpload';

const FileUploadExample = () => {
  const [singleFile, setSingleFile] = useState(null);
  const [multipleImages, setMultipleImages] = useState([]);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const mockSingleFileUpload = async (file) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setSingleFile({
          name: file.name,
          size: (file.size / (1024 * 1024)).toFixed(2),
          uploadedAt: new Date().toLocaleTimeString(),
        });
        setUploadStatus({ type: 'success', message: 'File uploaded successfully!' });
        resolve({ filename: file.name });
      }, 2000);
    });
  };

  const mockMultipleImagesUpload = async (files) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const uploadedImages = files.map((file) => ({
          name: file.name,
          size: (file.size / (1024 * 1024)).toFixed(2),
          uploadedAt: new Date().toLocaleTimeString(),
        }));
        setMultipleImages((prev) => [...prev, ...uploadedImages]);
        setUploadStatus({
          type: 'success',
          message: `${files.length} image(s) uploaded successfully!`,
        });
        resolve(uploadedImages);
      }, 2000);
    });
  };

  const handleSingleFileSelect = async (file) => {
    setLoading(true);
    try {
      await mockSingleFileUpload(file);
    } catch (error) {
      setUploadStatus({ type: 'error', message: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleMultipleImagesSelect = async (files) => {
    setLoading(true);
    try {
      await mockMultipleImagesUpload(files);
    } catch (error) {
      setUploadStatus({ type: 'error', message: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveSingleFile = () => {
    setSingleFile(null);
    setUploadStatus(null);
  };

  const handleRemoveImage = (imageIndex) => {
    setMultipleImages((prev) => prev.filter((_, index) => index !== imageIndex));
  };

  const handleClearAll = () => {
    setSingleFile(null);
    setMultipleImages([]);
    setUploadStatus(null);
  };

  return (
    <Box sx={{ maxWidth: 1200, margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 1 }}>
        File & Image Upload
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Upload single files and multiple images with validation and preview
      </Typography>

      {uploadStatus && (
        <Alert
          severity={uploadStatus.type}
          onClose={() => setUploadStatus(null)}
          sx={{ mb: 3 }}
        >
          {uploadStatus.message}
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ mb: 3 }}>
              <SingleFileUpload
                label="Upload Document"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,.csv"
                onFileSelect={handleSingleFileSelect}
                maxSizeLabel="5MB"
                disabled={loading}
                uploadedFile={singleFile}
                onRemove={handleRemoveSingleFile}
              />
            </Box>

            {singleFile && (
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  backgroundColor: 'info.lighter',
                  border: '1px solid',
                  borderColor: 'info.light',
                  borderRadius: 1,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <CheckCircleIcon sx={{ color: 'success.main', fontSize: 20 }} />
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    File Uploaded
                  </Typography>
                </Box>
                <Typography variant="body2">
                  <strong>Name:</strong> {singleFile.name}
                </Typography>
                <Typography variant="body2">
                  <strong>Size:</strong> {singleFile.size} MB
                </Typography>
                <Typography variant="body2">
                  <strong>Uploaded:</strong> {singleFile.uploadedAt}
                </Typography>
              </Paper>
            )}
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ mb: 3 }}>
              <MultipleImageUpload
                label="Upload Product Images"
                maxImages={5}
                onImagesSelect={handleMultipleImagesSelect}
                uploadedImages={[]}
                disabled={loading}
                onRemove={handleRemoveImage}
              />
            </Box>

            {multipleImages.length > 0 && (
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  backgroundColor: 'success.lighter',
                  border: '1px solid',
                  borderColor: 'success.light',
                  borderRadius: 1,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <CheckCircleIcon sx={{ color: 'success.main', fontSize: 20 }} />
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    Images Uploaded ({multipleImages.length})
                  </Typography>
                </Box>
                {multipleImages.map((img, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      p: 1,
                      mb: 1,
                      backgroundColor: 'white',
                      borderRadius: 1,
                      '&:last-child': { mb: 0 },
                    }}
                  >
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {img.name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        {img.size} MB • {img.uploadedAt}
                      </Typography>
                    </Box>
                    <Button
                      size="small"
                      variant="outlined"
                      color="error"
                      onClick={() => handleRemoveImage(index)}
                    >
                      Remove
                    </Button>
                  </Box>
                ))}
              </Paper>
            )}
          </Paper>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              onClick={() => {
                console.log('Submit Data:', {
                  file: singleFile,
                  images: multipleImages,
                });
                alert('Check console for submitted data');
              }}
              disabled={!singleFile && multipleImages.length === 0}
            >
              Submit
            </Button>
            <Button variant="outlined" onClick={handleClearAll}>
              Clear All
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FileUploadExample;
