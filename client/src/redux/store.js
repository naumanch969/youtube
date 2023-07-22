import { configureStore, combineReducers } from '@reduxjs/toolkit'

import userReducer from './reducers/user'
import commentReducer from './reducers/comment'
import videoReducer from './reducers/video'

const rootReducer = combineReducers({
    user: userReducer,
    video: videoReducer,
    comment: commentReducer
})

export const store = configureStore({
    reducer: rootReducer
})