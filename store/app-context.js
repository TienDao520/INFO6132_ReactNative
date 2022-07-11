import React from 'react';

const AppContext = React.createContext({
  remainingPrice: 0,
});

export const AppContextProvider = props => {
  return (
    <AppContext.Provider
      value={{
        remainingPrice: 0,
      }}>
      {props.children}
    </AppContext.Provider>
  );
};

const useAppContext = () => React.useContext(AppContext);
export default useAppContext;
