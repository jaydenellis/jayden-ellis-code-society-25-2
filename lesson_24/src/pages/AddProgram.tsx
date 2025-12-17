import React, { useState } from 'react';
import './AddProgram.css';

// Assuming these types exist in @code-differently/types
interface Program {
  id?: string;
  title: string;
  description: string;
}

interface FormData {
  title: string;
  description: string;
}

interface FormErrors {
  title?: string;
  description?: string;
}

interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

const AddProgram: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Title validation
    if (!formData.title.trim()) {
      newErrors.title = 'Program title is required';
    } else if (formData.title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters long';
    } else if (formData.title.trim().length > 100) {
      newErrors.title = 'Title must be less than 100 characters';
    }

    // Description validation
    if (!formData.description.trim()) {
      newErrors.description = 'Program description is required';
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters long';
    } else if (formData.description.trim().length > 500) {
      newErrors.description = 'Description must be less than 500 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear specific field error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }

    // Clear messages
    setSuccessMessage('');
    setErrorMessage('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const response = await fetch('/api/programs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title.trim(),
          description: formData.description.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to create program: ${response.status} ${response.statusText}`);
      }

      const result: ApiResponse<Program> = await response.json();

      if (result.success) {
        setSuccessMessage('Program created successfully!');
        // Reset form
        setFormData({
          title: '',
          description: ''
        });
        setErrors({});
      } else {
        throw new Error(result.message || 'Failed to create program');
      }
    } catch (err) {
      console.error('Error creating program:', err);
      setErrorMessage(
        err instanceof Error ? err.message : 'An unexpected error occurred'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-program">
      <div className="add-program__container">
        <div className="add-program__header">
          <h1>Add New Program</h1>
          <p>Create a new program by filling out the form below.</p>
        </div>

        <form onSubmit={handleSubmit} className="add-program__form">
          {/* Title Field */}
          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Program Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className={`form-input ${errors.title ? 'form-input--error' : ''}`}
              placeholder="Enter program title"
              maxLength={100}
              disabled={loading}
            />
            {errors.title && (
              <span className="form-error">{errors.title}</span>
            )}
          </div>

          {/* Description Field */}
          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Program Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className={`form-textarea ${errors.description ? 'form-input--error' : ''}`}
              placeholder="Enter program description"
              rows={5}
              maxLength={500}
              disabled={loading}
            />
            <div className="character-count">
              {formData.description.length}/500 characters
            </div>
            {errors.description && (
              <span className="form-error">{errors.description}</span>
            )}
          </div>

          {/* Submit Button */}
          <div className="form-group">
            <button
              type="submit"
              className="submit-button"
              disabled={loading}
            >
              {loading ? 'Creating Program...' : 'Create Program'}
            </button>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="message message--success">
              {successMessage}
            </div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <div className="message message--error">
              {errorMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddProgram;