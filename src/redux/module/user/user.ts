import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, SetUserAction, SignUpRequest, SignInData, NeedVerificationAction, SetProfileImage } from './type';


const initialState: AuthState = {
    user: null,
    authenticated: false,
    loading: false,
    profileImage: '',
    error: null,
    needVerification: false,
    success: '',
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        SETUSER(state: AuthState, action: PayloadAction<SetUserAction>) {
            state.user = action.payload;
            state.authenticated = true
        },
        SETLOADING(state: AuthState, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        SETSUCCESS(state: AuthState, action: PayloadAction<string>) {
            state.success = action.payload
        },
        SIGNOUT(state: AuthState) {
            state.user = null;
            state.authenticated = false;
            state.loading = false;
            state.error = ''
        },
        SetProfie(state: AuthState, action: PayloadAction<SetProfileImage>) {
            state.profileImage = action.payload.image
        },
        SETERROR(state: AuthState, action: PayloadAction<unknown | string>) {
            state.error = action.payload;
            state.loading = false;
        },
        NEEDVERIFICATION(state: AuthState, action: PayloadAction<NeedVerificationAction>) {
            state.needVerification = true;
        },
        SIGNUP(state, action: PayloadAction<SignUpRequest>) {
            action.payload.email;
            action.payload.displayName;
            action.payload.password;
        },
        SIGNIN(state, action: PayloadAction<SignInData>) {
            action.payload.email;
            action.payload.password
        },
        GETUESERDATA(state, action: PayloadAction<{ id: string | undefined }>) {
            action.payload.id
        },
        ChangePassword(state, action: PayloadAction<string>) {
            action.payload
        }
    }
})


export const {
    SETUSER,
    SETLOADING,
    SETSUCCESS,
    SIGNOUT,
    SETERROR,
    NEEDVERIFICATION,
    SetProfie,
    SIGNUP,
    SIGNIN,
    GETUESERDATA,
    ChangePassword
} = userSlice.actions;

export default userSlice.reducer;