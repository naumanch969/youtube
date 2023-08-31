import { createSlice } from "@reduxjs/toolkit";

const videoSlice = createSlice({
    name: 'video',
    initialState: {
        videos: [],
        currentVideo: null,
        isFetching: false,
        error: null
    },
    reducers: {
        start: (state) => { state.isFetching = true; state.error = null },
        end: (state) => { state.isFetching = false },
        error: (state, action) => { state.isFetching = false; state.error = action.payload },
        getVideosReducer: (state, action) => { state.videos = action.payload },
        getVideoReducer: (state, action) => { state.currentVideo = action.payload },
        getTrendedVideosReducer: (state, action) => { state.videos = action.payload },
        getRandomVideosReducer: (state, action) => { state.videos = action.payload },
        subscribedVideosReducer: (state, action) => { state.videos = action.payload },
        getVideosByTagReducer: (state, action) => { state.videos = action.payload },
        searchByTitleReducer: (state, action) => { state.videos = action.payload },
        createVideoReducer: (state, action) => { state.videos = [...videos, action.payload] },
        updateVideoReducer: (state, action) => { state.videos = state.videos.map(v => v = v._id == action.payload._id ? action.payload : v) },
        addViewReducer: (state, action) => { state.videos = state.videos.map(v => v = v._id == action.payload._id ? action.payload : v) },
        deleteVideoReducer: (state, action) => { state.videos = state.videos.filter(v => v._id != action.payload._id) },
    }
})

export const {
    start,
    end,
    error,
    getVideosReducer,
    getVideoReducer,
    getTrendedVideosReducer,
    getRandomVideosReducer,
    subscribedVideosReducer,
    getVideosByTagReducer,
    searchByTitleReducer,
    createVideoReducer,
    updateVideoReducer,
    addViewReducer,
    deleteVideoReducer,
} = videoSlice.actions
export default videoSlice.reducer