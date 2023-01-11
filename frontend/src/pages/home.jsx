import { Link } from 'react-router-dom';
import imgUrl from '../assets/img/home-page.png';

export function Home(){

    return <section className="home-container full">
        <div className="img-container">
            <img src={imgUrl} alt="" />
        </div>
        <Link className='btn btn-light' to="/toy">Start Shopping</Link> 
    </section>
}