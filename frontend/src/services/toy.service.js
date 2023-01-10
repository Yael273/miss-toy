
import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'toyDB'
const BASE_URL = 'toy/'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter,
    getLabels,
    getDefaultSort,
    getFilterFromSearchParams
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
    const queryParams = `?name=${filterBy.txt}&maxPrice=${filterBy.maxPrice}`
    return httpService.get(BASE_URL + queryParams)
}

function getById(toyId) {
    console.log('hi')
    return httpService.get(`${BASE_URL}${toyId}`)
}

function remove(toyId) {
    return httpService.delete(BASE_URL, toyId)
}

function save(toy) {
    if (toy._id) {
        return httpService.put(BASE_URL, toy)
    } else {
        return httpService.post(BASE_URL, toy)
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

function getFilterFromSearchParams(searchParams) {
    const emptyFilter = getDefaultFilter()
    const filterBy = {}
    for (const field in emptyFilter) {
        filterBy[field] = searchParams.get(field) || ''
    }
    return filterBy
}

// TEST DATA
// storageService.post(STORAGE_KEY, toy).then(x => console.log(x))

// function query(filterBy = getDefaultFilter()) {
//     // return axios.get(BASE_URL).then(res => res.data)
//     return storageService.query(STORAGE_KEY)
//         .then(toys => {
//             if (filterBy.txt) {
//                 const regex = new RegExp(filterBy.txt, 'i')
//                 toys = toys.filter((toy) => regex.test(toy.name))
//             }
//             if (filterBy.maxPrice) {
//                 toys = toys.filter(toy => toy.price <= filterBy.maxPrice)
//             }
//             return toys

//         })
// }

// function remove(toyId) {
//     // return Promise.reject('Not now!')
//     return storageService.remove(STORAGE_KEY, toyId)
// }