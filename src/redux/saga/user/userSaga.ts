import { PayloadAction } from '@reduxjs/toolkit'
import { put, takeLatest, } from 'redux-saga/effects'
import { User, SignUpRequest, SignOutAction, SignInData, SetProfileImage, ProfileImage, } from '../../module/user/type'
import * as actions from '../../module/user/user'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage'
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
import { SignOut } from '../../module/gallery/gallery';


function* signup(data: PayloadAction<SignUpRequest>) {
    try {
        yield put(actions.SETLOADING(true))
        const email = data.payload?.email;
        const password = data.payload?.password;
        const displayName = data.payload?.displayName;

        if (email && password) {
            console.log(email)
            const response: FirebaseAuthTypes.UserCredential = yield auth().createUserWithEmailAndPassword(email, password);
            if (response.user) {
                const userData: User = {
                    email: email,
                    displayName: displayName,
                    uid: response.user.uid,
                }
                yield firestore().collection('users').doc(response.user.uid).set(userData)
                yield put(actions.SETUSER(userData));
                yield put(actions.SETLOADING(false))
                yield response.user.sendEmailVerification();
            };
        }
    } catch (error) {
        console.log(error);
        yield put(actions.SETERROR(error));
    }
}

function* signOut(action: PayloadAction<SignOutAction>) {
    try {
        yield auth().signOut();
        yield put(actions.SIGNOUT());
        yield put(SignOut())
    } catch (error) {
        console.log(error);
    }
}

function* signIn(data: PayloadAction<SignInData>) {
    try {
        const email = data.payload?.email
        const password = data.payload?.password
        yield auth().signInWithEmailAndPassword(email, password)
    } catch (error) {
        console.log(error);
        yield put(actions.SETERROR(error));
    }
}

function* getUsertData(action: PayloadAction<{ id: string }>) {
    try {
        const id = action.payload.id;
        const user: FirebaseFirestoreTypes.QueryDocumentSnapshot = yield firestore().collection('users').doc(id).get()

        if (user.exists) {
            const userData = user.data() as User;
            yield put(actions.SETUSER(userData));
        }
    } catch (error) {
        yield put(actions.SETERROR(error));
    }
}

function* changePassword(action: PayloadAction<string>) {
    const newPassword = action.payload
    try {
        yield auth().currentUser?.updatePassword(newPassword);
    } catch (error) {
        yield put(actions.SETERROR(error))
    }
}

function* uploadProfile(data: PayloadAction<SetProfileImage>) {
    try {
        const uid = data.payload.id;
        const file = data.payload.image;
        const filePath = `images/profile/${uid}/${Math.random().toString(36)}`;
        const storageRef = storage().ref(filePath);
        const uploadTask = storageRef.putFile(file);

        yield uploadTask.on('state_changed', (snapshot) => {
            //업로드 진행률 표시 유저에게는 노출되지않는 상태
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        }, (error) => {
            actions.SETERROR(error.message)
        }, () => {
            uploadTask.snapshot?.ref.getDownloadURL().then(async (downloadUrl) => {
                try {

                    await firestore().doc(`users/${uid}`).update({ 'photoURL': downloadUrl });

                } catch (error) {
                    actions.SETERROR(error)
                }
            })
        })
    } catch (error) {

    }
}

export function* watchUser() {
    yield takeLatest(actions.SIGNUP.type, signup);
    yield takeLatest(actions.SIGNOUT.type, signOut)
    yield takeLatest(actions.SIGNIN.type, signIn)
    yield takeLatest(actions.SetProfie, uploadProfile)
    yield takeLatest(actions.GETUESERDATA.type, getUsertData)
    yield takeLatest(actions.ChangePassword, changePassword)
}