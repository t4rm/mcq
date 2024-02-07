export function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

export function sameMembers(arr1, arr2) {
    const set1 = new Set(arr1);
    const set2 = new Set(arr2);
    return arr1.every(item => set2.has(item)) &&
        arr2.every(item => set1.has(item))
}

function checkIfEmpty(array) {
    return Array.isArray(array) && (array.length === 0 || array.every(checkIfEmpty));
}

export function formatErrors(errors, data) {
    const arrErrors = Object.keys(errors);
    const arrErrorsExtra = Object.values(errors).flatMap(error => error.extra);

    let str = "<p>Aucune erreur</p>";
    if (checkIfEmpty(arrErrors)) return str;
    
    str = "<span class  ='text-red-900'><b>Erreur(s) :</b></span>";
    str += "<ul class = 'list-disc'>";

    for (const question of arrErrors) {
        if(typeof question === Array) return;
        str += `<li>Pour ${data["propositions"][question - 1]["name"]} :<br/> Il manque :<ul class='pl-5'>`;
        str += `${errors[question].map((id) => { return "<li>" + data["answers"][id - 1]['value'] + "</li>" })}`;
        str += "</ul>";
    }

    if (arrErrorsExtra.length > 0) {
        str += `<br/> Il y a des réponses en trop :<ul class = 'pl-5'>`;
        str += `${arrErrorsExtra.map((id) => { return "<li>" + data["answers"][id - 1]['value'] + "</li>" })}`;
        str += "</ul>";
    }

    str += "</ul>";

    return str;
}