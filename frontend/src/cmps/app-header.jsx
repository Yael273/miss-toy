import { NavLink } from "react-router-dom";

export function AppHeader() {

    return <section className="app-header">
        <div className="logo">
            <h1>Toys</h1>
        </div>
        <nav>
            <NavLink to="/">Home</NavLink> 
            <NavLink to="/toy">Toys</NavLink> 
        </nav>
    </section>
}