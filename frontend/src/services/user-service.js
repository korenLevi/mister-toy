
// USER FRONTEND SERVICE

import Axios from 'axios';
var axios = Axios.create({ withCredentials: true });
import { httpService } from './http.service'
import { storageService } from './async-storage.service'
import { socketService, SOCKET_EVENT_USER_UPDATED } from './socket.service'
var gWatchedUser = null;
// const axios = require('axios')
const USER_URL = 'http://localhost:3000/api/user/'
const AUTH_URL = 'http://localhost:3000/api/auth/'
const STORAGE_KEY = 'loggedinUser'

export const userService = {
  getLoggedinUsers,
  getLoggedinUser,
  login,
  logout,
  signup,
  update,
  remove
}

window.userService = userService

async function getLoggedinUsers() {
  
  return await httpService.get(`user`)
}

async function getLoggedinUser() {
  // try {
  //   // const res = await axios.get(USER_URL + id)
  //   // return res.
   
  //   // return null
  //   return JSON.parse(sessionStorage.getItem(STORAGE_KEY))
  // } catch (err) {
  //   console.log('Error in getLoggedinUser (Front User Service):', err);
  //   throw err;
  // }
  // return await httpService.get(`user`)
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY))
  
}


// }

async function login(userCred) {
    const user = await httpService.post('auth/login', userCred )
    // if (user) return _saveLocalUser(user)
    if(user) return sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user))
}

async function signup(userCred) {
  console.log('username, password, fullname',userCred);
  return httpService.post(`auth/signup`, userCred)
}

async function logout() {
  // try {
  //   const res = await axios.post(AUTH_URL + '/logout')
  //   sessionStorage.removeItem(STORAGE_KEY)
  //   console.log(res.data.msg);
  //   return res.data;
  // } catch (err) {
  //   console.log('Error in Logout (Front User Service):', err);
  //   throw err;
  // }
  sessionStorage.removeItem(STORAGE_KEY)
  socketService.emit('unset-user-socket');
  return await httpService.post('auth/logout')
}


async function update(user) {
    // await storageService.put('user', user)
    user = await httpService.put(`user/${user._id}`, user)
    // Handle case in which admin updates other user's details
    if (getLoggedinUser()._id === user._id) _saveLocalUser(user)
    return user;
}

function remove(userId) {
    // return storageService.remove('user', userId)
    return httpService.delete(`user/${userId}`)
}

// function _saveLocalUser(user) {
//     sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
//     return user
// }


(async () => {
  var user = getLoggedinUser()
  console.log('user',user);
  // Dev Helper: Listens to when localStorage changes in OTHER browser

  // Here we are listening to changes for the watched user (comming from other browsers)
  window.addEventListener('storage', async () => {
    console.log('gWatchedUser',gWatchedUser);
      if (!gWatchedUser) return console.log('hi');
      const freshUsers = await storageService.query('user')
      const watchedUser = freshUsers.find(u => u._id === gWatchedUser._id)
      console.log('watchedUser',watchedUser);
      console.log('gWatchedUser',gWatchedUser);
      console.log('watchedUser',watchedUser);
      if (!watchedUser) return;
      if (gWatchedUser.score !== watchedUser.score) {
          console.log('Watched user score changed - localStorage updated from another browser')
          socketService.emit(SOCKET_EVENT_USER_UPDATED, watchedUser)
      }
      gWatchedUser = watchedUser
  })
})();





// This is relevant when backend is connected
(async () => {
    var user = getLoggedinUser()
    if (user) socketService.emit('set-user-socket', user._id)
})();


// // NOTE: this is a synchronous service on purpose
// // meant to simplify first intro to Vuex
// const axios = require("axios")
// import {
//     storageService
// } from './async-storage.service.js'
// import {
//     utilService
// } from './util.service.js';

// const KEY = 'usersDB';
// const KEY_SHOW = 'usersToShowDB'

// const USER_URL = 'http://localhost:3000/api/user/'
// export const userService = {
//     query,
//     getById,
//     remove,
//     save,
//     getEmptyUser,
//     save,
//     login

// };

// // _createUsers()

// // TODO: support paging and filtering and sorting
// async function login(){
//     return axios.get(USER_URL).then((res) => res.data)
// }
// function query() {
//     // return storageService.query(KEY)
//     console.log('getting user...');
//     return axios.get(USER_URL).then((res) => res.data)

// }

// function getById(userId) {
//     return axios.get(USER_URL + userId).then((res) => res.data)
//     // return storageService.get(KEY, userId)
// }

// function save(user) {
//     // const savedUser = (user._id) ? storageService.put(TOY_KEY, user) : storageService.post(TOY_KEY, user)
//     // return savedUser;
//     console.log('user._id',user._id);
//     if (user._id) {
//         // return axios.put(USER_URL + `${user._id}`, user).then(res => res.data)
//         return axios.put(USER_URL + user._id, user).then((res) => res.data)
//     } else {
//         return axios.post(USER_URL, user).then(res => res.data)
//     }
// }

// function remove(id) {
//     //   return axios.delete(TODOS_URL+id).then((res)=> res.data)
//     return storageService.remove(KEY, id)
//     // const idx = gUsers.findIndex((user) => user._id === id);
//     // gUsers.splice(idx, 1);
//     // storageService.store(KEY, gUsers);
// }

// // function save(user) {

// //     const userToSave = JSON.parse(JSON.stringify(user));
// //     const savedUser = userToSave._id ? _update(userToSave) : _add(userToSave);
// //     storageService.store(KEY, gUsers);
// //     //   return (user._id) ? axios.put(TODOS_URL,user).then((res)=>res.data) : axios.post(TODOS_URL,user).then((res)=>res.data)
// //     //   const savedUser = (user._id) ? storageService.put(KEY,user) : storageService.post(KEY,user)

// //     return savedUser;
// // }



// function _add(user) {
//     user._id = utilService.makeId();
//     console.log('imadding', user)
//     gUsers.push(user);
//     return user;
// }

// function _update(user) {
//     const idx = gUsers.findIndex((currUser) => currUser._id === user._id);
//     gUsers.splice(idx, 1, user);
//     return user;
// }

// function getEmptyUser() {
//     return {
//         _id: utilService.makeId(),
//         name: '',
//         price: utilService.getRandomInt(50, 100),
//         labels: ["Doll", "Battery Powered", "Baby"],
//         createdAt: 1631031801011,
//         inStock: true,
//     };
// }

// function _createUsers() {
//     var users = JSON.parse(localStorage.getItem(KEY));
//     if (!users || !users.length) {
//         users = [
//             _createUser('superman', '../assets/superman.jpeg', 'Adult'),
//             _createUser('andyman', '../assets/andyman.jpeg', 'Adult'),
//             _createUser('alien', '../assets/alien', 'Educational'),
//             _createUser('dinousaour', '../assets/dinousaour', 'Funny'),
//             _createUser('dog', '../assets/dog', 'Educational'),
//             _createUser('potato', '../assets/potato', 'Funny'),

//         ];
//         localStorage.setItem(KEY, JSON.stringify(users))

//     }
//     return users;
// }

// function _createUser(name, img = '', labels = ["Doll", "Battery Powered", "Baby"]) {
//     return {
//         _id: utilService.makeId(),
//         name,
//         price: utilService.getRandomInt(50, 100),
//         labels,
//         createdAt: 1631031801011,
//         inStock: true,
//         img,
//         stock: utilService.getRandomInt(1, 50),

//     };
// }