import { createContext } from 'react';
import socketio from "socket.io-client";

const MainContext = createContext();

const MainContextProvider = ({ children }) => {

  const socket = socketio.connect('//localhost:8000');

  return (
    <MainContext.Provider value={ socket }>
      { children }
    </MainContext.Provider>
  )
}

export default MainContext;

export { MainContextProvider };