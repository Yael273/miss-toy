import { userService } from '../../services/user.service.js'
import { SET_USER } from '../reducer/user.reducer.js'
import { store } from '../store.js'


export async function login(credentials) {
    const user = await userService.login(credentials)
    try {
        store.dispatch({ type: SET_USER, user })
        return user
    } catch (err) {
        console.error('Cannot login:', err)
        throw err
    }

}

export async function signup(credentials) {
    const user = await userService.signup(credentials)
    try {
        store.dispatch({ type: SET_USER, user })
        return user
    } catch (err) {
        console.error('Cannot signup:', err)
        throw err
    }

}

export async function logout() {
    await userService.logout()
    try {
        store.dispatch({ type: SET_USER, user: null })
    } catch (err) {
        console.error('Cannot logout:', err)
        throw err
    }
}

export async function update(user) {
    console.log('user', user);
    const updatedUser = await userService.save(user)
    try {
        console.log('user', updatedUser);
        store.dispatch({ type: SET_USER, user })
        return updatedUser
    } catch (err) {
        console.error('Cannot login:', err)
        throw err
    }
}



//OLD
// export function login(credentials) {
//     return userService.login(credentials)
//         .then(user => {
//             store.dispatch({ type: SET_USER, user })
//             return user
//         })
//         .catch(err => {
//             console.error('Cannot login:', err)
//             throw err
//         })
// }

// export function signup(credentials) {
//     return userService.signup(credentials)
//         .then(user => {
//             store.dispatch({ type: SET_USER, user })
//             return user
//         })
//         .catch(err => {
//             console.error('Cannot signup:', err)
//             throw err
//         })
// }

// export function logout() {
//     return userService.logout()
//         .then(() => {
//             store.dispatch({ type: SET_USER, user: null })
//         })
//         .catch(err => {
//             console.error('Cannot logout:', err)
//             throw err
//         })
// }

// export function update(user) {
//     console.log('user', user);
//     return userService.save(user)
//         .then((user) => {
//             console.log('user', user);
//             store.dispatch({ type: SET_USER, user })
//             return user
//         })
//         .catch((err) => {
//             console.error('Cannot login:', err)
//             throw err
//         })
// }