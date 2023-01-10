import { NavLink } from "react-router-dom";

export function AppHeader() {

    return <section className="app-header">
        <div className="logo">
            <h1>Toys</h1>
        </div>
        <nav>
            <NavLink to="/">Home</NavLink> 
            <NavLink to="/about">About</NavLink> 
            <NavLink to="/toy">Toys</NavLink> 
            <NavLink to="/data">Chart</NavLink> 
        </nav>
    </section>
}