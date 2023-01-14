import { Field } from 'formik';
import React, { useEffect, useState } from 'react'
import { toyService } from '../services/toy.service';
import Select from 'react-select';

export function MultiSelect({ onSetLabels }) {

    const [selectedLabels, setSelectedLabels] = useState([])
    const [isOptionsModalOpen, setIsOptionsModalOpen] = useState(false)

    useEffect(() => {
        onSetLabels(selectedLabels);
    }, [selectedLabels])

    function onSelectLabel(label) {
        let newSelectedLabels = [...selectedLabels]
        if (isLabelChosen(label)) {
            newSelectedLabels = newSelectedLabels.filter(currLabel => currLabel !== label)
        } else {
            newSelectedLabels.push(label)
        }
        setSelectedLabels(newSelectedLabels)
    }

    function isLabelChosen(label) {
        return selectedLabels.includes(label)
    }

    const labels = toyService.getLabels()
    return <section className="multi-select">

        <div className="selected-options-container" onClick={() => setIsOptionsModalOpen(!isOptionsModalOpen)}>
            <div> Label
                {selectedLabels.map(label => <option key={label}>{label}</option>)}
            </div>
        </div>

        <div className={`options-container  ${isOptionsModalOpen ? ' open' : ''}`}>
            {/* <select> */}
            {labels.map(label => <div onClick={() => onSelectLabel(label)} key={label}>
                {label} {isLabelChosen(label) ? 'V' : ''}
            </div>
            )}
            {/* </select> */}
        </div>

        {/* <Select
            defaultValue={selectedLabels.label}
            name="multiSelectCustom"
            id="multiSelectCustom"
            placeholder="Multi Select"
            isMulti={true}
            component={MultiSelect}
            options={[
                { value: 'doll', label: 'Doll' },
                { value: 'puzzle', label: 'Puzzle' },
                { value: 'baby', label: 'Baby' },
            ]}
        /> */}

    </section >
}