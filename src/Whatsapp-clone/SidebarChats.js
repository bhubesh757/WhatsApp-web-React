import { Avatar } from '@material-ui/core'
import React , {useEffect , useState} from 'react'
import { db } from '../firebase';

import './SidebarChats.css';

import {Link } from 'react-router-dom'
function SidebarChats({addNewChat , id , name}) {

    const [seed, setseed] = useState('')
    const [messages, setmessages] = useState([])

    useEffect(() => {
        if (id) {
            db.collection('rooms').doc(id).collection('messages').orderBy('timestamp' , 'desc')
            .onSnapshot(snapshot => (
                setmessages (snapshot.docs.map(
                    doc => doc.data()
                ))
            ))

             
        }
    }, [id])

    useEffect(() => {
       setseed( Math.floor(Math.random() * 5000));
       
    },[])
    // onclick 
    // createchat

    const createchat = () => {
            const rootName = prompt('please Enter your Name for New chat');

            if (rootName) {
                    db.collection('rooms').add({
                        name : rootName,
                    })
            }
    }
    return !addNewChat ? (
        <Link to ={`/rooms/${id}`}>

        <div className  = 'sidebarchats'>
            <Avatar src = {`https://avatars.dicebear.com/api/bottts/${seed}.svg`}></Avatar>
            <div className="sidebarchats__info">
                <h2> {name} </h2>
                <p> {messages[0]?.message}</p>
            </div>
        </div>
        </Link>
    ) : (
        <div onClick = {createchat} className="sidebarchats">
            <h2> Add a New Chat</h2>
        </div>
    )
}

export default SidebarChats
