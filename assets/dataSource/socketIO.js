import io from 'socket.io-client';
//Initialize Socket IO :
const connectionConfig = {
    jsonp: false,
    reconnection: true,
    reconnectionDelay: 100,
    reconnectionAttempts: 5000,
    transports: ['websocket']/// you need to explicitly tell it to use websockets
};
const socket = io('http://192.168.0.40:8888/api', connectionConfig);
class SOCKETIO {
    startSocket = () => {
        console.log('11')
        socket.on('connect', () => {
            console.log('Connected!')
        })
    }

    sendMessage = (message) => {
        console.log('Message : ', message)
        socket.emit('sendMessage', message)
    }
}

export default new SOCKETIO();