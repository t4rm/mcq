import React from 'react';
import { useDataContext } from '../context/DataContext';
import { sameMembers } from "../utils/functions";
import { Error } from '../metier/Error';

const Form = ({ children, onErrorsChange, onScoreChange }) => {
    const { data } = useDataContext();

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        // Group answers by id
        const answersById = {};
        const errors = [];

        for (let [id, answer] of formData) {
            if (!answersById[id]) {
                answersById[id] = [];
            }
            answersById[id].push(parseInt(answer));
        }

        // Calculate score
        let score = 0;
        for (let proposition of data['propositions']) {
            let id = proposition['id'];
            const answers = proposition['answers'];
            const selectedAnswers = answersById[id];

            if (selectedAnswers && selectedAnswers.length > 0) {
                if (sameMembers(answers, selectedAnswers)) {
                    score += 1
                } else {
                    // Errors concerning the missing answers
                    let mainErrors = (answers.filter((element) => !selectedAnswers.includes(element))) // One error or more ? No points & pushed to array.
                    // Errors concerning the extra answers
                    let extraErrors = (selectedAnswers.filter((element) => !answers.includes(element))) // One error or more ? No points & pushed to array.
                    
                    errors.push(new Error(id, mainErrors, extraErrors));
                }
            }
        }

        onErrorsChange(errors); // Passing errors back to parent component
        onScoreChange(score); // Passing score back to parent component
    }

    return (
        <form onSubmit={handleSubmit}>
            {children}
        </form>
    );
};

export default Form;
