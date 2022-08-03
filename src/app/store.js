import { configureStore, combineReducers } from '@reduxjs/toolkit'
import {persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'

import socialNetworkReducer from '../features/socialNetworkSlice'

const reducers = combineReducers({
    socialNetwork: socialNetworkReducer,
})

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
})

export default store;