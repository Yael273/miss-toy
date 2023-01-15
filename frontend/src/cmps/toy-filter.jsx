import { useEffect, useRef, useState } from "react"
import { toyService } from "../services/toy.service"
import { utilService } from "../services/util.service"
import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

import Select from 'react-select';

const options = [
    { value: 'all', label: 'All' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];

export function ToyFilter({ onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState(toyService.getDefaultFilter())
    const [isPriceModal, setIsPriceModal] = useState(false)

    onSetFilter = useRef(utilService.debounce(onSetFilter))

    const elInputRef = useRef(null)

    useEffect(() => {
        elInputRef.current.focus()
    }, [])

    useEffect(() => {
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type, checked } = target
        value = (type === 'number') ? +value : value
        value = (field === "inStock") ? checked : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    function valuetext(value) {
        return `${value}$`;
    }

    return <section className="toy-filter">
        <form>
            <label htmlFor="name">Name:</label>
            <input type="text"
                id="name"
                name="name"
                placeholder="By name"
                value={filterByToEdit.name}
                onChange={handleChange}
                ref={elInputRef}
            />

            <label htmlFor="price">Max price:</label>
            <input type="number"
                id="price"
                name="price"
                placeholder="By price"
                value={filterByToEdit.price}
                onChange={handleChange}
            />
            <label className='filter-label'>
                <span className='filter-label'>In stock</span>
                <input
                    type="checkbox"
                    onChange={handleChange}
                    name="inStock"
                    className="check-box"
                    value={filterByToEdit.inStock}
                />
            </label>
            {/* <label className='filter-label'>
                <span className='filter-label'>Filter By</span>
                <Select
                    defaultValue={filterByToEdit.type}
                    // value={filterByToEdit.type}
                    onChange={handleChange}
                    options={options}
                    name="type"
                />
            </label> */}

            <select name="sort" id="" onChange={handleChange}>
                <option value="">Sort By</option>
                <option value="lowPrice">Price:Low to High</option>
                <option value="highPrice">Price:High to Low</option>
                <option value="createdAt">Newest Arrivals</option>
            </select>

            <button hidden>Filter</button>
        </form>
        {/* <Button variant="contained">Hello World</Button> */}

        {/* <div>
            <input type="text" name="name" onChange={handleChange} placeholder='Search by text ...' />
            <button onClick={() => setIsPriceModal((prev) => !prev)}>MaxPrice</button>
        </div> */}
        {/* {isPriceModal && <Box sx={{ width: 300 }} className='filter-price'>
            <Slider
                aria-label="Temperature"
                defaultValue={1000}
                getAriaValueText={valuetext}
                valueLabelDisplay="auto"
                step={10}
                min={0}
                max={1000}
                name="price"
                onChange={handleChange}
            />
        </Box>} */}





    </section>
}

