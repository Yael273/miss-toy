import React, { useEffect, useState } from 'react'
import { toyService } from '../services/toy.service';


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
            <select> selected :
            selected
            {selectedLabels.map(label => <option key={label}>{label}</option>)}
            </select>
        </div>

        <div className={`options-container  ${isOptionsModalOpen ? ' open' : ''}`}>
        <select>
            {labels.map(label => <option onClick={() => onSelectLabel(label)} key={label}>
                {label} {isLabelChosen(label) ? 'V' : ''}
            </option>
            )}
            </select>
        </div>
        
    </section >
}