export class Error {
    constructor(questionId, errors, extra) {
        this.questionId = questionId;
        this.errors = errors;
        this.extra = extra;
    }

    getQuestionId() {
        return this.questionId;
    }

    getErrors() {
        return this.errors;
    }

    getExtra() {
        return this.extra;
    }

    addError(error) {
        this.errors.push(error);
    }

    addExtra(extra) {
        this.extra.push(extra);
    }

    toString() {
        return `Question ${this.questionId} : ${this.errors.length} errors, ${this.extra.length} extra answers`;
    }
}
