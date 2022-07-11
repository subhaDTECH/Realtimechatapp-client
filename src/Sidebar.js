import React,{useState,useEffect} from 'react'
import "./Sidebar.css";
import Avatar from '@material-ui/core/Avatar';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import CommentIcon from '@material-ui/icons/Comment';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import SidebarOption from "./SidebarOption";
import { useSelector } from 'react-redux';
import {selectUser} from "./features/userSlice";
import {auth} from './firebase';
import AddIcon from '@material-ui/icons/Add';
import axios from './axios';
import Pusher from 'pusher-js'
const pusher = new Pusher('94e467a4140db68818da', {
    cluster: 'ap2'
  });

const Sidebar = () => {
    const [chatlist,setChatlist]=useState([]);
    const user=useSelector(selectUser)

    //get chatlist from databse
    const getChatList=async()=>{
          const res=await axios.get('/get/chatlist')
          setChatlist(res.data)
          console.log(res.data)
          console.log(chatlist)
    }
    useEffect(()=>{
        getChatList()
        const channel = pusher.subscribe('chatname');
        channel.bind('newChatname', function(data) {
        getChatList()
     
    });

    },[])
    
    const addchat=async()=>{
       const chatname= prompt("Enetr room name :")
       //add chatname and id to data base
       const res=await axios.post('/new/chat',{
           chatname:chatname
       });
       console.log(res)
       //make addchat real time 
    //    getChatList()
       //end

    }
    return (
        <div className="sidebar bg_clr">
              <div className="sidebar__header">
                 <Avatar onClick={()=>auth.signOut()} src={user.photo}  className="avatarImg"/>
                  <div className="sidebar__icon">
                  <IconButton>
                  <DonutLargeIcon/>
                  </IconButton>
                  <IconButton>
                  <CommentIcon/>
                  </IconButton>
                  <IconButton>
                  <MoreVertIcon/>
                  </IconButton>
                       
                       
                       
                  </div>

              </div>
              <div className="header__add__section">
              <div className="Addchat">
                    <h3>Add Chat</h3>
                    <AddIcon onClick={addchat} />
              </div>
              <div className="header__search">
                  <SearchIcon/>
                  <input type="text" placeholder="search a chat" />
              </div>
              </div>
              <div className="header___chat__box">
              {
                  chatlist.map((chat)=>{
                      return (
                        <SidebarOption id={chat.id} key={chat.id} chatname={chat.name} />
                      )
                  })
              }
                 
                
              </div>
             
        </div>
    )
}

export default Sidebar
