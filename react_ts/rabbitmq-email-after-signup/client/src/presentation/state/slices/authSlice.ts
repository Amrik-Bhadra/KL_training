import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "@/domain/models/User";
import type { AuthToken, LoginCredentials, RegisterData } from "@/domain/models/Auth";
import { AuthRepository } from "@/infrastructure/repositories/AuthRepositories";
import { loginUserUseCase } from "@/application/usecase/auth/loginUsecase";
import { isAxiosError } from "axios";
import { signupUsecase } from "@/application/usecase/auth/signupUsecase";

interface AuthState {
    user: User | null;
    token: AuthToken | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    token: null,
    status: 'idle',
    error: null
}

const authRepository = new AuthRepository();

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (credentials: LoginCredentials, { rejectWithValue }) => {
        try {
            const useCase = loginUserUseCase(authRepository);
            const token = await useCase(credentials);
            return token;
        } catch (error: unknown) {
            if (isAxiosError(error)) {
                return rejectWithValue(error.response?.data?.message || 'An API error occurred');
            }
            return rejectWithValue('An unexpected error occurred');
        }
    }
);

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (userData: RegisterData, { rejectWithValue }) => {
        try {
            const useCase = signupUsecase(authRepository);
            const user = await useCase(userData);
            return user;
        } catch (error: unknown) {
            if (isAxiosError(error)) {
                return rejectWithValue(error.response?.data?.message || 'An API error occurred');
            }
            return rejectWithValue('An unexpected error occurred');
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.error = null;
            state.status = 'idle';
            localStorage.removeItem('authToken')
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<AuthToken>) => {
                state.status = 'succeeded';
                state.token = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            .addCase(registerUser.pending, (state) => {
                state.status = 'loading';
                state.user = null;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = 'failed';
                state.user = null;
                state.error = action.payload as string;
            })
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;