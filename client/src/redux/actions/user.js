import Cookies from "js-cookie"
import { start, end, error, registerReducer, loginReducer, googleLoginReducer, getUsersReducer, getCertainUsersReducer, getUserReducer, updateUserReducer, subscribeReducer, unsubscribeReducer, likeVideoReducer, dislikeVideoReducer, deleteUserReducer } from '../reducers/user'
import * as api from '../api/index'

export const register = (userData, navigate) => async (dispatch) => {
    dispatch(start())
    try {
        const { data } = await api.register(userData)
        dispatch(registerReducer(data.result))
        navigate('/auth/login')
    } catch (err) {
        dispatch(error(err.message))
    }
    dispatch(end())
}
export const login = (userData, navigate) => async (dispatch) => {
    dispatch(start())
    try {
        const { data } = await api.login(userData)
        dispatch(loginReducer(data.result))
        navigate('/')
    } catch (err) {
        dispatch(error(err.message))
    }
    dispatch(end())
}
export const googleLogin = () => async (dispatch) => {
    dispatch(start())
    try {
        const { data } = await api.googleLogin()
        dispatch(googleLoginReducer(data.result))
    } catch (err) {
        dispatch(error(err.message))
    }
    dispatch(end())
}
export const getUsers = (userIds) => async (dispatch) => {
    dispatch(start())
    try {
        const { data } = await api.getCertainUsers(userIds)
        dispatch(getUsersReducer(data.result))
    } catch (err) {
        dispatch(error(err.message))
    }
    dispatch(end())
}
export const getCertainUsers = (userIds) => async (dispatch) => {
    dispatch(start())
    try {
        const { data } = await api.getCertainUsers(userIds)
        dispatch(getCertainUsersReducer(data.result))
    } catch (err) {
        dispatch(error(err.message))
    }
    dispatch(end())
}
export const getUser = () => async (dispatch) => {
    dispatch(start())
    try {
        const { data } = await api.getUser()
        dispatch(getUserReducer(data.result))
    } catch (err) {
        dispatch(error(err.message))
    }
    dispatch(end())
}
export const updateUser = () => async (dispatch) => {
    dispatch(start())
    try {
        const { data } = await api.updateUser()
        dispatch(updateUserReducer(data.result))
    } catch (err) {
        dispatch(error(err.message))
    }
    dispatch(end())
}
export const subscribe = () => async (dispatch) => {
    dispatch(start())
    try {
        const { data } = await api.subscribe()
        dispatch(subscribeReducer(data.result))
    } catch (err) {
        dispatch(error(err.message))
    }
    dispatch(end())
}
export const unsubscribe = () => async (dispatch) => {
    dispatch(start())
    try {
        const { data } = await api.unsubscribe()
        dispatch(unsubscribeReducer(data.result))
    } catch (err) {
        dispatch(error(err.message))
    }
    dispatch(end())
}
export const likeVideo = () => async (dispatch) => {
    dispatch(start())
    try {
        const { data } = await api.likeVideo()
        dispatch(likeVideoReducer(data.result))
    } catch (err) {
        dispatch(error(err.message))
    }
    dispatch(end())
}
export const dislikeVideo = () => async (dispatch) => {
    dispatch(start())
    try {
        const { data } = await api.dislikeVideo()
        dispatch(dislikeVideoReducer(data.result))
    } catch (err) {
        dispatch(error(err.message))
    }
    dispatch(end())
}
export const deleteUser = () => async (dispatch) => {
    dispatch(start())
    try {
        const { data } = await api.deleteUser()
        dispatch(deleteUserReducer(data.result))
    } catch (err) {
        dispatch(error(err.message))
    }
    dispatch(end())
}