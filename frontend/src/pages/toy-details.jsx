import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toyService } from "../services/toy.service"
import { utilService } from "../services/util.service"
import imgUrl from '../assets/img/default1.png';
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";


export function ToyDetails() {

    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    const navigate = useNavigate()
    const [msg, setMsg] = useState(toyService.getEmptyMsg())


    useEffect(() => {
        loadToy()
    }, [toyId])

    async function loadToy() {
        try {
            const toy = await toyService.getById(toyId)
            setToy(toy)
        } catch (err) {
            console.log('Had issues in toy details', err)
            navigate('/toy')
        }

    }

    function handleChange({ target }) {
        let { value, name: field, } = target
        setMsg((prevMsg) => ({ ...prevMsg, [field]: value }))
    }

    async function onSaveMsg(ev) {
        ev.preventDefault()
        try {
            const savedMsg = await toyService.addToyMsg(toyId, msg)
            setToy((prevToy) => ({ ...prevToy, msgs: [...prevToy.msgs, savedMsg] }))
            showSuccessMsg('Msg saved!')

        } catch (err) {
            console.log('err', err)
            showErrorMsg('Cannot save Msg')
        }
    }

    async function onRemoveMsg(msgId) {
        try {
            await toyService.removeToyMsg(toyId, msgId)
            // const msgs = toy.msgs.filter(msg => msg.Id !== msgId)
            // setToy((prevToy) => ({ ...prevToy, msgs }))
            loadToy()
            showSuccessMsg('Msg Removed!')

        } catch (error) {
            showErrorMsg('Cannot remove Msg')
        }

    }

    // function loadToyOLD() {
    //     toyService.getById(toyId)
    //         .then((toy) => setToy(toy))
    //         .catch((err) => {
    //             console.log('Had issues in toy details', err)
    //             navigate('/toy')
    //         })

    // }

    function onGoBack() {
        navigate('/toy')
    }

    console.log('toy', toy);

    if (!toy) return <h1>loading...</h1>
    return <section className="toy-details">

        <div className="image-container">
            <img src={imgUrl} alt="" />
        </div>
        <h1>{toy.name}</h1>
        <h4>Price: ${toy.price}</h4>
        <p>{utilService.formatTime(toy.createdAt)}</p>
        <p>labels: {toy.labels.map(label => {
            return label + ' '
        })}</p>
        <p>{toy.inStock ? 'in stock' : 'out of stock'}</p>
        <button className="return btn btn-dark" onClick={onGoBack}>return</button>
        <div className="comments-container">

        <form onSubmit={onSaveMsg} >
            <label htmlFor="addMsg">AddMsg</label>
            <input id="addMsg"
                type="text"
                name="txt"
                value={msg.txt}
                // 2way data binding .... draft wont be saved
                onChange={handleChange}
            />
            <button>Add Msg</button>
        </form>

            <h2>Comments: </h2>
            {(!toy.msgs) ? 'no comments' :
            <div className="comments-section">
                {/* {toy.msgs?.map(msg => {
                    return 
                    
                })} */}
                {toy.msgs?.map(msg => {
                  return <div className="comments" key={msg.id}>
                     <p key={msg.by.fullname} className="msg-fullname">by {msg.by.fullname}</p>
                     <p key={msg.txt}> {msg.txt}</p>
                    <button key={msg.id} onClick={() => onRemoveMsg(msg.id)}>X</button>
                    </div>
                })}
            </div>
            }
        </div>
    </section>
}