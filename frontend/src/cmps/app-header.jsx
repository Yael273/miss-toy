import { NavLink, Link } from "react-router-dom";
import imgUrl from '../assets/img/toys-store.png';

export function AppHeader() {

    return <section className="app-header full">
        <div className="logo">
            <Link to="/"><img src={imgUrl} alt="" /></Link> 
            
        </div>
        <nav>
            <NavLink to="/">Home</NavLink> 
            <NavLink to="/about">About</NavLink> 
            <NavLink to="/toy">Toys</NavLink> 
            <NavLink to="/data">Chart</NavLink> 
        </nav>
    </section>
}