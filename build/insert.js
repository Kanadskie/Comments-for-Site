"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Insert = void 0;
class Insert {
    constructor(maxChars) {
        this.maxChars = maxChars;
    }
    charsCounter() {
        let inputArea = document.querySelector(".send-area__input");
        let btnSend = document.querySelector(".send-area__btn");
        let inputError = document.querySelector(".header-area__error");
        let charsField = document.querySelector(".header-area__maxletters");
        charsField.innerHTML = `Макс. ${this.maxChars} символов`;
        inputArea.addEventListener('input', () => {
            let result = Number(inputArea.value.length);
            charsField.innerHTML = `${result}/1000`;
            if (inputArea.value.length > 0) {
                charsField.classList.remove("red-text");
                inputError.innerHTML = "";
                btnSend.disabled = false;
            }
            if (inputArea.value.length > 1000) {
                inputError.innerHTML = "Слишком длинный пост";
                inputError.classList.add("red-text");
                charsField.classList.add("red-text");
                btnSend.disabled = true;
            }
            if (inputArea.value.length === 0) {
                charsField.innerHTML = `Макс. ${this.maxChars} символов`;
                charsField.classList.remove("red-text");
                inputError.innerHTML = "";
                btnSend.disabled = true;
            }
        });
        btnSend.addEventListener('click', () => {
            charsField.innerHTML = `Макс. ${this.maxChars} символов`;
            btnSend.disabled = true;
        });
    }
}
exports.Insert = Insert;
