import { currentUser } from "./app"
import { app } from "./app"
import { chars } from "./app"

export class Main {

    data: Array<any> = []

    sortingBy() {

        currentUser.sortingByDate()

        currentUser.sortingByDate()

        currentUser.sortingByAnswersQuantity()

    }

    start() {

        if (localStorage.getItem("data") != null) {

            app.data = JSON.parse(localStorage.getItem('data')!)

            app.data.forEach(function(item: { text: string }) {

                document.querySelector('.comment-list')!.innerHTML += item.text

            })

            let answerList = document.querySelectorAll('.reply-block')

            answerList.forEach(function(item) {

                let commentIndex = item.closest('.comment-block')!.getAttribute('data-index')

                app.data[Number(commentIndex)].answers.forEach(function(reply: any) {

                    item.innerHTML += reply.text

                })
                
            })


            let rates = document.querySelectorAll('.post-options__num') as NodeListOf<HTMLInputElement>

            rates.forEach(function(item) {

                if (item.hasAttribute('data-num-comment')) {

                    let commentIndex = Number(item.closest('.comment-block')!.getAttribute('data-index'))

                    item.value = app.data[commentIndex].rate

                    if (Number(item.value) < 0) {

                        item.classList.add('red-text')

                    }

                    if (app.data[commentIndex].rated.find((item: { id: number }) => item.id === currentUser.id)) {

                        item.closest('.post-options-counter')!.querySelector('.btn-counter--plus')!.setAttribute('disabled', '')

                        item.closest('.post-options-counter')!.querySelector('.btn-counter--minus')!.setAttribute('disabled', '')

                    }

                }

                if (item.hasAttribute('data-num-answer')) {
    
                    let commentIndex = Number(item.closest('.reply-block__item')!.getAttribute('data-comment-index'))

                    let answerIndex = Number(item.closest('.reply-block__item')!.getAttribute('data-answer-index'))
    
                    item.value = app.data[commentIndex].answers[answerIndex].rate
    
                    if (Number(item.value) < 0) {

                        item.classList.add('red-text')

                    }

                    if (app.data[commentIndex].answers[answerIndex].rated.find((item: { id: number }) => item.id === currentUser.id)) {

                        item.closest('.post-options-counter')!.querySelector('.btn-counter--plus')!.setAttribute('disabled', '')

                        item.closest('.post-options-counter')!.querySelector('.btn-counter--minus')!.setAttribute('disabled', '')

                    }
    
                }

            })

            let btnsFavoritecomment = document.querySelectorAll('.post-options-favorite-comment')

            btnsFavoritecomment.forEach(item => {

                let commentIndex = Number(item.closest('.comment-block')!.getAttribute('data-index'))

                if (app.data[commentIndex].favorite.find((item: { id: number }) => item.id === currentUser.id)) {

                    item.closest('.comment-block-area')!.setAttribute('data-favorite', '')

                    item.closest('.post-options-favorite-comment')!.querySelector('img')!.setAttribute('src', './src/images/icons/in_favorite.svg')

                    item.closest('.post-options-favorite-comment')!.querySelector('.btn-favorite')!.textContent = 'В избранном'

                }

            })

            let btnsFavoriteAnswer = document.querySelectorAll('.post-options-favorite-answer')

            btnsFavoriteAnswer.forEach(item => {

                let commentIndex = Number(item.closest('.reply-block__item')!.getAttribute('data-comment-index'))

                let answerIndex = Number(item.closest('.reply-block__item')!.getAttribute('data-answer-index'))

                if (app.data[commentIndex].answers[answerIndex].favorite.find((item: { id: number }) => item.id === currentUser.id)) {

                    item.closest('.reply-block__item')!.setAttribute('data-favorite', '')

                    item.closest('.post-options-favorite-answer')!.querySelector('img')!.setAttribute('src', './src/images/icons/in_favorite.svg')

                    item.closest('.post-options-favorite-answer')!.querySelector('.btn-favorite')!.textContent = 'В избранном'
                    
                } 

            })
            
            currentUser.replyMsg()

            currentUser.ratecomment()

            currentUser.rateAnswer()

            currentUser.addToFavoritecomment()

            currentUser.addToFavoriteAnswer()

            currentUser.showFavorite()

            this.sortingBy()

        }

        chars.charsCounter()

        currentUser.addUserData()

        currentUser.sendMsg()

        currentUser.sortingOptions()

    }

}