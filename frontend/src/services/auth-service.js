// NOTE: this is a synchronous service on purpose
// meant to simplify first intro to Vuex
const axios = require("axios")
import {
    storageService
} from './async-storage.service.js'
import {
    utilService
} from './util.service.js';

const KEY = 'authsDB';
const KEY_SHOW = 'authsToShowDB'

const AUTH_URL = 'http://localhost:3000/api/auth/'
export const authService = {
    query,
    getById,
    remove,
    save,
    getEmptyAuth,
    save

};

// _createAuths()

// TODO: support paging and filtering and sorting
// function login(){
//     return axsios.get(AUTH_URL).then((res) => res.data)
// }
function query(user) {
    // return storageService.query(KEY)
    console.log('getting auth...');
    return axios.post(AUTH_URL + '/login',user).then((res) => res.data)

}

function getById(authId) {
    return axios.get(AUTH_URL + authId).then((res) => res.data)
    // return storageService.get(KEY, authId)
}

function save(auth) {
    // const savedAuth = (auth._id) ? storageService.put(TOY_KEY, auth) : storageService.post(TOY_KEY, auth)
    // return savedAuth;
    console.log('auth._id',auth._id);
    if (auth._id) {
        // return axios.put(AUTH_URL + `${auth._id}`, auth).then(res => res.data)
        return axios.put(AUTH_URL + auth._id, auth).then((res) => res.data)
    } else {
        return axios.post(AUTH_URL, auth).then(res => res.data)
    }
}

function remove(id) {
    //   return axios.delete(TODOS_URL+id).then((res)=> res.data)
    return storageService.remove(KEY, id)
    // const idx = gAuths.findIndex((auth) => auth._id === id);
    // gAuths.splice(idx, 1);
    // storageService.store(KEY, gAuths);
}

// function save(auth) {

//     const authToSave = JSON.parse(JSON.stringify(auth));
//     const savedAuth = authToSave._id ? _update(authToSave) : _add(authToSave);
//     storageService.store(KEY, gAuths);
//     //   return (auth._id) ? axios.put(TODOS_URL,auth).then((res)=>res.data) : axios.post(TODOS_URL,auth).then((res)=>res.data)
//     //   const savedAuth = (auth._id) ? storageService.put(KEY,auth) : storageService.post(KEY,auth)

//     return savedAuth;
// }



function _add(auth) {
    auth._id = utilService.makeId();
    console.log('imadding', auth)
    gAuths.push(auth);
    return auth;
}

function _update(auth) {
    const idx = gAuths.findIndex((currAuth) => currAuth._id === auth._id);
    gAuths.splice(idx, 1, auth);
    return auth;
}

function getEmptyAuth() {
    return {
        _id: utilService.makeId(),
        name: '',
        price: utilService.getRandomInt(50, 100),
        labels: ["Doll", "Battery Powered", "Baby"],
        createdAt: 1631031801011,
        inStock: true,
    };
}
