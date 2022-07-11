import React,{useState,useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import "./SidebarChat.css";
import { useSelector,useDispatch } from 'react-redux';
import {selectUser} from "./features/userSlice";
import { selectchat } from './features/chatSlice';
import { setchat } from './features/chatSlice';
import axios from "./axios";
import Pusher from 'pusher-js'
// const pusher = new Pusher('94e467a4140db68818da', {
//     cluster: 'ap2'
//   });

const SidebarOption = ({id,chatname}) => {
    console.log(id,chatname)
    const user=useSelector(selectUser)
    const dispatch=useDispatch();
    const [lastmessage,setLastMessage]=useState("")
     console.log("last>>>",lastmessage)

    // const getMessages=async(id)=>{

    //     if(id){
    //        const res=await axios.get(`/last/message?id=${id}`);
    //        console.log(res.data)
    //        const len=res.data[0]?.conversation?.length
    //        console.log(len)
    //        console.log("conversation --->",res.data[0]?.conversation[29])
    //        setLastMessage(res.data[0]?.conversation[len-1]?.message)
        //    setMessages(res.data[0].conversation)
    //     const messData=res.data[0].conversation;
    //   messData.sort((b,a)=>{
    //         return a.timestamp - b.timestamp;
    //     })
    //     console.log("conversation --->",res.data[0]?.conversation[0])
    //     console.log("messa data-->",messData[0]) 
    //     console.log("messa data-->",messData[0]?.message)  
    //     if(messData[0]?.message!==undefined)
    //     setLastMessage(messData[0]?.message)

        

//         }
//    }
//    useEffect(()=>{
//     getMessages(id);
//    },[lastmessage])
    return (
        <div onClick={()=>dispatch(setchat({
            chatname:chatname,
            chatid:id

        }))} className="sidebar__chat_option">
             <Avatar src={user.photo} className="Chat__avatar"/>
             <div className="sidebar__chat__info">
                  <h3>{chatname}</h3>
                  <p>Last message</p>
             </div>
        </div>
    )
}

export default SidebarOption;
