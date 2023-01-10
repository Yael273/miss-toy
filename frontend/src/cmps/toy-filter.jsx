import { useEffect, useRef, useState } from "react"
import { toyService } from "../services/toy.service"
import { utilService } from "../services/util.service"


export function ToyFilter({setFilterBy}){

    const [filterByToEdit, setFilterByToEdit] = useState(toyService.getDefaultFilter())

    setFilterBy = useRef(utilService.debounce(setFilterBy))

    const elInputRef = useRef(null)

    useEffect(() => {
        elInputRef.current.focus()
    }, [])

    useEffect(() => {
        setFilterBy.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type, checked } = target
        value = (type === 'number') ? +value : value
        value = (field === "inStock") ? checked : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    return <section className="toy-filter">
        <form>
            <label htmlFor="name">Name:</label>
            <input type="text"
                id="name"
                name="txt"
                placeholder="By name"
                value={filterByToEdit.txt}
                onChange={handleChange}
                ref={elInputRef}
            />

            <label htmlFor="maxPrice">Max price:</label>
            <input type="number"
                id="maxPrice"
                name="maxPrice"
                placeholder="By max price"
                value={filterByToEdit.maxPrice}
                onChange={handleChange}
            />
            <label className='filter-label'>
                <span className='filter-label'>In stock</span>
                <input
                    type="checkbox"
                    onChange={handleChange}
                    name="inStock"
                    className="check-box"
                />
            </label>

            <button hidden>Filter</button>
        </form>
    </section>
}