export const GET_IMAGES = 'GET_IMAGES';
export const ADD_IMAGE = 'ADD_IMAGE';
export const DELETE_IMAGE = 'DELETE_IMAGE';

export interface GalleryImage {
  id?: string;
  title: string;
  imageUrl: string;
  createdAt?: any;
  description: string;
  rating: number;
  time: string
  category: string;
  uploaderId?: string;
}

export interface Category {
  id: string,
  title: String,
  icon: String
}

export interface GalleryState {
  images: GalleryImage[];
  searchResult: GalleryImage[],
  progress: number;
  isLoading: boolean,
  error: unknown | null;
}

export interface AddImageAction {
  payload: GalleryImage;
}

export interface GetImagesAction {
  payload: GalleryImage[];
}

export interface DeleteImageAction {
  type: typeof DELETE_IMAGE;
  payload: GalleryImage;
}

export interface SearchImageAction {
  payload: GalleryImage[];
}


