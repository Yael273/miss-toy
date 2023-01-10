import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { MultiSelect } from "../cmps/multi-select"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { toyService } from "../services/toy.service"
import { loadToys } from "../store/action/toy.action"


export function ToyEdit() {

    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const navigate = useNavigate()
    const { toyId } = useParams()

    // const toys = useSelector((storeState) => storeState.toyModule.toys)

    useEffect(() => {
        if (!toyId) return
        loadToy()
    }, [])

    function loadToy() {
        toyService.getById(toyId)
            .then((toy) => setToyToEdit(toy))
            .catch((err) => {
                console.log('Had issues in toy details', err)
                navigate('/toy')
            })
    }

    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        setToyToEdit((prevToy) => ({ ...prevToy, [field]: value }))
    }

    function onSaveToy(ev) {
        ev.preventDefault()
        toyService.save(toyToEdit)
            .then((toy) => {
                console.log('toy saved', toy);
                showSuccessMsg('Toy saved!')
                navigate('/toy')
            })
            .catch(err => {
                console.log('err', err)
                showErrorMsg('Cannot save toy')
            })
    }

    function onSetLabels(labels) {
        setToyToEdit({ ...toyToEdit, labels })
    }

    function getYesNo() {
        return toyToEdit.inStock
    }

    return <section className="toy-edit">
        <h2>{toyToEdit.id ? 'Edit this toy' : 'Add a new toy'}</h2>

        <form onSubmit={onSaveToy}>
            <label htmlFor="name">Name : </label>
            <input type="text"
                name="name"
                id="name"
                placeholder="Enter name..."
                value={toyToEdit.name}
                onChange={handleChange}
            />
            <label htmlFor="price">Price : </label>
            <input type="number"
                name="price"
                id="price"
                placeholder="Enter price"
                value={toyToEdit.price}
                onChange={handleChange}
            />

            <div>
                <MultiSelect onSetLabels={onSetLabels} />
            </div>
            <div>
                <select value={getYesNo() || '1'} onChange={handleChange} name="inStock" className='edit-input'>
                    <option value={'1'} disabled>
                        In Stock
                    </option>
                    <option value={1}>Yes</option>
                    <option value=''>No</option>
                </select>
            </div>
            <div>
                <button>{toyToEdit._id ? 'Save' : 'Add'}</button>
                <Link to="/toy">Cancel</Link>
            </div>
        </form>
    </section>
}