import {createSlice} from '@reduxjs/toolkit'

export const socialNetworkSlice = createSlice({
    name: 'socialNetwork',
    initialState: {
        logged: false
    },
    reducers: {
        setLogStatus: (state, action) => {
            state.logged = action.payload
        }
    }
})

export const {setLogStatus} = socialNetworkSlice.actions

export default socialNetworkSlice.reducer