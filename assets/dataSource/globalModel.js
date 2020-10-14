import { Platform } from 'react-native';
import io from 'socket.io-client';

class GLOBE {
    constructor() {
        this.GLOBE_RECEIVE_MESSAGE
        this.GLOBE_SEND_MESSAGE;
        this.GET_MESSAGE_LOGS;
    }
    static GLOBE_SOCKET;

    SET_SOCKET_IO = () => {
        const connectionConfig = {
            jsonp: false,
            reconnection: true,
            reconnectionDelay: 100,
            reconnectionAttempts: 5000,
            transports: ['polling', 'websocket']/// you need to explicitly tell it to use websockets
        };
        var socket = io('https://148.72.210.153:8888', connectionConfig);
        this.GLOBE_SOCKET = socket;
    }

    CONNECT_TO_SOCKET_IO = (data) => {
        this.GLOBE_SOCKET.emit('connection', { userID: data });
    }

    GET_SOCKET_IO = () => {
        return this.GLOBE_SOCKET;
    }

    DISCONNECT = () => {
        this.GLOBE_SOCKET.emit('disconnect')
    }
}

export default new GLOBE();