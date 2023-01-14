
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { userService } from '../services/user.service.js'
import { signup, login } from '../store/action/user.action.js'


// function getEmptyCredentials() {
//     return {
//         fullname: '',
//         username: 'muki',
//         password: 'muki1',
//     }
// }

export function LoginSignup({ setUser }) {

    const [credentials, setCredentials] = useState(userService.getEmptyCredentials())
    const [isSignupState, setIsSignupState] = useState(false)

    const navigate = useNavigate()

    function handleCredentialsChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials((prevCreds) => ({ ...prevCreds, [field]: value }))
    }

    function onSubmit(ev) {
        ev.preventDefault()
        const funcs = { signup, login }
        const method = isSignupState ? 'signup' : 'login'
        return funcs[method](credentials)
            .then((user) => {
                showSuccessMsg(`Welcome ${user.fullname}`)
                navigate('/')
            })
            .catch(err => {
                showErrorMsg('OOps try again')
            })

    }

    function onToggleSignupState() {
        setIsSignupState(!isSignupState)
    }

    const { username, password, fullname } = credentials
    return <div className="login-page">

        <div className="login-container animate__animated">

            <h1>Login</h1>

            <form className="login-form" onSubmit={onSubmit}>
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    type="text"
                    name="username"
                    value={username}
                    placeholder="Username"
                    onChange={handleCredentialsChange}
                    required
                    autoFocus
                />

                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    name="password"
                    value={password}
                    placeholder="Password"
                    onChange={handleCredentialsChange}
                    required
                />

                {isSignupState && <label htmlFor="fullname">Fullname</label> }
                {isSignupState && <input
                id="fullname"
                    type="text"
                    name="fullname"
                    value={fullname}
                    placeholder="Full name"
                    onChange={handleCredentialsChange}
                    required
                />}

                <button className='btn btn-dark'>{isSignupState ? 'Signup' : 'Login'}</button>
            </form>

            <div className="btns">
                <Link to="/user/login" onClick={onToggleSignupState}>
                    {isSignupState ? 'Already a member? Login' : 'New user? Signup here'}
                </Link >
            </div>
        </div>
    </div >

}
