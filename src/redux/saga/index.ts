import { all, fork } from 'redux-saga/effects'
import { watchUser } from './user/userSaga'
import { watchGallery } from './gallery/gallerySaga'

export default function* rootSaga() {
    yield all([
        fork(watchUser),
        fork(watchGallery)
    ])
}