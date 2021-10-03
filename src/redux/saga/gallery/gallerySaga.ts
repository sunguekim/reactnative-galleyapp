import { PayloadAction } from '@reduxjs/toolkit'
import { call, put, takeLatest, } from 'redux-saga/effects'
import { ADDIMAGE, AddImageError, GETIMAGE, GETIMAGEFailure, GETIMAGESTART, SearchFailure, SearchImage, SearchStart } from '../../module/gallery/gallery'
import { AddImageAction, DeleteImageAction, GalleryImage, GetImagesAction, GET_IMAGES, } from '../../module/gallery/type'
import storage from '@react-native-firebase/storage'
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
import database, { FirebaseDatabaseTypes } from '@react-native-firebase/database'




function* uploadImage(data: PayloadAction<AddImageAction>) {
    try {
        const uid = data.payload.payload.id
        const file = data.payload.payload.imageUrl
        const filePath = `images/${uid}/${Math.random().toString(36)}`;
        const storageRef = storage().ref(filePath);
        const uploadTask = storageRef.putFile(file);

        yield uploadTask.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        }, (error) => {
            console.log(error)
        }, () => {
            uploadTask.snapshot?.ref.getDownloadURL().then(async (downloadUrl) => {
                try {
                    const image: GalleryImage = {
                        uploaderId: uid,
                        category: data.payload.payload.category,
                        title: data.payload.payload.title,
                        imageUrl: downloadUrl,
                        createdAt: data.payload.payload.createdAt,
                        description: data.payload.payload.description,
                        rating: data.payload.payload.rating,
                        time: data.payload.payload.time
                    };

                    await firestore().collection('gallery').add(image).then((docRef) => {
                        docRef.update({ id: docRef.id });
                    });

                } catch (error) {
                    console.log(error);
                };
            });
        });
    } catch (error) {
        yield put(AddImageError(error))
    };
};

function* getImage(data: PayloadAction<typeof GETIMAGESTART>) {

    try {
        const { payload } = data
        console.log(payload)
        const docs: FirebaseFirestoreTypes.DocumentData = yield firestore().collection('gallery')
            .where('uploaderId', '==', payload).get();

        const arr: GalleryImage[] = [];

        docs.forEach((doc: { data: () => GalleryImage }) => {
            const { category, title, createdAt, imageUrl, rating, description, id, time } = doc.data();
            console.log(typeof (createdAt._seconds))
            arr.push({
                category, title,
                createdAt: createdAt,
                imageUrl, rating, id, description, time
            })
        });

        console.log(arr[0].createdAt)
        yield put(GETIMAGE({ payload: arr.sort((a, b) => new Date(a.createdAt).getTime() > new Date(b.createdAt).getTime() ? 1 : -1) }))

    } catch (error) {
        yield put(GETIMAGEFailure(error))
    }
}

function* searchImage(data: PayloadAction<typeof SearchStart>) {
    try {
        const { payload } = data;
        console.log(payload)
        // const docs: FirebaseFirestoreTypes.DocumentData = yield firestore().collection('gallery')
        //     .where('', '==', payload).get();
        // const arr: GalleryImage[] = [];
        // docs.foreach((doc: { data: () => GalleryImage }) => {
        //     const { category, title, createdAt, imageUrl, rating, description, id, time } = doc.data();
        //     arr.push({
        //         category, title, createdAt, imageUrl, rating, description, id, time
        //     });
        // });
        // yield put(SearchImage({ payload: arr.sort((a, b) => new Date(a.createdAt).getTime() > new Date(b.createdAt).getTime() ? 1 : -1) }));

        const arr: GalleryImage[] = [];
        const docs: FirebaseDatabaseTypes.DataSnapshot = yield database().ref('gallery').orderByChild('database').equalTo(`${payload}`).once('value', (snapshot) => {
            snapshot.val().foreach((result: GalleryImage) => {
                arr.push(result)
            })
        });
        yield put(SearchImage({ payload: arr }))
    } catch (error) {
        yield put(SearchFailure(error))
    }
};

function* deleteImage(data: PayloadAction<DeleteImageAction>) {

}

export function* watchGallery() {
    yield takeLatest(ADDIMAGE.type, uploadImage);
    yield takeLatest(GETIMAGESTART.type, getImage);
    yield takeLatest(SearchStart.type, searchImage);
}