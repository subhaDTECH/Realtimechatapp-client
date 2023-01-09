import axios from "axios"

const instance=axios.create({
    baseURL:"https://realtime-chat-app-ar38.onrender.com"
})
export default instance;