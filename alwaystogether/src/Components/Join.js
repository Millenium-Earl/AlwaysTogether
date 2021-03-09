import React, {useState} from 'react'
import {Link} from 'react-router-dom'



const Join = () => {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const handleName = (event) => {
        setName(event.target.value);
    }
    const handleRoom = (event) => {
        setRoom(event.target.value);
    }

    return(
        <div className="joinConainterExt">
            <div className="joinContainerInt">
                <h1 className="head"> Join here </h1>
                <div><input placeholder="Name" className="joinInput" type='text' onChange={handleName}></input> </div>
                <div><input placeholder="Room" className="joinInput mt-20" type='text' onChange={handleRoom}></input> </div>

                    <Link onClick={(event)=> (!name || !room) ? event.preventDefault() : null } to={`/chat?name=${name}&room=${room}`}>
                    <button className="button mt-20" type='submit'> Entrez </button>
                    </Link>


            </div>

        </div>)

}
export default Join;