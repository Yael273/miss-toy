import { Link } from "react-router-dom"
import { utilService } from "../services/util.service";
// import imgUrl from '../assets/img/default1.png';
import imgUrl from '../assets/img/default1.png';
import imgUrl2 from '../assets/img/default2.png';
import imgUrl3 from '../assets/img/default3.png';
import { useSelector } from "react-redux";

export function ToyPreview({ toy, onEditToy, onRemoveToy }) {

    const user = useSelector((storeState => storeState.userModule.user))
    const imgs = [imgUrl, imgUrl2, imgUrl3]

    return <section className="toy-preview skeleton">
        <Link to={`/toy/${toy._id}`}>
            <div className="image-container">
                {/* <img src={imgs[utilService.getRandomIntInclusive(0, 2)]} alt="" /> */}
                <img src={imgUrl} alt="" />
            </div>
            <h4>{toy.name}</h4>
            <p>price: ${toy.price}</p>
        </Link>
        <div className="hidden-btns">
            {user && <button onClick={() => { onRemoveToy(toy._id) }}>x</button>}
            {user && <Link to={`/toy/edit/${toy._id}`}>edit</Link>}
            {/* <button onClick={() => { onEditToy(toy) }}>Change price</button> */}
            {/* <Link to={`/toy/${toy._id}`}>Details</Link> */}
        </div>

    </section>

}