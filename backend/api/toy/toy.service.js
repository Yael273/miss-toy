const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const utilService = require('../../services/util.service')
const ObjectId = require('mongodb').ObjectId


async function query(filterBy = { name: '' }) {
    try {
        const criteria = _buildCriteria(filterBy)
        const collection = await dbService.getCollection('toy')
        var toys = await collection.find(criteria).sort(sortCriteria(filterBy)).toArray()
        return toys
    } catch (err) {
        logger.error('cannot find toys', err)
        throw err
    }
}

async function getById(toyId) {
    try {
        const collection = await dbService.getCollection('toy')
        const toy = collection.findOne({ _id: ObjectId(toyId) })
        return toy
    } catch (err) {
        logger.error(`while finding toy ${toyId}`, err)
        throw err
    }
}

async function remove(toyId) {
    try {
        const collection = await dbService.getCollection('toy')
        await collection.deleteOne({ _id: ObjectId(toyId) })
        return toyId
    } catch (err) {
        logger.error(`cannot remove toy ${toyId}`, err)
        throw err
    }
}

async function add(toy) {
    try {
        const collection = await dbService.getCollection('toy')
        await collection.insertOne(toy)
        return toy
    } catch (err) {
        logger.error('cannot insert toy', err)
        throw err
    }
}

async function update(toy) {
    try {
        const toyToSave = {
            name: toy.name,
            price: toy.price,
            inStock: toy.inStock,
            labels: toy.labels
        }
        const collection = await dbService.getCollection('toy')
        await collection.updateOne({ _id: ObjectId(toy._id) }, { $set: toyToSave })
        return toy
    } catch (err) {
        logger.error(`cannot update toy ${toyId}`, err)
        throw err
    }
}

// async function addToyMsg(toyId, msg) {
//     try {
//         msg.id = utilService.makeId()
//         const collection = await dbService.getCollection('toy')
//         await collection.updateOne({ _id: ObjectId(toyId) }, { $push: { msgs: msg } })
//         return msg
//     } catch (err) {
//         logger.error(`cannot add toy msg ${toyId}`, err)
//         throw err
//     }
// }

async function addToyMsg(toyId, msg, loggedinUser) {
    try {
        const msgToSave = {
            ...msg,
            by: {
                fullname: loggedinUser.fullname,
                _id: loggedinUser._id
            }
        }
        // msg.id = utilService.makeId()
        const collection = await dbService.getCollection('toy')
        await collection.updateOne({ _id: ObjectId(toyId) }, { $push: { msgs: msgToSave } })
        return msgToSave
    } catch (err) {
        logger.error(`cannot add toy msg ${toyId}`, err)
        throw err
    }
}

async function removeToyMsg(toyId, msgId) {
    try {
        const collection = await dbService.getCollection('toy')
        await collection.updateOne({ _id: ObjectId(toyId) }, { $pull: { msgs: { id: msgId } } })
        return msgId
    } catch (err) {
        logger.error(`cannot add toy msg ${toyId}`, err)
        throw err
    }
}



function sortCriteria(filterBy) {
    if (filterBy.sort === 'createdAt') {
        return { 'createdAt': -1 }
    }
    if (filterBy.sort === 'highPrice') {
        return { 'price': -1 }
    }
    if (filterBy.sort === 'lowPrice') {
        return { 'price': 1 }
    }
    return

}

function _buildCriteria(filterBy) {
    console.log('filterBy in toy service:', filterBy)
    let criteria = {}
    console.log('filterBy from build crateria', filterBy)
    console.log('filterBy.price', filterBy.price)
    if (filterBy.name) {
        criteria.name = { $regex: new RegExp(filterBy.name, 'ig') }
    }
    // if (filterBy.price) {
    //     criteria.price = { $gte: filterBy.price }
    // }
    // if (filterBy.inStock) {
    //     // criteria.inStock = 'true'
    //     criteria.inStock = true
    // }
    // if (filterBy?.labels?.length) {
    //     criteria.lables = { $all: filterBy.labels }
    // }
    return criteria
}

module.exports = {
    remove,
    query,
    getById,
    add,
    update,
    addToyMsg,
    removeToyMsg,
}
