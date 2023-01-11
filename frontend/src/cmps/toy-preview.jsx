import { Link } from "react-router-dom"
import imgUrl from '../assets/img/default1.png';

export function ToyPreview({ toy, onEditToy, onRemoveToy }) {

    return <section className="toy-preview">
        <Link to={`/toy/${toy._id}`}>
            <div className="image-container">
                <img src={imgUrl} alt="" />
            </div>
            <h4>{toy.name}</h4>
            <p>price: ${toy.price}</p>
        </Link>
        <div className="hidden-btns">
            <button onClick={() => { onRemoveToy(toy._id) }}>x</button>
            {/* <button onClick={() => { onEditToy(toy) }}>Change price</button> */}
            <Link to={`/toy/edit/${toy._id}`}>edit</Link>
            {/* <Link to={`/toy/${toy._id}`}>Details</Link> */}
        </div>

    </section>

}