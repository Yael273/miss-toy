import { Link } from "react-router-dom"


export function ToyPreview({ toy, onEditToy, onRemoveToy }) {

    return <section className="toy-preview">

        {/* <img src={require("../../img/default.png")} alt=""/> */}
        <img src="../../img/default.png" alt=""/>
            {/* <img src={`https://robohash.org/${toy.name}?set=set5`} alt="" /> */}
            <h4>{toy.name}</h4>
            <p>price: ${toy.price}</p>

            <div className="hidden-btns">
                <button onClick={() => { onRemoveToy(toy._id) }}>x</button>
                {/* <button onClick={() => { onEditToy(toy) }}>Change price</button> */}
                <Link to={`/toy/edit/${toy._id}`}>edit</Link>
                <Link to={`/toy/${toy._id}`}>Details</Link>
            </div>

    </section>
}