// const fs = require('fs')

// module.exports = {
//     query,
//     getById,
//     remove,
//     add,
//     update,
//     // getAllBugs
// }

// var toys = _createToys();


// function query() {

//     return Promise.resolve(toys)
// }

// function getById(id) {
//     var toy = toys.find(toy => toy._id === id);
//     if (toy) return Promise.resolve(toy);
//     else return Promise.reject('Unknown toy');
// }

// function remove(toyId ) {
//     var toyIdx = toys.findIndex(toy => toy._id === toyId )
//     if (toyIdx < 0) return Promise.reject('Unknow toy');
//     toys.splice(toyIdx, 1)
//     return  _saveToysToFile();
// }

// function update(toy) {
//     var toyIdx = toys.findIndex(currToy => currToy._id === toy._id );
//     if (toyIdx < 0) return Promise.reject('Unknow Bug');
//     toys.splice(toyIdx, 1, toy);
//     return _saveToysToFile().then(() => toy)

// }

// function add(toy) {
//     toy._id = _makeId()
//     toys.unshift(toy)
//     return _saveToysToFile().then(() => toy)
// }

// function _saveToysToFile() {
//     return new Promise((resolve, reject) => {
//         fs.writeFile("data/toys.json", JSON.stringify(toys), (err) => {
//             if (err) {
//                 return reject(err)
//             }
//             resolve()
//         });

//     })
// }





// function _createToys() {
//     toys = require('../data/toys.json')
//     if (toys && toys.length) return toys;
//     return ['Chen', 'Ziv'].map(_createToy)
// }

// function _createToy(name) {
//     return {
//         "_id": _makeId(),
//         "title": name,
//         "description": "problem when clicking Save",
//         "severity": 3,
//         "createdAt": 1542107359454,
//         "creator": {
//             "_id": "xyz111",
//             "name": "Shahar"
//         }
//     }

// }

// function _makeId(length = 3) {
//     var txt = '';
//     var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     for (var i = 0; i < length; i++) {
//         txt += possible.charAt(Math.floor(Math.random() * possible.length));
//     }
//     return txt;
// }


// // function getAllBugs(){
// //     return Promise.resolve(bugs)

// // }