import { userService } from "../../services/user.service"

export const SET_USER = 'SET_USER'
export const UPDATE_USER = 'UPDATE_USER'

const initialState = {
    user: userService.getLoggedinUser(),
}

export function userReducer(state = initialState, action) {
    let user

    switch (action.type) {
        case SET_USER:
            return { ...state, user: action.user }
        case UPDATE_USER:
            user = { ...state.user, fullname: action.fullname }
            return { ...state, user }
        default:
            return { ...state }
    }
}