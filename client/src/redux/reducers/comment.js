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
        getComments: (state, action) => {
            state.comments = action.payload
        },
        createComment: (state, action) => {
            state.comments = [...state.comments, action.payload]
        },
        updateComment: (state, action) => {
            state.comments = state.comments.map(c => c = c._id == action.payload ? action.payload : c)
        },
        deleteComment: (state, action) => {
            state.comments = state.comments.filter(c => c._id != action.payload._id)
        },
    }
})
export const {
    start,
    end,
    error,
    getComments,
    createComment,
    updateComment,
    deleteComment,
} = commentSlice.actions
export default commentSlice.reducer