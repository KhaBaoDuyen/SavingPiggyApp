export interface AuthResponse {
  message: string;
  data: {
    user: {
      id: string;
      email: string;
      name: string;
      createdAt: string;
    };
    token: string;
  };
}