import { createContext } from 'react';
import socketio from "socket.io-client";

const MainContext = createContext();

const MainContextProvider = ({ children }) => {
  
  // let socket = socketio.connect('//localhost:8000');
  const socket = socketio;

  return (
    <MainContext.Provider value={ socket }>
      { children }
    </MainContext.Provider>
  )
}

export default MainContext;

export { MainContextProvider };