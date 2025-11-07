export const MAX_FILE_SIZE = 5 * 1024 * 1024;
export const MAX_IMAGE_SIZE = 3 * 1024 * 1024;
export const ALLOWED_FILE_TYPES = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'csv'];
export const ALLOWED_IMAGE_TYPES = ['jpg', 'jpeg', 'png', 'gif', 'webp'];

export const getFileExtension = (filename) => {
  return filename.split('.').pop().toLowerCase();
};

export const getFileSizeInMB = (sizeInBytes) => {
  return (sizeInBytes / (1024 * 1024)).toFixed(2);
};

export const validateFile = (file, options = {}) => {
  const {
    maxSize = MAX_FILE_SIZE,
    allowedTypes = ALLOWED_FILE_TYPES,
    fileType = 'file'
  } = options;

  if (!file) {
    return { valid: false, error: 'No file selected' };
  }

  const fileExtension = getFileExtension(file.name);
  const fileSizeInMB = getFileSizeInMB(file.size);

  if (file.size > maxSize) {
    return {
      valid: false,
      error: `File size exceeds ${getFileSizeInMB(maxSize)}MB limit`
    };
  }

  if (!allowedTypes.includes(fileExtension)) {
    return {
      valid: false,
      error: `${fileType} type '.${fileExtension}' is not allowed. Allowed types: ${allowedTypes.join(', ')}`
    };
  }

  return { valid: true, error: null };
};

export const validateImage = (file, maxSize = MAX_IMAGE_SIZE) => {
  return validateFile(file, {
    maxSize,
    allowedTypes: ALLOWED_IMAGE_TYPES,
    fileType: 'Image'
  });
};

export const readFileAsDataURL = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
};

export const readFileAsText = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
};

export const createFilePreview = (file) => {
  const extension = getFileExtension(file.name);
  const isImage = ALLOWED_IMAGE_TYPES.includes(extension);

  if (isImage) {
    return {
      type: 'image',
      preview: URL.createObjectURL(file),
      name: file.name,
      size: getFileSizeInMB(file.size),
      extension
    };
  }

  return {
    type: 'file',
    preview: null,
    name: file.name,
    size: getFileSizeInMB(file.size),
    extension
  };
};

export const uploadFile = async (file, uploadFn) => {
  const validation = validateFile(file);

  if (!validation.valid) {
    return { success: false, error: validation.error };
  }

  try {
    const result = await uploadFn(file);
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const uploadMultipleFiles = async (files, uploadFn, options = {}) => {
  const { maxSize = MAX_FILE_SIZE, allowedTypes = ALLOWED_FILE_TYPES } = options;
  const results = [];
  const errors = [];

  for (const file of files) {
    const validation = validateFile(file, { maxSize, allowedTypes });

    if (!validation.valid) {
      errors.push({ file: file.name, error: validation.error });
      continue;
    }

    try {
      const result = await uploadFn(file);
      results.push({ file: file.name, success: true, data: result });
    } catch (error) {
      errors.push({ file: file.name, error: error.message });
    }
  }

  return { results, errors, successCount: results.length, errorCount: errors.length };
};

export const generateUniqueFileName = (originalName) => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  const extension = getFileExtension(originalName);
  const nameWithoutExtension = originalName.slice(0, originalName.lastIndexOf('.'));
  return `${nameWithoutExtension}_${timestamp}_${random}.${extension}`;
};
