import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DeleteImageAction, GetImagesAction, AddImageAction, GalleryState, SearchImageAction } from './type';

const initialState: GalleryState = {
    images: [],
    searchResult: [],
    progress: 0,
    isLoading: false,
    error: null,
}


const gallerySlice = createSlice({
    name: 'gallery',
    initialState,
    reducers: {
        ADDIMAGE(state: GalleryState, { payload }: PayloadAction<AddImageAction>) {
            state.images = [payload.payload, ...state.images];
            state.isLoading = true
        },
        AddImageError(state:GalleryState,action: PayloadAction<unknown>){
            state.error = action.payload
        },
        GETIMAGESTART(state: GalleryState, action: PayloadAction<string | undefined>) {
            action.payload;
            state.isLoading = true;
        },
        GETIMAGEFailure(state: GalleryState, action: PayloadAction<unknown>) {
            state.isLoading = false;
            state.error = action.payload
        },
        GETIMAGE(state: GalleryState, action: PayloadAction<GetImagesAction>) {
            state.images = action.payload.payload.sort((a, b) => b.createdAt - a.createdAt);
            state.isLoading = false;
        },
        SearchStart(state: GalleryState, action: PayloadAction<string>) {
            action.payload;
            state.isLoading = true;
        },
        SearchFailure(state: GalleryState, action: PayloadAction<unknown>) {
            state.isLoading = false;
            state.error = action.payload;
        },
        SearchImage(state: GalleryState, action: PayloadAction<SearchImageAction>) {
            state.searchResult = action.payload.payload;
            state.isLoading = false;
        },
        DELETEIMAGE(state: GalleryState, action: PayloadAction<DeleteImageAction>) {
            state.images = [...state.images].filter(image => image.id !== action.payload.payload.id);
        },
        SignOut(state: GalleryState) {
            state.images = [];
            state.searchResult = [];
        }
    }
});

export const { ADDIMAGE,AddImageError, GETIMAGE, GETIMAGESTART, GETIMAGEFailure, SearchStart, SearchFailure, SearchImage, DELETEIMAGE, SignOut } = gallerySlice.actions;
export default gallerySlice.reducer;