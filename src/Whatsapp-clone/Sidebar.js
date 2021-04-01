import { Avatar, IconButton } from '@material-ui/core'
import React , {useState , useEffect} from 'react'

import './Sidebar.css'
// Icons
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { SearchOutlined } from '@material-ui/icons';

import SidebarChats from './SidebarChats'
import { db } from '../firebase';
import { useStateValue } from '../StateProvider';



function Sidebar() {

    // useState

    const [rooms, setrooms] = useState([]);
    const [{user} , dispatch] = useStateValue();

    useEffect(() => {
       const unsubscribe =  db.collection('rooms').onSnapshot(snapshot => (
            setrooms(snapshot.docs.map(doc => 
                (
                    {
                        id : doc.id,
                        data : doc.data(),
                    }
                )))
        ));
        return () => {
            unsubscribe();
        }
    }, [])
    return (
        <div className = 'sidebar'>
            {/* sidebar__header */}

            <div className="sidebar__header">
                <Avatar src = {user ?.photoURL}></Avatar>
                <div className="sidebar__headerRight">
                    <IconButton>
                    <DonutLargeIcon fontSize = 'inherit'></DonutLargeIcon>
                    </IconButton>
                    <IconButton>
                    <ChatIcon fontSize = 'inherit'> </ChatIcon>

                    </IconButton>
                    <IconButton>
                    <MoreVertIcon fontSize = 'inherit' ></MoreVertIcon>

                    </IconButton>
                </div>
            </div>

            {/* sidebar__search */}

            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlined>
                    </SearchOutlined>
                    <input type = 'text' placeholder = 'Search or Start a New Chat'></input>
                </div>
            </div>
            {/* sidebar__chats */}

            <div className="sidebar__chats">
                <SidebarChats addNewChat ></SidebarChats>
                {rooms.map(room => (
                    <SidebarChats key = {room.id} id = {room.id} name = {room.data.name}></SidebarChats>
                ))}
            </div>
        </div>
    )
}

export default Sidebar
