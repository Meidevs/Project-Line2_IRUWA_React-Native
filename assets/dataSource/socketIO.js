import io from 'socket.io-client';
//Initialize Socket IO :
const connectionConfig = {
    jsonp: false,
    reconnection: true,
    reconnectionDelay: 100,
    reconnectionAttempts: 5000,
    transports: ['websocket']/// you need to explicitly tell it to use websockets
};
const socket = io('http://192.168.0.40:8888', connectionConfig);
class SOCKETIO {
    sendMessage = async (message) => {
        return new Promise(
            async (resolve, reject) => {
                try {
                    await socket.emit('sendMessage', message);
                    resolve(true);
                } catch (err) {
                    reject(err);
                }
            }
        )
    }

    receiveMessage = async () => {
        return new Promise(
            async (resolve, reject) => {
                try {
                    var resReturn = await socket.on('receiveMessage', message => {
                        console.log('a', message)
                        return message;
                    });
                    console.log(resReturn)
                    resolve(resReturn);
                } catch (err) {
                    reject(err);
                }
            }
        )
    }
}

export default new SOCKETIO();