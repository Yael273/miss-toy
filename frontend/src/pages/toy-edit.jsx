import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { MultiSelect } from "../cmps/multi-select"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { toyService } from "../services/toy.service"
import { loadToys, saveToy } from "../store/action/toy.action"

import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useForm } from "../customHooks/useForm"
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material"
// import { TextField } from '@mui/material';

const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'Too Short!')
        .max(7, 'Too Long!')
        .required('Required'),
    lastName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
});

// const CustomTextField = (props) => {
//     return <TextField id="outlined-basic" label="Outlined" variant="outlined" {...props}  />

// }

export function ToyEdit() {

    // const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const [toyToEdit, setToyToEdit, handleChange] = useForm(toyService.getEmptyToy())
    const navigate = useNavigate()
    const { toyId } = useParams()
    const labels = toyService.getLabels()

    // const toys = useSelector((storeState) => storeState.toyModule.toys)

    useEffect(() => {
        if (!toyId) return
        loadToy()
    }, [])

    async function loadToy() {
        const toy = await toyService.getById(toyId)
        try {
            setToyToEdit(toy)
        } catch (err) {
            console.log('Had issues in toy details', err)
            navigate('/toy')
        }
    }


    // function handleChange({ target }) {
    //     let { value, type, name: field } = target
    //     value = type === 'number' ? +value : value
    //     setToyToEdit((prevToy) => ({ ...prevToy, [field]: value }))
    // }
    

    async function onSaveToy(ev) {
        ev.preventDefault()
        console.log('toyToEdit', toyToEdit);
        try {
           await saveToy(toyToEdit)
        console.log('toy saved', toyToEdit);
        showSuccessMsg('Toy saved!')
        navigate('/toy')
       } catch (err) {
        console.log('err', err)
        showErrorMsg('Cannot save toy')
       }
 
    }


    // function onSetLabels(labels) {
    //     setToyToEdit({ ...toyToEdit, labels })
    // }

    // function getYesNo() {
    //     return toyToEdit.inStock
    // }

    return <section className="toy-edit">

<div onClick={() => navigate('/toy')} className="black-screen"></div>

<div className="toy-edit-modal">
        <h2>{toyToEdit._id ? 'Edit this toy' : 'Add a new toy'}</h2>

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

                    <FormControl style={{ backgroundColor: '#fff' }} sx={{ m: 1, minWidth: 120}}>
                        <InputLabel id="demo-simple-select-label">inStock</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={toyToEdit.inStock}
                            label="Age"
                            onChange={handleChange}
                            name="inStock"
                            className="edit-select"
                        >
                            <MenuItem value={true}>Yes</MenuItem>
                            <MenuItem value={false}>No</MenuItem>
                        </Select>
                    </FormControl>

            <FormControl style={{ backgroundColor: '#fff' }} sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-label">Type</InputLabel>
                        <Select
                            multiple
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={toyToEdit.labels}
                            onChange={handleChange}
                            name="labels"
                        >

                            {labels.map((label, idx) =>
                                <MenuItem key={idx} value={label}>{label}</MenuItem>
                            )}

                        </Select>

                    </FormControl>

            {/* <div>
                <MultiSelect onSetLabels={onSetLabels} />
            </div>
            <div>
                <select value={getYesNo() || '1'} onChange={handleChange} name="inStock" className='edit-input' >
                    <option value={'1'} disabled>
                        In Stock
                    </option>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                </select>
            </div> */}
            <div className="add-save-btns">
                <button className="btn btn-dark">{toyToEdit._id ? 'Save' : 'Add'}</button>
                <Link to="/toy">Cancel</Link>
            </div>

            


        </form>

        {/* <Formik
            initialValues={{
                firstName: '',
                lastName: '',
                email: '',
            }}
            validationSchema={SignupSchema}
            onSubmit={onSaveToy}
        >
            {({ errors, touched }) => (
                <Form className='formik'>
                    <Field name="firstName" />
                    {errors.firstName && touched.firstName ? (
                        <span>{errors.firstName}</span>
                    ) : null}
                    <Field name="lastName" title="BABABA"  />
                    {errors.lastName && touched.lastName ? (
                        <div>{errors.lastName}</div>
                    ) : null}
                    <Field name="email" type="email" />
                    {errors.email && touched.email ? <div>{errors.email}</div> : null}
                    <button type="submit">Submit</button>
                </Form>
            )}
        </Formik> */}
        </div>
    </section>
}


    // function onSaveToyOLD(ev) {
    //     ev.preventDefault()
    //     toyService.save(toyToEdit)
    //         .then((toy) => {
    //             console.log('toy saved', toyToEdit);
    //             showSuccessMsg('Toy saved!')
    //             navigate('/toy')
    //         })
    //         .catch(err => {
    //             console.log('err', err)
    //             showErrorMsg('Cannot save toy')
    //         })
    // }

    
    // function loadToyOLD() {
    //     toyService.getById(toyId)
    //         .then((toy) => setToyToEdit(toy))
    //         .catch((err) => {
    //             console.log('Had issues in toy details', err)
    //             navigate('/toy')
    //         })
    // }