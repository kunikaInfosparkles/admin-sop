import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
  LinearProgress,
  Alert,
  IconButton,
} from '@mui/material';
import {
  CloudUpload as CloudUploadIcon,
  Close as CloseIcon,
  GetApp as DownloadIcon,
} from '@mui/icons-material';
import { validateFile, getFileSizeInMB } from '../../utils/fileUploadUtils';

const SingleFileUpload = ({
  label = 'Upload File',
  accept = '.pdf,.doc,.docx,.xls,.xlsx,.txt,.csv',
  onFileSelect,
  maxSize,
  maxSizeLabel = '5MB',
  disabled = false,
  error = null,
  uploadedFile = null,
  onRemove = null,
}) => {
  const [file, setFile] = useState(uploadedFile || null);
  const [uploading, setUploading] = useState(false);
  const [localError, setLocalError] = useState(error);
  const fileInputRef = React.useRef(null);

  const handleFileSelect = async (event) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    setLocalError(null);
    const validation = validateFile(selectedFile, { maxSize });

    if (!validation.valid) {
      setLocalError(validation.error);
      setFile(null);
      return;
    }

    setFile(selectedFile);
    if (onFileSelect) {
      setUploading(true);
      try {
        await onFileSelect(selectedFile);
      } catch (err) {
        setLocalError(err.message);
        setFile(null);
      } finally {
        setUploading(false);
      }
    }
  };

  const handleRemove = () => {
    setFile(null);
    setLocalError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (onRemove) {
      onRemove();
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

  return (
    <Box>
      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
        {label}
      </Typography>

      {!file ? (
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
          }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
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
            Click to upload or drag and drop
          </Button>
          <Typography variant="caption" display="block" sx={{ mt: 1, color: 'text.secondary' }}>
            {accept} • Max {maxSizeLabel}
          </Typography>
        </Paper>
      ) : (
        <Paper
          sx={{
            p: 2,
            backgroundColor: 'success.lighter',
            border: '1px solid',
            borderColor: 'success.light',
            borderRadius: 2,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'success.dark' }}>
                {file.name}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                {getFileSizeInMB(file.size)} MB
              </Typography>
              {uploading && <LinearProgress sx={{ mt: 1 }} />}
            </Box>
            <IconButton
              size="small"
              onClick={handleRemove}
              disabled={uploading}
              sx={{ ml: 1 }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        </Paper>
      )}

      {localError && (
        <Alert severity="error" sx={{ mt: 1 }}>
          {localError}
        </Alert>
      )}
    </Box>
  );
};

export default SingleFileUpload;
