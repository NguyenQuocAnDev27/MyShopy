import React, {createContext, useContext} from 'react';
import useStore from './store';

const StoreContext = createContext(null);

export const StoreProvider = ({children}) => {
  const store = useStore();
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export const useStoreContext = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStoreContext must be used within a StoreProvider');
  }
  return context;
};
