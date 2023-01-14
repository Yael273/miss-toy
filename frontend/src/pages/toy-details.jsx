import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toyService } from "../services/toy.service"
import { utilService } from "../services/util.service"
import imgUrl from '../assets/img/default1.png';


export function ToyDetails() {

    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    const navigate = useNavigate()


    useEffect(() => {
        loadToy()
    }, [toyId])

    async function loadToy() {
        const toy = await toyService.getById(toyId)
        try {
            setToy(toy)
        } catch (err) {
            console.log('Had issues in toy details', err)
            navigate('/toy')
        }
    
    }

    // function loadToyOLD() {
    //     toyService.getById(toyId)
    //         .then((toy) => setToy(toy))
    //         .catch((err) => {
    //             console.log('Had issues in toy details', err)
    //             navigate('/toy')
    //         })

    // }

    function onGoBack() {
        navigate('/toy')
    }

    console.log('toy', toy);

    if (!toy) return <h1>loading...</h1>
    return <section className="toy-details">

<div className="image-container">
                <img src={imgUrl} alt="" />
            </div>
        <h1>{toy.name}</h1>
        <h4>Price: ${toy.price}</h4>
        <p>{utilService.formatTime(toy.createdAt)}</p>
        <p>labels: {toy.labels.map(label => {
            return label + ' '
        })}</p>
        <p>{toy.inStock ? 'in stock' : 'out of stock'}</p>
        <button className="return btn btn-dark" onClick={onGoBack}>return</button>
    </section>
}