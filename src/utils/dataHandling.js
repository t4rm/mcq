export function getAnswerById(data, id) {
    return data["answers"].find(question => question.id === id);
}

export function getPropositionById(data, id) {
    return data["propositions"].find(proposition => proposition.id === id);
}