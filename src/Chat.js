import React,{useState,useEffect} from 'react'
import Avatar from '@material-ui/core/Avatar';
import SearchIcon from '@material-ui/icons/Search';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import "./Chat.css";
import Message from "./Message";
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MicNoneIcon from '@material-ui/icons/MicNone';
import { useSelector,useDispatch } from 'react-redux';
import {selectchat,selectid} from "./features/chatSlice";
import { selectUser } from './features/userSlice';
import axios from "./axios";
import Pusher from 'pusher-js';
import FlipMove from 'react-flip-move';


const pusher = new Pusher('94e467a4140db68818da', {
    cluster: 'ap2'
  });
const Chat = () => {
    const [messages,setMessages]=useState([]);
    const [input,setInput]=useState("")
    const chatid=useSelector(selectid)
    const chatname=useSelector(selectchat)
    const user=useSelector(selectUser)
    console.log("chatid--->",chatid)

//get all message from database
    const getMessages=async(chatid)=>{
        
        
           const res=await axios.get(`get/messages?id=${chatid}`);
           console.log(res.data)
           console.log(`${chatid} --message-->`,res.data[0].conversation)
           setMessages(res.data[0].conversation)
           

        
   }





    //post message to database 
    const postMessage=async(e)=>{
        e.preventDefault();
       
            const res=await axios.post(`/new/message?id=${chatid}`,{
                message:input,
                timestamp:Date.now(),
                user:user,
            })

        
        setInput("");
        // //make chat real time 
        // getMessages(chatid);
       


    }



//    useEffect(()=>{
//        console.log("chatid inside useefect",chatid);
       
//     getMessages(chatid);
//    },[chatid])
    useEffect(()=>{

        if(chatid){
            getMessages(chatid);
            pusher.unsubscribe('message')
            const channel = pusher.subscribe('addmessage');
            channel.bind('newMessage', function(data) {
              
                getMessages(chatid);
                console.log("chat",chatid)
            });


            return ()=>{
                channel.unbind_all();
                channel.unsubscribe();
            }
        }
       

    },[chatid])
    return (
        <div className="chat">
            <div className="chat__header">
                <div className="caht__header__left">
                    <Avatar src={user.photo}/>
                     <h4>{chatname}</h4>
                     <p>{chatid}</p>
                    
                </div>
                <div className="chat__header__right">
                     <SearchIcon/>
                     <MoreVertIcon/>
                </div>
            </div>
            <div className="caht__body">
            <FlipMove>
             
              {
                        messages.map((message,i)=>{
                            return (
                                <Message 
                                key={i}
                                 message={message.message}
                                 timestamp={message.timestamp}
                                userData={message.user}/>
                            )
                        })
                    }

             
                    </FlipMove>   
                  
               <div className="height_div"></div>   
            </div>
            <div className="chat__footrer"> 
                 <div className="footer__icon">
                      <EmojiEmotionsIcon/>
                      <AttachFileIcon/>
                 </div>
                 <form action="">
                       <input 
                        value={input}
                        onChange={(e)=>setInput(e.target.value)}
                       type="text" placeholder="type a message " />
                       <button onClick={postMessage} type="submit"></button>
                 </form>
                 <MicNoneIcon/>
                
            </div>
        </div>
    )
}

export default Chat
