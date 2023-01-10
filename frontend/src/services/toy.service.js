
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'toyDB'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter,
    getLabels,
    getDefaultSort
}

const labels = ["On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor", "Battery Powered"]
const msgs = [{ txt: 'hello', createdAt: new Date() }]

const toy = {
    "_id": "t101",
    "name": "Talking Doll",
    "price": 123,
    "labels": ["Doll", "Battery Powered", "Baby"],
    "createdAt": 1631031801011,
    "inStock": true
}


function query(filterBy = getDefaultFilter()) {
    // return axios.get(BASE_URL).then(res => res.data)
    return storageService.query(STORAGE_KEY)
        .then(toys => {
            if (filterBy.txt) {
                const regex = new RegExp(filterBy.txt, 'i')
                toys = toys.filter((toy) => regex.test(toy.name))
            }
            if (filterBy.maxPrice) {
                toys = toys.filter(toy => toy.price <= filterBy.maxPrice)
            }
            return toys

        })
}
function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
}
function remove(toyId) {
    // return Promise.reject('Not now!')
    return storageService.remove(STORAGE_KEY, toyId)
}
function save(toy) {
    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)
    } else {
        // when switching to backend - remove the next line
        return storageService.post(STORAGE_KEY, toy)
    }
}

function getEmptyToy() {
    return {
        "name": '',
        "price": 0,
        "labels": [],
        "createdAt": Date.now(),
        "inStock": true
    }
}

function getDefaultFilter() {
    return { txt: '', maxPrice: 0, isStock: '' }
}

function getDefaultSort() {
    return { by: 'name', asc: true }
}

function getLabels() {
    return labels
}

// TEST DATA
// storageService.post(STORAGE_KEY, toy).then(x => console.log(x))

