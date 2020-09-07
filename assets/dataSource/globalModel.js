import io from 'socket.io-client';

class GLOBE {
    constructor () {
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
}

export default new GLOBE();