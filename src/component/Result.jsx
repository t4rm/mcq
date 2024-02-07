import React from 'react';
import { useDataContext } from '../context/DataContext';
import { formatErrors } from "../utils/functions";
const Result = ({ errors, score }) => {
    const { data } = useDataContext();

    return (
        <div className='px-5 pb-10 max-vw-full 2xl:max-w-screen-xl text-xs sm:text-sm md:text-base'>
            {errors && Object.keys(errors).length > 0 ? (
                <div className='overflow-y-scroll responsive-result' dangerouslySetInnerHTML={{ __html: formatErrors(errors, data) }}>
                </div>
            ) : (
                <p>Results will be displayed here</p>
            )}
            {typeof score !== 'undefined' && (
                <p>Score: {score} / {data['propositions'].length}</p>
            )}
        </div >
    );
};

export default Result;