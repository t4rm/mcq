import React, {useEffect, useState} from 'react';
import { useDataContext } from '../context/DataContext';
import { shuffleArray } from "../utils/functions";
const Table = () => {
    const { data } = useDataContext();
    const [isFormCleared, setIsFormCleared] = useState(false);

    // Generate headers and rows from our data :
    const headers = data['answers'].map((answer) => [answer['id'], answer['value']]);
    const rows = data['propositions'].map((proposition) => [proposition['id'], proposition['name']]);

    // Shuffle them when form is cleared :
    useEffect(() => {
        if (isFormCleared) {
            shuffleArray(headers);
            shuffleArray(rows);
            setIsFormCleared(false); // Reset the state after shuffling
        }
    }, [isFormCleared]);

    // Function to clear the form and trigger shuffling
    const clearForm = () => {
        // Change the state of isFormCleared to true to trigger shuffling
        setIsFormCleared(true);
    };

    return (
        <div className='max-vw-full 2xl:max-w-screen-xl'>
            <div className='overflow-x-auto mx-5 '>
                <table className='table-auto border-collapse border border-slate-500 bg-violet-200'>
                    <thead>
                        <tr className='bg-violet-300'>
                            <th></th>
                            {headers.map((header, index) => (
                                <th className='border border-slate-600' key={index}>{header[1]}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row) => (
                            <tr key={row} className='border border-slate-600 hover:bg-gray-100'>
                                <th className='sticky left-0 bg-violet-300 border border-slate-600 md:whitespace-nowrap'>{row[1]}</th>
                                {headers.map((header, index) => (
                                    <td className='border border-slate-700 text-center' key={index}>
                                        <input type='checkbox' value={header[0]} name={row[0]} />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <br />
            <div className='flex flex-row-reverse w-full px-5 mb-10'>
                <button type="submit" className="text-white bg-violet-700 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-800">Submit</button>
                <button type="reset" onClick={clearForm} className="mx-2 text-white bg-violet-400 hover:bg-violet-500 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-violet-700 dark:hover:bg-violet-800 dark:focus:ring-violet-400">Clear</button>
            </div>
        </div>
    );
};

export default Table;