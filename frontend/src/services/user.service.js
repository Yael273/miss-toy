import { httpService } from './http.service.js'
import { utilService } from './util.service.js'

const BASE_URL = 'user/'
const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
    get,
    signup,
    login,
    logout,
    getEmptyCredentials,
    getLoggedinUser,
    saveLocalUser,
    update,
    getUsers
}


async function get(userId) {
    const user = await httpService.get(`user/${userId}`)
    return user
}

function getUsers() {
  // return storageService.query('user')
  return httpService.get(`user`)
}

async function signup(userCred) {
  userCred.score = 10000
    if (!userCred.imgUrl) userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
    const user = await httpService.post('auth/signup', userCred)
    // socketService.login(user._id)
    return saveLocalUser(user)
}

async function login(userCred) {
    const user = await httpService.post('auth/login', userCred)
    if (user) {
      // socketService.login(user._id)
      return saveLocalUser(user)
  }
}

function getEmptyCredentials(fullname = '', username = '', password = 'secret', imgUrl = '') {
    return { fullname, username, password, imgUrl }
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem('loggedinUser') || null)
}

async function logout() {
    return await httpService.post('auth/logout')
}

async function update(user) {
  user = await httpService.put(`user/${user._id}`, user)
  // Handle case in which admin updates other user's details
  if (getLoggedinUser()._id === user._id) saveLocalUser(user)
  return user
}

// function _saveLoggedinUser(user) {
//     sessionStorage.setItem('loggedinUser', JSON.stringify(user))
// }


// function _createUsers() {
//     let users = utilService.loadFromStorage(USER_KEY)
//     if (!users || !users.length) {
//         users = []
//         users.push(_createUser('Muki Da', 'muki'))
//         users.push(_createUser('Puki Ba', 'puki'))

//         utilService.saveToStorage(USER_KEY, users)
//     }
// }

function _createUser(fullname, username, password) {
    const user = getEmptyCredentials(fullname, username, password)
    user._id = utilService.makeId()
    return user
}

function saveLocalUser(user) {
  user = {_id: user._id, fullname: user.fullname, imgUrl: user.imgUrl, score: user.score, isAdmin: false}
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
  return user
}