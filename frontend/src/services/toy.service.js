
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
    getFilterFromSearchParams,
    getEmptyMsg,
    addToyMsg,
    removeToyMsg
}

// const labels = ["On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor", "Battery Powered"]
// const msgs = [{ txt: 'hello', createdAt: new Date() }]

const toy = {
    _id: "t101",
    name: "Talking Doll",
    price: 123,
    labels: ["Doll", "Battery Powered", "Baby"],
    createdAt: 1631031801011,
    inStock: true,
    msgs: [
        {
            id: 'm101',
            txt: 'Great toy, how much',
            by: {
                _id: 'u101',
                fullname: 'Puki Ga'
            }
        }
    ]
}


async function query(filterBy = getDefaultFilter()) {
    // const queryParams = `?name=${filterBy.txt}&maxPrice=${filterBy.maxPrice}`
    // return await httpService.get(BASE_URL + queryParams)
    return httpService.get(BASE_URL, { params: { filterBy } })
}

async function getById(toyId) {
    return await httpService.get(`${BASE_URL}${toyId}`)
}

async function remove(toyId) {
    return await httpService.delete(`${BASE_URL}${toyId}`)
}

function save(toy) {
    const url = (toy._id) ? BASE_URL + `${toy._id}` : BASE_URL
    const method = (toy._id) ? 'put' : 'post'
    const res = httpService[method](url, toy)
    try {
        // return res.data
        return res
    } catch (err) {
        console.log('error occurred in save:', err)
    }
    //OLD VERSION
    // return httpService[method](url, toy).then(res => res.data)
}

function getEmptyToy() {
    return {
        "name": '',
        "price": 0,
        "labels": [],
        "createdAt": Date.now(),
        // "inStock": true
        "inStock": '',
        "msgs": []
    }
}

function getDefaultFilter() {
    return { name: '', price: 0, sort: '', desc: 1, labels: getLabels(), inStock: '' }
}

function getDefaultSort() {
    return { by: 'name', asc: true }
}

function getEmptyMsg() {
    return {
        id: utilService.makeId(),
        txt: ''
    }
}

function getLabels() {
    return [
        "On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor", "Battery Powered"
    ]
}

async function addToyMsg(toyId, msg) {
    try {
        const savedMsg = await httpService.post(`toy/${toyId}/msg`, { msg })
        return savedMsg
    } catch (e) {
        /// do error handling 
    }

}

async function removeToyMsg(toyId, msgId) {
    await httpService.delete(`toy/${toyId}/msg/${msgId}`)

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


