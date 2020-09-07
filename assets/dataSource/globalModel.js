import io from 'socket.io-client';

class GLOBE {
    constructor () {
        this.GLOBE_SEND_MESSAGE = null;
        this.GLOBE_RECEIVE_MESSAGE = null;
    }
    static GLOBE_SOCKET;

    SET_SOCKET_IO = () => {
        const connectionConfig = {
            jsonp: false,
            reconnection: true,
            reconnectionDelay: 100,
            reconnectionAttempts: 5000,
            transports: ['websocket']/// you need to explicitly tell it to use websockets
        };
        var socket = io('http://192.168.0.40:8888', connectionConfig);
        this.GLOBE_SOCKET = socket;
    }

    GET_SOCKET_IO = () => {
        return this.GLOBE_SOCKET;
    }

    SEND_SOCKET_MESSAGE = (form) => {
        this.GLOBE_SEND_MESSAGE = form;
        this.GLOBE_SOCKET.emit('sendMessage', form);
    }

    RECEIVE_SOCKET_MESSAGE = () => {
        this.GLOBE_SOCKET.on('receiveMessage', (message) => {
            this.GLOBE_RECEIVE_MESSAGE = message;
            return this.GLOBE_RECEIVE_MESSAGE;
        });
        
    }
}

export default new GLOBE();