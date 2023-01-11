import React from 'react'

export function ToySort({ sort, onSetSort }) {

    function handleSortChange(by) {
        const updatedSort = { ...sort, by }
        onSetSort(updatedSort)
    }

    function handleDirectionChange() {
        const updatedSort = { ...sort, asc: !sort.asc }
        onSetSort(updatedSort)
    }

    return <section className="toy-sort">
        <h3>Sort toys:</h3>
        <button className='btn btn-dark' onClick={() => handleSortChange('name')}>By name</button>
        <button className='btn btn-dark' onClick={() => handleSortChange('price')}>By price</button>
        <button className='btn btn-dark' onClick={handleDirectionChange}>Change direction {sort.asc ? '^' : 'v'}</button>
    </section>
}