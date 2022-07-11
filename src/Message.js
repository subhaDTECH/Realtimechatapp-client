import React,{forwardRef}from 'react'
import "./Message.css";
import * as timeago from 'timeago.js';
import {useSelector} from 'react-redux';
import {selectUser} from "./features/userSlice";

import FlipMove from 'react-flip-move';

const Message = forwardRef(({message,timestamp,userData},ref) => {
      const user=useSelector(selectUser);
      
    return (
        <div ref={ref}  className={`message ${user.email==userData.email && 'usermessage'}`}>
              <p className="mess">
              <span className="user_name">{userData.displayName}</span>
               {message}
              <span className="timestamp">{timeago.format(timestamp)}</span>
              </p>
              
        </div>
    )});

export default Message
