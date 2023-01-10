import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { ToyFilter } from "../cmps/toy-filter.jsx"
import { ToyList } from "../cmps/toy-list.jsx"
import { ToySort } from "../cmps/toy-sort.jsx"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { toyService } from "../services/toy.service.js"
import { loadToys, removeToy, saveToy, setFilter } from "../store/action/toy.action.js"


export function ToyIndex() {

    const toys = useSelector((storeState) => storeState.toyModule.toys)
    const filterBy = useSelector((storeState) => storeState.toyModule.filterBy)
    const [sort, setSort] = useState(toyService.getDefaultSort())

    useEffect(() => {
        onLoadToys(filterBy, sort)
    }, [filterBy, sort])

    function setFilterBy(filterBy) {
        setFilter(filterBy)
    }

    function onLoadToys(filterBy) {
        loadToys(filterBy)
            .then(() => {
                showSuccessMsg('Toys loaded')
            })
            .catch(err => {
                showErrorMsg('Cannot load toys')
            })
    }

    function onRemoveToy(toyId) {
        removeToy(toyId)
            .then(() => {
                showSuccessMsg('Toy removed')
            })
            .catch(err => {
                showErrorMsg('Cannot remove toy')
            })
    }

    // function onAddToy() {
    //     const toyToSave = toyService.getRandomToy()
    //     saveToy(toyToSave)
    //         .then((savedToy) => {
    //             showSuccessMsg(`Toy added (id: ${savedToy._id})`)
    //         })
    //         .catch(err => {
    //             showErrorMsg('Cannot add toy')
    //         })
    // }

    // function onEditToy(toy) {
    //     const price = +prompt('New price?')
    //     const toyToSave = { ...toy, price }

    //     saveToy(toyToSave)
    //         .then((savedToy) => {
    //             showSuccessMsg(`Toy updated to price: $${savedToy.price}`)
    //         })
    //         .catch(err => {
    //             showErrorMsg('Cannot update toy')
    //         })
    // }

    function onSetSort(sort) {
        setSort(sort)
    }

    if (!toys) return <div>Loading...</div>
    return <section className="toy-index">

        <ToyFilter setFilterBy={setFilterBy} />
        <ToySort sort={sort} onSetSort={onSetSort} />

        <Link to={`/toy/edit`}>Add Toy</Link>
        <ToyList
            toys={toys}
            onRemoveToy={onRemoveToy}
            // onEditToy={onEditToy}
        />
    </section>
}