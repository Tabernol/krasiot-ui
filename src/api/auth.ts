import { apiClient } from './client';

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  email: string;
  password: string;
  firstname?: string;
  lastname?: string;
}

interface AuthResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
}

interface UserResponse {
  user_uid: string;
  email: string;
  firstname?: string;
  lastname?: string;
  role: string;
}

interface RefreshRequest {
  refresh_token: string;
}

interface LogoutRequest {
  refresh_token: string;
}

interface UpdateProfileRequest {
  firstname?: string;
  lastname?: string;
}

interface ChangePasswordRequest {
  current_password: string;
  new_password: string;
}

export const authApi = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/api/auth/login', data);
    return response.data;
  },

  register: async (data: RegisterRequest): Promise<UserResponse> => {
    const response = await apiClient.post<UserResponse>('/api/auth/register', data);
    return response.data;
  },

  refresh: async (data: RefreshRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/api/auth/refresh', data);
    return response.data;
  },

  logout: async (data: LogoutRequest): Promise<void> => {
    await apiClient.post('/api/auth/logout', data);
  },

  me: async (): Promise<UserResponse> => {
    const response = await apiClient.get<UserResponse>('/api/auth/me');
    return response.data;
  },

  updateProfile: async (data: UpdateProfileRequest): Promise<UserResponse> => {
    const response = await apiClient.put<UserResponse>('/api/auth/profile', data);
    return response.data;
  },

  changePassword: async (data: ChangePasswordRequest): Promise<void> => {
    await apiClient.put('/api/auth/password', data);
  },

  deleteAccount: async (): Promise<void> => {
    await apiClient.delete('/api/auth/account');
  },
};
