import { createContext, useContext, useState } from 'react';

const InventoryContext = createContext(null);

export const InventoryProvider = ({ children }) => {
  const [inventory, setInventory] = useState(null);

  return (
    <InventoryContext.Provider value={{ inventory, setInventory }}>
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => useContext(InventoryContext);
