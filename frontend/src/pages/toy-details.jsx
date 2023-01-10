import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toyService } from "../services/toy.service"
import { utilService } from "../services/util.service"


export function ToyDetails() {

    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    const navigate = useNavigate()


    useEffect(() => {
        loadToy()
    }, [toyId])

    function loadToy() {
        toyService.getById(toyId)
            .then((toy) => setToy(toy))
            .catch((err) => {
                console.log('Had issues in toy details', err)
                navigate('/toy')
            })

    }

    function onGoBack() {
        navigate('/toy')
    }

    console.log('toy', toy);

    if (!toy) return <h1>loading...</h1>
    return <section className="toy-details">
        <h1>{toy.name}</h1>
        <h4>Price: ${toy.price}</h4>
        <p>{utilService.formatTime(toy.createdAt)}</p>
        <p>labels: {toy.labels.map(label => {
            return label + ' '
        })}</p>
        <p>{toy.inStock ? 'in stock' : 'out of stock'}</p>
        <button className="return" onClick={onGoBack}>return</button>
    </section>
}