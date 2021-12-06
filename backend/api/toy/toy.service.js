const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId
console.log('ObjectId', ObjectId);



async function query(filterBy) {
    try {
        // const criteria = _buildCriteria(filterBy)
        const criteria = {}

        const collection = await dbService.getCollection('toy')
      
        // console.log('collection', collection);
        var toys = await collection.find(criteria).toArray()
        // console.log('toysss', toys);
        return toys
    } catch (err) {
        logger.error('cannot find toys', err)
        throw err
    }
}

async function getById(toyId) {
    try {
        // console.log('ObjectId(toyId)', ObjectId(toyId), typeof ObjectId(toyId));
        // console.log('toyId', toyId,typeof toyId);
        const collection = await dbService.getCollection('toy')
        // console.log('onject', ObjectId(toyId));
       
        const toy = collection.findOne({
            '_id': ObjectId(toyId)
        })
        // const toy = collection.findOne({
        //     '_id': toyId
        // })
        // console.log('toy data 43', toy);
        return toy
    } catch (err) {
        logger.error(`while finding toy ${toyId}`, err)
        throw err
    }
}

async function remove(toyId) {
    try {
        const collection = await dbService.getCollection('toy')
        await collection.deleteOne({
            '_id': ObjectId(toyId)
        })
        return toyId
    } catch (err) {
        logger.error(`cannot remove toy ${toyId}`, err)
        throw err
    }
}

async function add(toy) {
    try {
        const collection = await dbService.getCollection('toy')
        const addedToy = await collection.insertOne(toy)
        return addedToy
    } catch (err) {
        logger.error('cannot insert toy', err)
        throw err
    }
}
async function update(toy) {
    try {
        var id = ObjectId(toy._id)
        console.log('toy - before',toy);
        delete toy._id
        // console.log('JSON.parse(toy.price)',JSON.parse(toy.price));
        // toy.price = JSON.parse(toy.price)
        // console.log('toy - after',toy);
        const collection = await dbService.getCollection('toy')
        // console.log('collection',collection);
        // if(collection) console.log('collection',collection);
        await collection.updateOne({
            "_id": id
        }, {
            $set: {
                ...toy
            }
        })
        return toy
    } catch (err) {
        logger.error(`cannot update toy ${toyId}`, err)
        throw err
    }
}

module.exports = {
    remove,
    query,
    getById,
    add,
    update,
}