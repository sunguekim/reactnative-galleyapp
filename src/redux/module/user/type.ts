export const SET_USER = 'SET_USER';
export const SIGN_OUT = 'SIGN_OUT';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';
export const NEED_VERIFICATION = 'NEED_VERIFICATION';
export const SET_SUCCESS = 'SET_SUCCESS';
export const SET_PROFILE = 'SET_PROFILE'

export interface User {
    displayName: string | null;
    email: string | null;
    uid: string;
    photoURL?: string | undefined;
}

export interface AuthState {
    user: User | null;
    authenticated: boolean;
    loading: boolean;
    error: any;
    profileImage: string;
    needVerification: boolean;
    success: string;
}

export interface SignUpRequest {
    email: string;
    password: string;
    displayName: string;
}

export interface SignInData {
    email: string;
    password: string;
}

// Action

export interface ProfileImage {
    imageUrl: string;
    uid: string;
}

export interface SetUserAction {
    displayName: string | null;
    email: string | null;
    uid: string;
    photoURL?: string;
}

export interface SetProfileImage {
    id?: string;
    image: string;
}

export interface SetLoadingAction {
    type: typeof SET_LOADING;
    payload: boolean;
}

export interface SignOutAction {
    type: typeof SIGN_OUT;
}

export interface SetErrorAction {
    type: typeof SET_ERROR;
    payload: string;
}

export interface NeedVerificationAction {
    type: typeof NEED_VERIFICATION;
}

export interface SetSuccessAction {
    type: typeof SET_SUCCESS;
    payload: string;
}






