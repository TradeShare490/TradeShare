import { io } from 'socket.io-client'

const URL = process.env.VUE_APP_SOCKET_URL || 'http://localhost:6969'
const socket = io(URL, {
  withCredentials: true,
  autoConnect: false,
  transports: ['websocket']
})

socket.onAny((event, ...args) => {
  console.log(event, args)
})

export default socket
