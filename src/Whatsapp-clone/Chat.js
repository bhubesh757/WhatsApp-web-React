import { Avatar, IconButton } from '@material-ui/core';
import React , {useEffect , useState} from 'react'

import {useParams} from 'react-router-dom'

// icons

import AttachmentIcon from '@material-ui/icons/Attachment';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { InsertEmoticon, SearchOutlined } from '@material-ui/icons';
import MicIcon from '@material-ui/icons/Mic';
import './Chat.css'
import { db } from '../firebase';
import firebase from '../firebase'
import { useStateValue } from '../StateProvider';
// Flipmove

import FlipMove from 'react-flip-move';
function Chat() {

    const [seed, setseed] = useState('')
    const [input, setinput] = useState('')

    const {roomId} = useParams();
    const [roomName, setroomName] = useState('')

    const [messages, setmessages] = useState([])

    const [{user} , dispatch] = useStateValue();

    useEffect(() => {
        if (roomId) {
            db.collection('rooms').doc(roomId).
            onSnapshot(snapshot => (
                setroomName (snapshot.data().name)
            ))

            db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp' , 'asc')
            .onSnapshot(snapshot => (
                setmessages (snapshot.docs.map(
                    doc => doc.data()
                ))
            ))

             
        }
    }, [roomId])

    useEffect(() => {
        setseed( Math.floor(Math.random() * 5000));
        
     },[roomId])

    //  sending a message
    const sentMessage = (e) => {
        e.preventDefault();

        console.log('boom typed' , input);

        db.collection('rooms').doc(roomId).collection('messages')
        .add({
            message : input ,
            name : user.displayName,
            timestamp : firebase.firestore.FieldValue
            .serverTimestamp(),
        })

        setinput('');
    }

    
    return (
        <div className = 'chat'>
            {/* <h1> Boom i am Chat</h1> */}

            <div className="chat__header">
                <Avatar src = {`https://avatars.dicebear.com/api/bottts/${seed}.svg`} ></Avatar>
                <div className="chat_headerInfo">
                    <h3>{roomName}</h3>
                <p > last seen {''} {new Date (messages[messages.length - 1]?.timestamp?.toDate()) .toUTCString()}  </p>
                </div>
            <div className="chat__headerRight">
                <IconButton>
                    <SearchOutlined></SearchOutlined>
                </IconButton>
                <IconButton>    
                    <AttachmentIcon></AttachmentIcon>
                </IconButton>
                    <IconButton>
                    <MoreVertIcon fontSize = 'inherit' ></MoreVertIcon>
                    </IconButton>
            </div>
            </div>
            {/* headerright */}

            <div className="chat__body">
                <FlipMove>

                {
                    messages.map((message) => (

                <p className={`chat__message ${ message.name === user.displayName && 'chat__receiver'}`}>
                    <span className = 'chat__username'>
                        {message.name}
                    </span>
                    
                    {message.message}

                    <span className = 'chat__timestamp'>
                    {new Date (message.timestamp?.toDate()) .toUTCString()} 
                    </span>

                </p>
                    )) 
                }
                </FlipMove>

            </div>

            <div className="chat__footer">
            <InsertEmoticon></InsertEmoticon>
            <form>
                <input value = {input} onChange = {e => setinput(e.target.value)}  type = 'text' placeholder = 'Type a message' >
                </input>
                <button  onClick = {sentMessage} type = 'submit' className = 'chat_footerbutton'> Sent a Message</button>
            </form>
            <MicIcon></MicIcon>
            </div>
        </div>
    )
}

export default Chat
