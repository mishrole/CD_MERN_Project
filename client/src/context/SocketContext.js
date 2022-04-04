import { createContext, useState } from 'react';

const MainContext = createContext();

const MainContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  
  return (
    <MainContext.Provider value={ [socket, setSocket] }>
      { children }
    </MainContext.Provider>
  )
}

export default MainContext;

export { MainContextProvider };