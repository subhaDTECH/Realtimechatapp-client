import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
export const chatSlice = createSlice({
  name: 'chat',
  initialState:{
      chatname:null,
      chatid:null,
  }
  ,
  reducers: {
    setchat: (state,action) => {
        state.chatname=action.payload.chatname;
        state.chatid=action.payload.chatid;
    
    },
   
  
  }});
  
export const { setchat } = chatSlice.actions;


export const selectchat = (state) => state.chat.chatname;
export const selectid = (state) => state.chat.chatid;


export default chatSlice.reducer;