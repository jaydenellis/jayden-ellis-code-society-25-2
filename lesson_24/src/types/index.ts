// Types for the React application
// This would typically come from @code-differently/types package

export interface Program {
  id: string;
  title: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateProgramRequest {
  title: string;
  description: string;
}

export interface UpdateProgramRequest {
  title?: string;
  description?: string;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Form-related types
export interface FormErrors {
  [key: string]: string | undefined;
}

export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

// Navigation types
export interface NavigationItem {
  path: string;
  label: string;
  exact?: boolean;
}

// API endpoints configuration
export interface ApiEndpoints {
  programs: string;
  createProgram: string;
  updateProgram: (id: string) => string;
  deleteProgram: (id: string) => string;
}