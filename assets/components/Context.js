import React, { createContext } from 'react';

const MessageContext = createContext();

const MessageProvider = (props) => {
    const [state, setState] = useState({});
    return (
        <MessageContext.Provider value={state}>
            {props.children}
        </MessageContext.Provider>
    );
}

export { MessageContext, MessageProvider };