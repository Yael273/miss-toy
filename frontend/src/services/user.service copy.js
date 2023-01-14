import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'userDB'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'
// _createUsers()

export const userService = {
  login,
  logout,
  signup,
  getById,
  getLoggedinUser,
//   addActivity,
  save,
  update,
  remove,
  getEmptyCredentials
}

window.us = userService

function getById(userId) {
  return storageService.get(STORAGE_KEY, userId)
}

function update(user) {
  return storageService.put(STORAGE_KEY, user).then((user) => {
    // _saveLoggedinUser(user)
    // save(user)
    return user
  })
}

function remove(userId) {
  return storageService.remove(STORAGE_KEY, userId)
}

function login({ username, password }) {
  return storageService.query(STORAGE_KEY)
    .then(users => {
      // const user = users.find((u) => u.username === credentials.username)
      const user = users.find(user => user.username === username)
      const userPassword = users.find(user => user.password === password)
      if (user && userPassword) return _setLoggedinUser(user)
      else return Promise.reject('Invalid login')
    })
}

function signup({ username, password, fullname }) {
  const user = {
    username,
    password,
    fullname,
    score: 10000,
    isAdmin: false,
    activities: [{ _id: utilService.makeId(), txt: 'Added a Todo', at: 1523873242735 }],
    prefs: { color: '#000000', bgColor: '#40856b' }
  }
  return storageService.post(STORAGE_KEY, user)
    .then(_setLoggedinUser)
}

// function addActivity(activity) {
//   const loggedInUser = getLoggedinUser()
//   if (!loggedInUser) return

//   getById(loggedInUser._id)
//     .then(user => {
//       activity._id = utilService.makeId()
//       user.activities.unshift(activity)
//       return update(user)
//     })
//     .catch((err) => {
//       console.error('Cannot add activitie:', err)
//       throw err
//     })
// }

function logout() {
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
  return Promise.resolve()
}

function getLoggedinUser() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY))
}

function _saveLoggedinUser(user) {
  localStorage.setItem('loggedinUser', JSON.stringify(user))
}

function save(user) {
  if (user._id) {
    return storageService.put(STORAGE_KEY, user)
  } else {
    // when switching to backend - remove the next line
    return storageService.post(STORAGE_KEY, user)
  }
}

function _setLoggedinUser(user) {
  const userToSave = {
    _id: user._id,
    fullname: user.fullname,
    score: user.score,
    isAdmin: false,
    activities: user.activities,
    prefs: user.prefs
  }
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
  return userToSave
}

function getEmptyCredentials(
  fullname = '',
  username = '',
  password = 'secret',
  isAdmin = false,
  prefs = { color: '#000000', bgColor: '#ffffff' }
) {
  return {
    fullname,
    username,
    password,
    isAdmin,
    prefs,
    activities: [],
  }
}

// Test Data
// userService.signup({username: 'muki', password: 'muki1', fullname: 'Muki Ja'})
// userService.login({username: 'muki', password: 'muki1'})
