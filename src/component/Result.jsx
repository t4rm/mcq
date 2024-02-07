import React from 'react';
import { useDataContext } from '../context/DataContext';

const Result = ({ errors, score }) => {
    const { data } = useDataContext();

    console.log(errors)
    return (
        <div className='my-5'>
            {errors && Object.keys(errors).length > 0 ? (
                <div>
                    <span className='text-red-900'><b>Erreur(s) :</b></span>
                    {Object.keys(errors).map(question => (
                        errors[question].length > 0 && (
                            <p key={question} > Pour <b>{data["propositions"][question - 1]["name"]}</b>, il manque : {errors[question].map((id) => { return data["answers"][id - 1]['value'] }).join(', ')}</p>
                        )
                    ))}
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