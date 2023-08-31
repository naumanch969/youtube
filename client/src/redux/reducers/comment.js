import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
    name: 'comment',
    initialState: {
        comments: [],
        isFetching: false,
        error: null
    },
    reducers: {
        start: (state) => { state.isFetching = true; state.error = null },
        end: (state) => { state.isFetching = false; },
        error: (state, action) => { state.isFetching = false; state.error = action.payload },
        getCommentsReducer: (state, action) => { state.comments = action.payload },
        createCommentReducer: (state, action) => { state.comments = [...state.comments, action.payload] },
        updateCommentReducer: (state, action) => { state.comments = state.comments.map(c => c = c._id == action.payload ? action.payload : c) },
        deleteCommentReducer: (state, action) => { state.comments = state.comments.filter(c => c._id != action.payload._id) },
    }
})
export const {
    start,
    end,
    error,
    getCommentsReducer,
    createCommentReducer,
    updateCommentReducer,
    deleteCommentReducer,
} = commentSlice.actions
export default commentSlice.reducer