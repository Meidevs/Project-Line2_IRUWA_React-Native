import io from 'socket.io-client';
import Directory from '../components/Directory';

class GLOBE {
    constructor() {
        this.GLOBE_RECEIVE_MESSAGE;
        this.GLOBE_SEND_MESSAGE;
        this.GET_MESSAGE_LOGS;
    }

    static GLOBE_SOCKET
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

    CONNECT_TO_SOCKET_IO = (data) => {
        this.GLOBE_SOCKET.emit('connection', { userID: data });
    }

    GET_SOCKET_IO = () => {
        return this.GLOBE_SOCKET;
    }

    SEND_SOCKET_MESSAGE = (form) => {
        this.GLOBE_SOCKET.emit('sendMessage', form);
        this.GLOBE_SOCKET.on('receiveMessage', async (message) => {
            this.GLOBE_RECEIVE_MESSAGE = message;
        });
    }

    RECEIVE_SOCKET_MESSAGE = async () => {
        let promise = new Promise((resolve, reject) => {
            setTimeout(() => resolve(this.GLOBE_RECEIVE_MESSAGE), 100);
        });
        let result = await promise;
        return result;
    }

    FIND_MESSAGE_LOGS = (data) => {
        this.GET_MESSAGE_LOGS = null;
        this.GLOBE_SOCKET.emit('messageLogs', data);
        this.GLOBE_SOCKET.on('getMessageLogs', (message) => {
            this.GET_MESSAGE_LOGS = message;
        })
    }

    RECEIVE_MESSAGE_LOGS = async () => {
        let promise = new Promise((resolve, reject) => {
            setTimeout(() => resolve(this.GET_MESSAGE_LOGS), 100);
        });
        let result = await promise;
        return result;
    }
}

export default new GLOBE();