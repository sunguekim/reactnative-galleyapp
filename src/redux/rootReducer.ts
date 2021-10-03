import { combineReducers } from '@reduxjs/toolkit'
import user from './module/user/user'
import gallery from './module/gallery/gallery'

const rootReducer = combineReducers({ user, gallery })

export type RootState = ReturnType<typeof rootReducer>


export default rootReducer