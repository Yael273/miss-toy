
const fs = require('fs')
var toys = require('../data/toys.json')
const PAGE_SIZE = 3

module.exports = {
    query,
    get,
    remove,
    save
}

function query(filterBy) {
    filterBy.maxPrice = +filterBy.maxPrice
    let filteredToys = toys
    if (filterBy.name) {
        const regex = new RegExp(filterBy.name, 'i')
        filteredToys = filteredToys.filter(toy => regex.test(toy.name))
    }
    if (filterBy.maxPrice) {
        filteredToys = filteredToys.filter(toy => toy.price <= filterBy.maxPrice)
    }
    if (filterBy.inStock) {
        filteredToys = filteredToys.filter(toy => toy.inStock)
    }
    return Promise.resolve(filteredToys)
}

function get(toyId) {
    const toy = toys.find(toy => toy._id === toyId)
    if (!toy) return Promise.reject('Toy not found')
    return Promise.resolve(toy)
}

function remove(toyId, loggedinUser) {
    const idx = toys.findIndex(toy => toy._id === toyId)
    if (idx === -1) return Promise.reject('No Such Toy')
    // const toy = toys[idx]
    // if (toy.owner._id !== loggedinUser._id) return Promise.reject('Not your Toy')
    toys.splice(idx, 1)
    return _writeToysToFile()
}

function save(toy, loggedinUser) {
    if (toy._id) {
        const toyToUpdate = toys.find(currToy => currToy._id === toy._id)
        if (!toyToUpdate) return Promise.reject('No such Toy')
        // if (toyToUpdate.owner._id !== loggedinUser._id) return Promise.reject('Not your Toy')

        toyToUpdate.name = toy.name
        toyToUpdate.price = toy.price
    } else {
        toy._id = _makeId()
        toy.createdAt = Date.now()
        toy.inStock = true
        // toy.owner = loggedinUser
        toys.push(toy)
    }
    return _writeToysToFile().then(() => toy)
}

function _makeId(length = 5) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function _writeToysToFile() {
    return new Promise((res, rej) => {
        const data = JSON.stringify(toys, null, 2)
        fs.writeFile('data/toys.json', data, (err) => {
            if (err) return rej(err)
            console.log("File written successfully\n");
            res()
        })
    })
}

// function query() {
//     return Promise.resolve(toys)
// }

// function query(filterBy, sortBy) {
//     let filteredToys = toys
//     if (filterBy.title) {
//         const regex = new RegExp(filterBy.title, 'i')
//         filteredToys = filteredToys.filter(toy => regex.test(toy.title))
//     }
//     if (filterBy.minSeverity) {
//         filteredToys = filteredToys.filter(toy => toy.severity >= +filterBy.minSeverity)
//     }

//     // Sorting
//     if (sortBy) {
//         if (sortBy.sortByCat === 'createdAt' || sortBy.sortByCat === 'severity') {
//             filteredToys.sort((b1, b2) => (b1[sortBy.sortByCat] - b2[sortBy.sortByCat]) * sortBy.desc)
//         }
//         if (filterBy.sortBy === 'title') {
//             filteredToys.sort((b1, b2) => b1.title.localeCompare(b2.title) * sortBy.desc)
//         }
//     }

//     // Paging
//     const totalPages = Math.ceil(filteredToys.length / +filterBy.pageSize)
//     if (filterBy.pageIdx !== undefined) {
//         const startIdx = filterBy.pageIdx * +filterBy.pageSize
//         filteredToys = filteredToys.slice(startIdx, +filterBy.pageSize + startIdx)
//     }

//     return Promise.resolve({ totalPages, toys: filteredToys })

// }