import { getAnswerById, getPropositionById } from "./dataHandling";

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

export function formatErrors(errors, data) {
    let str = "<p>Aucune erreur</p>";
    if (errors.length === 0) return str;
    str = `<span class='text-red-900'><b>Erreur(s) :</b></span>`;
    str += "<ul class='list-disc'>";

    // Error handling :
    for (const error of errors) {
        // Store the proposition :
        let proposition = getPropositionById(data, error.getQuestionId())
        if (!proposition) console.log("Error : no proposition found for id " + error.getQuestionId());

        // Store the missing answers :
        let errorMissing = error.getErrors()
        errorMissing = errorMissing.map((id) => { return getAnswerById(data, id) })
        // Store the extra answers :
        let errorExtras = error.getExtra()
        errorExtras = errorExtras.map((id) => { return getAnswerById(data, id) })

        str += `<li>Pour <b>${proposition['name']}</b> :`
        if (errorMissing.length > 0) {
            str += `<br/><span class='pl-5'>Il manque : `;
            str += `${errorMissing.map((err) => { return "<b>" + err.value + "</b>" }).join(", ")}`;
            str += "</span>";
        }
        if (errorExtras.length > 0) {
            str += `<br/><span class='pl-5'>Il y a en trop : `;
            str += `${errorExtras.map((err) => { return "<b>" + err.value + "</b>" }).join(", ")}`;
            str += "</span>";
        }
        str += "</li><br/>";
    }

    str += "</ul>";

    return str;
}