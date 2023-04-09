export class Insert {

    maxChars: number

    constructor(maxChars: number) {

        this.maxChars = maxChars

    }

    charsCounter() {

        let inputArea = <HTMLElement>document.querySelector(".send-area__input")

        let btnSend = <HTMLButtonElement>document.querySelector(".send-area__btn")

        let inputError = <HTMLElement>document.querySelector(".header-area__error")

        let charsField = <HTMLElement>document.querySelector(".header-area__maxletters")

        charsField.innerHTML = `Макс. ${this.maxChars} символов`

        inputArea!.addEventListener('input', () => {

            let result = Number((<HTMLInputElement>inputArea).value.length);

            charsField.innerHTML = `${result}/1000`

            if ((<HTMLInputElement>inputArea).value.length > 0) {

                charsField.classList.remove("red-text")

                inputError.innerHTML = ""

                btnSend.disabled = false

            }

            if ((<HTMLInputElement>inputArea).value.length > 1000) {

                inputError.innerHTML = "Слишком длинный пост"

                inputError.classList.add("red-text")

                charsField.classList.add("red-text")

                btnSend.disabled = true

            }

            if ((<HTMLInputElement>inputArea).value.length === 0) {

                charsField.innerHTML = `Макс. ${this.maxChars} символов`

                charsField.classList.remove("red-text")

                inputError.innerHTML = ""

                btnSend.disabled = true

            }

        })

        btnSend!.addEventListener('click', () => {

            charsField.innerHTML = `Макс. ${this.maxChars} символов`

            btnSend!.disabled = true

        })

    }

}