
import { useSelector } from "react-redux";
import imgUrl from '../assets/img/default-user.png';
// import { Loader } from "./loader.jsx"

export function UserDetails() {

    const user = useSelector((storeState => storeState.userModule.user))

    // if (!user) return <Loader />
    return user && <div className="profile-container">
        <div className="profile-image-container">
            {/* <img src={imgUrl} alt="" /> */}
            {user.imgUrl && <img src={user.imgUrl} />}
        </div>
        <h2>{user.fullname}</h2>

    </div>
}