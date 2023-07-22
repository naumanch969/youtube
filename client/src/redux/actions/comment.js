import {
    start,
    error,
    end,
    getCommentsReducer,
    createCommentReducer,
    updateCommentReducer,
    deleteCommentReducer,
} from "../reducers/comment";
import * as api from '../api/index'

export const getComments = () => async (dispatch) => {
    dispatch(start())
    try {
        const { data } = await api.getComments()
        dispatch(getCommentsReducer(data.result))
    } catch (err) {
        dispatch(error(err.message))
    }
    dispatch(end())
}
export const createComment = () => async (dispatch) => {
    dispatch(start())
    try {
        const { data } = await api.createComment()
        dispatch(createCommentReducer(data.result))
    } catch (err) {
        dispatch(error(err.message))
    }
    dispatch(end())
}
export const updateComment = () => async (dispatch) => {
    dispatch(start())
    try {
        const { data } = await api.updateComment()
        dispatch(updateCommentReducer(data.result))
    } catch (err) {
        dispatch(error(err.message))
    }
    dispatch(end())
}
export const deleteComment = () => async (dispatch) => {
    dispatch(start())
    try {
        const { data } = await api.deleteComment()
        dispatch(deleteCommentReducer(data.result))
    } catch (err) {
        dispatch(error(err.message))
    }
    dispatch(end())
}