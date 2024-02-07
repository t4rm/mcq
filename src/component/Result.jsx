import React from 'react';
import { useDataContext } from '../context/DataContext';
import { formatErrors } from "../utils/functions";
const Result = ({ errors, score }) => {
    const { data } = useDataContext();

    return (
        <div className='mt-10 mb-5'>
            {errors && Object.keys(errors).length > 0 ? (
                <div dangerouslySetInnerHTML={{__html: formatErrors(errors, data)}}>
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