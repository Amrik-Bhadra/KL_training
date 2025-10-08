export interface AuthToken {
  accessToken: string;
  refreshToken: string;
}

export type LoginCredentials = {
    email: string;
    password: string;
}

export type RegisterData = {
    email: string;
    password: string;
}