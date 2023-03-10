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
    // const filterBy = useSelector((storeState) => storeState.toyModule.filterBy)
    // const [sort, setSort] = useState(toyService.getDefaultSort())
    const [filterBy, setFilterBy] = useState(toyService.getDefaultFilter())


    console.log('toys', toys);

    useEffect(() => {
        onLoadToys(filterBy)
    }, [filterBy])

    function onSetFilter(filterByFromFilter) {
        setFilterBy(filterByFromFilter)
    }

    async function onLoadToys(filterBy) {
        try {
            await loadToys(filterBy)
            showSuccessMsg('Toys loaded')
        } catch (err) {
            showErrorMsg('Cannot load toys')
        }
    }

    async function onRemoveToy(toyId) {
        await removeToy(toyId)
        try {
            console.log(toyId, 'removed');
            showSuccessMsg('Toy removed')
        } catch (err) {
            showErrorMsg('Cannot remove toy')
        }

    }

    // function onSetSort(sort) {
    //     setSort(sort)
    // }

    if (!toys) return <div>Loading...</div>
    return <section className="toy-index">

        <div className="filter-container">
            <ToyFilter onSetFilter={onSetFilter} />
            {/* <ToySort sort={sort} onSetSort={onSetSort} /> */}
            <Link to={`/toy/edit`}>
                <button className="btn btn-dark toy-add">
                    Add Toy
                </button>
            </Link>
        </div>

        <ToyList
            toys={toys}
            onRemoveToy={onRemoveToy}
        // onEditToy={onEditToy}
        />
    </section>
}

// function onRemoveToyOLD(toyId) {
    //     removeToy(toyId)
    //         .then(() => {
    //             showSuccessMsg('Toy removed')
    //         })
    //         .catch(err => {
    //             showErrorMsg('Cannot remove toy')
    //         })
    // }

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

        // function onLoadToysOLD(filterBy) {
    //     loadToys(filterBy)
    //         .then(() => {
    //             showSuccessMsg('Toys loaded')
    //         })
    //         .catch(err => {
    //             showErrorMsg('Cannot load toys')
    //         })
    // }