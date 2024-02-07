import React, { createContext, useContext } from 'react';
import jsonData from './data.json';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const data = jsonData;

    return (
        <DataContext.Provider value={{ data }}>
            {children}
        </DataContext.Provider>
    );
};

export const useDataContext = () => useContext(DataContext);
export default DataContext;