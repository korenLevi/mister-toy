// NOTE: this is a synchronous service on purpose
// meant to simplify first intro to Vuex
const axios = require("axios")
import {
    storageService
} from './async-storage.service.js'
import {
    utilService
} from './util.service.js';
import { httpService } from './http.service'
const KEY = 'toysDB';
const KEY_SHOW = 'toysToShowDB'

const TOY_URL = 'http://localhost:3000/api/toy/'
export const toyService = {
    query,
    getById,
    remove,
    save,
    getEmptyToy,
    toysDataChart,
    save

};

// _createToys()

function _getUrl(id = '') {
    const BASE_URL = (process.env.NODE_ENV !== 'development') ?
        '/api/toy' :
        '//localhost:3000/api/toy';
}
// TODO: support paging and filtering and sorting
async function query() {
    // return storageService.query(KEY)
    try {
        console.log('getting toys...');
        return axios.get(TOY_URL).then((res) => res.data)
    } catch (err) {
        console.log('Error in Query Toys (Front Toy Service):', err);
        throw err;
    }
  

}
// return axios.get(TOY_URL).then((res) =>{
//     res.data
//     console.log('res.data',res.data);
// })
function toysDataChart() {
    return axios.get(TOY_URL)
        .then(toys => {
            console.log('toystoys', toys);
            var _toys = toys.data;
            console.log('_toys',_toys);
            var funny = 0;
            var adult = 0;
            var educational = 0;
            const x = _toys.forEach(toy => {
                if (toy.labels === 'Funny') {
                    funny += toy.stock;
                }
                if (toy.labels === 'Adult') {
                    adult += toy.stock;
                }
                if (toy.labels === 'Educational') {
                    educational += toy.stock;
                }
            });
            var sum = [adult, funny, educational]
            console.log('sum', sum);
            return sum
        })
}

async function getById(toyId) {
    try {
        return axios.get(TOY_URL + toyId).then((res) => res.data)        
    } catch (err) {
        console.log('Error in Query Toys (Front Toy Service):', err);
        throw err;
    }
    // return storageService.get(KEY, toyId)
}

// function save(toy) {
//     // const savedToy = (toy._id) ? storageService.put(TOY_KEY, toy) : storageService.post(TOY_KEY, toy)
//     // return savedToy;
//     console.log('toy._id',toy._id);
//     if (toy._id) {
//         // return axios.put(TOY_URL + `${toy._id}`, toy).then(res => res.data)
//         return axios.put(TOY_URL + toy._id, toy).then((res) => res.data)
//     } else {
//         return axios.post(TOY_URL, toy).then(res => res.data)
//     }
// }
async function save(toy) {
    // const savedToy = (toy._id) ? storageService.put(TOY_KEY, toy) : storageService.post(TOY_KEY, toy)
    // return savedToy;
    try {
        if (toy._id) {
            var res = await axios.put(TOY_URL + `${toy._id}`, toy);
        } else {
            var res = await axios.post(TOY_URL, toy);
        }
        return res.data;
    } catch (err) {
        console.log('Saving Error (Front Toy Service):', err);
        throw err;
    }
}

async function remove(id) {
    // return storageService.remove(TOY_KEY, id)
    
        // return await httpService.delete(TOY_URL + id);
        return await httpService.delete(`toy/${id}`);
    
}
// function save(toy) {

//     const toyToSave = JSON.parse(JSON.stringify(toy));
//     const savedToy = toyToSave._id ? _update(toyToSave) : _add(toyToSave);
//     storageService.store(KEY, gToys);
//     //   return (toy._id) ? axios.put(TODOS_URL,toy).then((res)=>res.data) : axios.post(TODOS_URL,toy).then((res)=>res.data)
//     //   const savedToy = (toy._id) ? storageService.put(KEY,toy) : storageService.post(KEY,toy)

//     return savedToy;
// }



function _add(toy) {
    toy._id = utilService.makeId();
    console.log('imadding', toy)
    gToys.push(toy);
    return toy;
}

function _update(toy) {
    const idx = gToys.findIndex((currToy) => currToy._id === toy._id);
    gToys.splice(idx, 1, toy);
    return toy;
}

function getEmptyToy() {
    return {
        _id: utilService.makeId(),
        name: '',
        price: utilService.getRandomInt(50, 100),
        labels: ["Doll", "Battery Powered", "Baby"],
        createdAt: 1631031801011,
        inStock: true,
    };
}

function _createToys() {
    var toys = JSON.parse(localStorage.getItem(KEY));
    if (!toys || !toys.length) {
        toys = [
            _createToy('superman', '../assets/superman.jpeg', 'Adult'),
            _createToy('andyman', '../assets/andyman.jpeg', 'Adult'),
            _createToy('alien', '../assets/alien', 'Educational'),
            _createToy('dinousaour', '../assets/dinousaour', 'Funny'),
            _createToy('dog', '../assets/dog', 'Educational'),
            _createToy('potato', '../assets/potato', 'Funny'),

        ];
        localStorage.setItem(KEY, JSON.stringify(toys))

    }
    return toys;
}

function _createToy(name, img = '', labels = ["Doll", "Battery Powered", "Baby"]) {
    return {
        _id: utilService.makeId(),
        name,
        price: utilService.getRandomInt(50, 100),
        labels,
        createdAt: 1631031801011,
        inStock: true,
        img,
        stock: utilService.getRandomInt(1, 50),

    };
}