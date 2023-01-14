import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link, useNavigate } from "react-router-dom";
import imgUrl from '../assets/img/toys-store.png';
import { login, logout } from "../store/action/user.action";
import { SET_USER } from "../store/reducer/user.reducer";

export function AppHeader() {

    const user = useSelector((storeState => storeState.userModule.user))
    console.log('user', user);

    const navigate = useNavigate()
    const dispatch = useDispatch()

    function setUser(user) {
        dispatch({ type: SET_USER, user })
    }

    function onLogout() {
        logout()
            .then(() => {
                setUser(null)
            })
        navigate('/')
    }

    return <section className="app-header full">
        <div className="logo">
            <Link to="/"><img src={imgUrl} alt="" /></Link>

        </div>
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/toy">Toys</NavLink>
            <NavLink to="/data">Chart</NavLink>
            {user && <NavLink to="user/details">Profile</NavLink>}
            {!user && <Link className="login-btn" to="user/login">Login</Link>}
          
           {user && <button onClick={onLogout}>Logout</button>}
        </nav>
    </section>
}