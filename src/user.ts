import Comment from "./types/coment"
import Answers from "./types/answers"
import Rated from "./types/rated"
import Favorite from "./types/favorite"

import { currentUser } from "./app"
import { app } from "./app"

export class User {

    id: number
    name: string
    avatar: string

    constructor(id: number, name: string, avatar: string) {

        this.id = id

        this.name = name

        this.avatar = avatar

    }

    addUserData() {

        let user = <HTMLElement>document.querySelector(".header-area__author")
        
        user.innerHTML = currentUser.name

        let avatar = <HTMLElement>document.querySelector(".write-block-area__avatar")
        
        avatar.setAttribute("src", currentUser.avatar)

    }

    sendMsg() {

        let inputArea = <HTMLInputElement>document.querySelector(".send-area__input")

        let commentIndex: number = 0
        
        let commentNum = <HTMLElement>document.querySelector(".comment-num")

        if (localStorage.getItem('commentIndex') != null) {

            commentIndex = Number(`${localStorage.getItem("commentIndex")}`)

            commentNum.innerHTML = `(${commentIndex})`
            
        } else {

            commentNum.innerHTML = `(${commentIndex})`

        }

        let btnSend = <HTMLButtonElement>document.querySelector(".send-area__btn")

        btnSend.addEventListener('click',  () => {

            let postDate = new Date().toLocaleDateString()

            let postTime = new Date().toLocaleTimeString().slice(0,-3)

            if (!inputArea.hasAttribute('data-comment-index')) {

                let commentTemplate: Comment = {

                    rate: 0,

                    rated: [],
    
                    answers: [],
    
                    favorite: [],
    
                    date: postDate,
    
                    time: postTime,
                    
                    text: ""
                        
                }

                let commentList = <HTMLElement>document.querySelector(".comment-list")

                app.data.push(commentTemplate)

                app.data[commentIndex].text = 

                `<div class="comment-block" data-index="${commentIndex}">

                    <div class="comment-block__write">

                        <div class="comment-block-area" data-type-comment>

                        <img class="comment-block__avatar" src="${currentUser.avatar}" alt="avatar">

                            <div class="comment-block__body">

                                <div class="header-post">

                                    <span class="header-post__author">${currentUser.name}</span>

                                    <span class="header-post__posted">${postDate} ${postTime}</span>

                                </div>

                                <div class="post-area">

                                    <p class="post-area__text">${inputArea.value}</p>
                                    
                                </div>

                                <div class="post-options">

                                    <div class="post-options-reply">

                                        <img сlass="post-options__img" src="./src/images/icons/reply.svg" alt="reply">
                                        <button class="post-options__btn btn-reply">Ответить</button>

                                    </div>

                                    <div class="post-options-favorite-comment">

                                        <img сlass="post-options__img" src="./src/images/icons/add_favorite.svg" alt="add to favorite">
                                        <button class="post-options__btn btn-favorite">В избранное</button>

                                    </div>

                                    <div class="post-options-counter" data-num-comment-block>

                                        <button class="btn-counter btn-counter--minus"></button>
                                        <input type='text' disabled class="post-options__num" data-num-comment>
                                        <button class="btn-counter btn-counter--plus"></button>

                                    </div>

                                </div>
                                
                            </div>
                    
                    </div>

                    <div class="reply-block"></div>

                </div>`

                localStorage.setItem('data', JSON.stringify(app.data))

                commentList.innerHTML += app.data[commentIndex].text

                let rateListcomment = document.querySelectorAll('.post-options__num') as NodeListOf<HTMLInputElement>

                rateListcomment.forEach(item => {

                    if (!item) return

                    if (item.hasAttribute('data-num-comment')) {

                        let commentIndex: number = Number(item.closest('.comment-block')!.getAttribute('data-index'))

                        item.value = app.data[commentIndex].rate

                    }

                })

                let rateListAnswer = document.querySelectorAll('.post-options__num') as NodeListOf<HTMLInputElement>

                rateListAnswer.forEach(item => {

                    if (item.hasAttribute('data-num-answer')) {

                        let commentIndex: number = Number(item.closest('.reply-block__item')!.getAttribute('data-comment-index'))

                        let answerIndex: number = Number(item.closest('.reply-block__item')!.getAttribute('data-answer-index'))

                        item.value = app.data[commentIndex].answers[answerIndex].rate

                    }
                })

                if (localStorage.getItem('commentIndex') != null) {

                    commentIndex = Number(localStorage.getItem("commentIndex"))

                    commentIndex += 1
                    
                } else {

                    commentIndex += 1

                }

                let countercomments =  <HTMLElement>document.querySelector(".comment-num")
                
                countercomments.innerHTML = `(${commentIndex})`

                localStorage.setItem('commentIndex', String(commentIndex))

                inputArea.value = ""

                localStorage.setItem('data', JSON.stringify(app.data))

                this.ratecomment()

                this.rateAnswer()

                this.replyMsg()

            } else {

                let answerTemplate: Answers = {
                
                rate: 0,

                rated: [],

                favorite: [],

                date: postDate,

                time: postTime,

                text: `<div class="reply-block__item" data-comment-index data-type-answer> 
                <img class="comment-block__avatar" src="${currentUser.avatar}" alt="avatar">

                <div class="reply-block__write">

                    <div class="header-post">
                        <div class="reply-to">
                            <span class="header-post__author">${currentUser.name}</span>
                            <img class="post-options__img post-options__img--reply" src="./src/images/icons/reply.svg">
                            <span class="header-post__author header-post__author--reply"></span>
                        </div>
                        <span class="header-post__posted">${postDate} ${postTime}</span>
                    </div>

                    <div class="post-area">
                        <p class="post-area__text post-area__text--reply">${inputArea.value}</p>
                    </div>
                    
                    <div class="post-options">

                        <div class="post-options-favorite-answer">

                            <img сlass="post-options__img" src="./src/images/icons/add_favorite.svg" alt="add to favorite">
                            <button class="post-options__btn btn-favorite">В избранное</button>

                        </div>

                        <div class="post-options-counter" data-num-answer-area>

                            <button class="btn-counter btn-counter--minus"></button>
                                <input type='text' disabled class="post-options__num" data-num-answer>
                            <button class="btn-counter btn-counter--plus"></button>

                        </div>

                    </div>
                    
                </div>
                </div>`
            
                }
                
                let areacommentIndex: number = Number(inputArea.getAttribute('data-comment-index'))

                inputArea.removeAttribute('data-comment-index')

                inputArea.value = ""

                let answerList = <HTMLElement>document.querySelector('.comment-list')!.querySelector('[data-index="'+ areacommentIndex +'"]')!.querySelector('.reply-block')

                answerList.innerHTML += answerTemplate.text

                app.data[areacommentIndex].answers.push(answerTemplate)

                let replyItems = document.querySelector(`[data-index="${areacommentIndex}"]`)!.querySelectorAll('.reply-block__item')

                replyItems.forEach(item => {

                   let dataIndex = item.closest('.comment-block')!.getAttribute('data-index')

                   item.setAttribute("data-comment-index", String(dataIndex))

                    for (let i: number = 0; i < replyItems.length; i++) {

                        replyItems[i].setAttribute('data-answer-index', String(i))

                    }

                })

                this.rateAnswerRemove()

                this.rateAnswer()

                let replyItemsNew = document.querySelectorAll('.reply-block__item')

                replyItemsNew.forEach(item => {

                    let commentIndex = item.getAttribute('data-comment-index')

                    let answerIndex = item.getAttribute('data-answer-index')

                    let originAuthor = <HTMLElement>item.closest('.comment-block')!.querySelector('.header-post__author')

                    let replyAuthor = <HTMLElement>item.querySelector('.header-post__author--reply')!

                    replyAuthor.innerHTML = originAuthor.innerHTML

                    let newText = item.closest('.reply-block__item')!.outerHTML

                    app.data[Number(commentIndex)].answers[Number(answerIndex)].text = newText

                    localStorage.setItem('data', JSON.stringify(app.data))

                })

                let rateList = document.querySelectorAll('.post-options__num') as NodeListOf<HTMLInputElement>

                rateList.forEach(item => {

                    if (item.hasAttribute('data-num-answer')) {

                        let commentIndex = item.closest('.reply-block__item')!.getAttribute('data-comment-index')

                        let answerIndex = item.closest('.reply-block__item')!.getAttribute('data-answer-index')

                        item.value = app.data[Number(commentIndex)].answers[Number(answerIndex)].rate

                    }

                })

                localStorage.setItem('data', JSON.stringify(app.data))

            }

            this.addToFavoritecomment()

            this.addToFavoriteAnswer()

            this.showFavorite()

            this.sortingByDate()

            this.sortingByRate()

            this.sortingByAnswersQuantity()

        })

    }

    replyMsg() {

        let btnsReply = document.querySelectorAll('.post-options-reply')

        btnsReply.forEach(item => {

            item.addEventListener('click', (e) => {

                const target = e.target

                let answercommentIndex = (<HTMLElement>target).parentElement!.parentElement!.parentElement!.parentElement!.parentElement!.parentElement!.getAttribute('data-index')

                let inputArea = document.querySelector(".send-area__input") as HTMLInputElement

                inputArea.setAttribute('data-comment-index', String(answercommentIndex))

                inputArea.focus()

                this.addToFavoritecomment()

                this.addToFavoriteAnswer()
    
            })

        })
    }

    ratecomment() {

        let rateData: Rated = {

            id: currentUser.id,

            isRated: true

        }

        let counterscomment = document.querySelectorAll('[data-num-comment-block]') as NodeListOf<HTMLInputElement>

        counterscomment.forEach(item => {

            item.addEventListener('click', (e: Event) => {

                const target = e.target

                let commentIndex = Number((<HTMLElement>target).closest('.comment-block')!.getAttribute('data-index'))

                app.data[Number(commentIndex)].rate = (<HTMLInputElement>(<HTMLElement>target).closest('.post-options-counter')!.querySelector('.post-options__num')).value
                       
                if ((<HTMLElement>target).closest('.btn-counter--minus')) {
                    
                    --app.data[Number(commentIndex)].rate

                    if (!app.data[commentIndex].rated.find((item: { id: number }) => item.id === currentUser.id)) {

                        app.data[commentIndex].rated.push(rateData)

                    }

                    (<HTMLElement>target).closest('.post-options-counter')!.querySelector('.btn-counter--plus')!.setAttribute('disabled', ''),

                    (<HTMLElement>target).closest('.post-options-counter')!.querySelector('.btn-counter--minus')!.setAttribute('disabled', '')

                    if (app.data[Number(commentIndex)].rate < 0) {

                        (<HTMLButtonElement>target).closest('.post-options-counter')!.querySelector('.post-options__num')!.classList.add("red-text")

                    }

                } 
                       
                if ((<HTMLElement>target).closest('.btn-counter--plus')) {

                    ++app.data[Number(commentIndex)].rate

                    if (!app.data[commentIndex].rated.find((item: { id: number }) => item.id === currentUser.id)) {

                        app.data[commentIndex].rated.push(rateData)

                    }

                    (<HTMLElement>target).closest('.post-options-counter')!.querySelector('.btn-counter--plus')!.setAttribute('disabled', ''),
                    
                    (<HTMLElement>target).closest('.post-options-counter')!.querySelector('.btn-counter--minus')!.setAttribute('disabled', '')

                    if (app.data[Number(commentIndex)].rate >= 0) {

                        (<HTMLButtonElement>target).closest('.post-options-counter')!.querySelector('.post-options__num')!.classList.remove("red-text")

                    }

                }

                (<HTMLInputElement>(<HTMLElement>target).closest('.post-options-counter')!.querySelector('.post-options__num')).value = app.data[Number(commentIndex)].rate

                localStorage.setItem('data', JSON.stringify(app.data))
                   
            })

        })

    }

    handlerRate(e: Event) {

        let rateData: Rated = {

            id: currentUser.id,

            isRated: true

        }

        const target = e.target

        let commentIndex = Number((<HTMLElement>target).closest('.reply-block__item')!.getAttribute('data-comment-index'))

        let answerIndex = Number((<HTMLElement>target).closest('.reply-block__item')!.getAttribute('data-answer-index'))

        app.data[Number(commentIndex)].answers[Number(answerIndex)].rate = (<HTMLInputElement>(<HTMLElement>target).closest('.post-options-counter')!.querySelector('.post-options__num')).value
                
        if ((<HTMLElement>target).closest('.btn-counter--minus')) {

            --app.data[Number(commentIndex)].answers[Number(answerIndex)].rate

            if (!app.data[commentIndex].answers[answerIndex].rated.find((item: { id: number }) => item.id === currentUser.id)) {

                app.data[commentIndex].answers[answerIndex].rated.push(rateData)

            }

            (<HTMLElement>target).closest('.post-options-counter')!.querySelector('.btn-counter--plus')!.setAttribute('disabled', ''),
                
            (<HTMLElement>target).closest('.post-options-counter')!.querySelector('.btn-counter--minus')!.setAttribute('disabled', '')

            if (app.data[Number(commentIndex)].answers[Number(answerIndex)].rate < 0) {

                (<HTMLElement>target).closest('.post-options-counter')!.querySelector('.post-options__num')!.classList.add("red-text")

            }

        }

        if ((<HTMLElement>target).closest('.btn-counter--plus')) {

            ++app.data[Number(commentIndex)].answers[Number(answerIndex)].rate

            if (!app.data[commentIndex].answers[answerIndex].rated.find((item: { id: number }) => item.id === currentUser.id)) {

                app.data[commentIndex].answers[answerIndex].rated.push(rateData)

            }

            (<HTMLElement>target).closest('.post-options-counter')!.querySelector('.btn-counter--plus')!.setAttribute('disabled', ''),
                
            (<HTMLElement>target).closest('.post-options-counter')!.querySelector('.btn-counter--minus')!.setAttribute('disabled', '')

            if (app.data[Number(commentIndex)].answers[Number(answerIndex)].rate >= 0) {

                (<HTMLElement>target).closest('.post-options-counter')!.querySelector('.post-options__num')!.classList.remove("red-text")

            }

        }
    
        (<HTMLInputElement>(<HTMLElement>target).closest('.post-options-counter')!.querySelector('.post-options__num')).value = app.data[Number(commentIndex)].answers[Number(answerIndex)].rate
                    
        localStorage.setItem('data', JSON.stringify(app.data))
    
    }

    rateAnswer() {

        let countersAnswer = document.querySelectorAll('[data-num-answer-area]')

        countersAnswer.forEach(item => {

            item.addEventListener('click', this.handlerRate)

        })

    }

    rateAnswerRemove() {

        let countersAnswer = document.querySelectorAll('[data-num-answer-area]')

        countersAnswer.forEach(item => {

            item.removeEventListener('click', this.handlerRate)

        })
        
    }

    addToFavoritecomment() {

        let favoriteData: Favorite = {

            id: currentUser.id,

            isFavorite: true

        }

        let btnsFavoritecomment = document.querySelectorAll('.post-options-favorite-comment')

        btnsFavoritecomment.forEach(item => {

            item.addEventListener('click', (e: Event) => {

                const target = e.target

                let commentIndex = Number((<HTMLElement>target).closest('.comment-block')!.getAttribute('data-index'))

                let userIndex: number = app.data[commentIndex].favorite.findIndex((item: { id: number }) => item.id === currentUser.id)

                if (!app.data[commentIndex].favorite.find((item: { id: number }) => item.id === currentUser.id)) {

                    app.data[commentIndex].favorite.push(favoriteData),

                    (<HTMLElement>target).closest('.comment-block-area')!.setAttribute('data-favorite', ''),
    
                    (<HTMLElement>target).closest('.post-options-favorite-comment')!.querySelector('img')!.src = './src/images/icons/in_favorite.svg',
    
                    (<HTMLElement>target).closest('.post-options-favorite-comment')!.querySelector('.btn-favorite')!.textContent = 'В избранном'

                    localStorage.setItem('data', JSON.stringify(app.data))

                } else {

                    app.data[commentIndex].favorite.splice(userIndex, 1),

                    (<HTMLElement>target).closest('.comment-block-area')!.removeAttribute('data-favorite'),

                    (<HTMLElement>target).closest('.post-options-favorite-comment')!.querySelector('img')!.src = './src/images/icons/add_favorite.svg',

                    (<HTMLElement>target).closest('.post-options-favorite-comment')!.querySelector('.btn-favorite')!.textContent = 'В избранноe'

                    localStorage.setItem('data', JSON.stringify(app.data))

                }

            })

            localStorage.setItem('data', JSON.stringify(app.data))

        })

    }       
 
    addToFavoriteAnswer() {

        let favoriteData: Favorite = {

            id: currentUser.id,

            isFavorite: true

        }

        let btnsFavoriteAnswer = document.querySelectorAll('.post-options-favorite-answer')

        btnsFavoriteAnswer.forEach(item => {

            item.addEventListener('click', (e: Event) => {

                const target = e.target

                let commentIndex = Number(item.closest('.reply-block__item')!.getAttribute('data-comment-index'))

                let answerIndex = Number(item.closest('.reply-block__item')!.getAttribute('data-answer-index'))

                let userIndex: number = app.data[commentIndex].answers[answerIndex].favorite.findIndex((item: { id: number }) => item.id === currentUser.id)

                if (!app.data[commentIndex].answers[answerIndex].favorite.find((item: { id: number }) => item.id === currentUser.id)) {

                    app.data[commentIndex].answers[answerIndex].favorite.push(favoriteData),

                    (<HTMLElement>target).closest('.reply-block__item')!.setAttribute('data-favorite', ''),
    
                    (<HTMLElement>target).closest('.post-options-favorite-answer')!.querySelector('img')!.src = './src/images/icons/in_favorite.svg',
    
                    (<HTMLElement>target).closest('.post-options-favorite-answer')!.querySelector('.btn-favorite')!.textContent = 'В избранном'

                    localStorage.setItem('data', JSON.stringify(app.data))

                } else {

                    app.data[commentIndex].answers[answerIndex].favorite.splice(userIndex, 1),

                    (<HTMLElement>target).closest('.reply-block__item')!.removeAttribute('data-favorite'),

                    (<HTMLElement>target).closest('.post-options-favorite-answer')!.querySelector('img')!.src = './src/images/icons/add_favorite.svg',

                    (<HTMLElement>target).closest('.post-options-favorite-answer')!.querySelector('.btn-favorite')!.textContent = 'В избранноe'

                    localStorage.setItem('data', JSON.stringify(app.data))

                }

            })

            localStorage.setItem('data', JSON.stringify(app.data))

        })

    }

    showFavorite() {

        let btnFavorite = document.querySelector('.favorite-list')

        let comments = document.querySelectorAll('.comment-block-area')

        let answers = document.querySelectorAll('.reply-block__item')

        let writeBlock = document.querySelector('.write-block')

        let sortingBlock = document.querySelector('.comment-nav-list')

        let isSorting = false

        btnFavorite!.addEventListener("click", () => {

            if (isSorting) {

                writeBlock!.classList.remove('invisible')

                sortingBlock!.classList.remove('invisible')

                comments.forEach(item => {

                    item.classList.remove('invisible')

                })

                answers.forEach(item => {

                    item.classList.remove('invisible')

                    item.classList.remove('in-favorite')

                })

                isSorting = false

            } else {

                isSorting = true

                writeBlock!.classList.add('invisible')

                sortingBlock!.classList.add('invisible')

                comments.forEach(item => {

                    if (!item.hasAttribute('data-favorite')) {

                        item.classList.add('invisible')

                    }

                })

                answers.forEach(item => {

                    if (!item.hasAttribute('data-favorite')) {

                        item.classList.add('invisible')

                    }

                    if (item.hasAttribute('data-favorite')) {

                        item.classList.add('in-favorite')

                    }

                })
            }
            
        })

    } 

    sortingOptions() {

        let navDrop = document.querySelector('.comment-nav-drop')

        let navMenuItem = <HTMLElement>document.querySelector('.drop-default')

        let navArea = document.querySelector('.drop-default ')

        let navArrow = document.querySelector('.nav-arrow') as HTMLImageElement

        navArea!.addEventListener("mouseover", () => {

            navDrop!.classList.add('open-menu')
            
        })

        navDrop!.addEventListener('click', (e: Event) => {

            const target = e.target

            if ((<HTMLElement>target).classList.contains("drop-choose")) {

                navMenuItem.textContent = (<HTMLElement>target).textContent

                navDrop!.classList.remove('open-menu')

                navArrow.src = './src/images/icons/arrow-down.svg'

                navArrow!.setAttribute('title', 'По убыванию')

            }

        })

        document.addEventListener('click', (e: Event) => {

            const target = e.target

            if (!(<HTMLElement>target).classList.contains('drop-choose')) {

                navDrop!.classList.remove('open-menu')

            } 

        })

    }

    sortingByDate() {

        let navArrow = document.querySelector('.nav-arrow') as HTMLImageElement

        let commentList = <HTMLElement>document.querySelector('.comment-list')

        let items = document.querySelectorAll('.comment-block')

        let btnDate = <HTMLElement>document.querySelector('#comment-date')

        
        function defaultSorting() {

            let sorted = [...items].sort(function(a, b) {

                return a.querySelector('.header-post__posted')!.innerHTML > b.querySelector('.header-post__posted')!.innerHTML ? -1 : 1

            })

            commentList.innerHTML = ''
            
            for (let comment of sorted) {

                commentList.appendChild(comment)

            }

            let isSorting = false
        
            navArrow.addEventListener("click", () => {

                if (isSorting) {

                    navArrow.src = './src/images/icons/arrow-down.svg'

                    navArrow.setAttribute('title', 'По убыванию')

                    isSorting = false

                    let sorted = [...items].sort(function(a, b) {
                        return a.querySelector('.header-post__posted')!.innerHTML > b.querySelector('.header-post__posted')!.innerHTML ? -1 : 1

                    })

                    commentList.innerHTML = ''
                    
                    for (let comment of sorted) {

                        commentList.appendChild(comment)

                    }

                } else {

                    isSorting = true

                    navArrow.src = './src/images/icons/arrow-up.svg'

                    navArrow.setAttribute('title', 'По возрастанию')

                    let sorted = [...items].sort(function(a, b) {

                        return a.querySelector('.header-post__posted')!.innerHTML > b.querySelector('.header-post__posted')!.innerHTML ? 1 : -1

                    })

                    commentList.innerHTML = ''
                    
                    for (let comment of sorted) {

                        commentList.appendChild(comment)
                        
                    }

                }

            })

        }

        defaultSorting()
    
        btnDate.addEventListener('click', function() {

            defaultSorting()

        })
    
    }

    sortingByRate() {

        let navArrow = document.querySelector('.nav-arrow') as HTMLImageElement

        let commentList = <HTMLElement>document.querySelector('.comment-list')

        let items = document.querySelectorAll('.comment-block')

        let btnRate = <HTMLElement>document.querySelector('#comment-rate')

        btnRate.addEventListener('click', function() {

            let sorted = [...items].sort(function(a, b) {

                return (<HTMLInputElement>a.querySelector('.post-options__num'))!.value > (<HTMLInputElement>b.querySelector('.post-options__num'))!.value ? -1 : 1 

            })

            commentList.innerHTML = ''
            
            for (let comment of sorted) {

                commentList.appendChild(comment)

            }

        let isSorting = false
    
        navArrow.addEventListener("click", () => {

            if (isSorting) {

                navArrow.src = './src/images/icons/arrow-down.svg'

                navArrow.setAttribute('title', 'По убыванию')

                isSorting = false

                let sorted = [...items].sort(function(a, b) {

                    return (<HTMLInputElement>a.querySelector('.post-options__num'))!.value > (<HTMLInputElement>b.querySelector('.post-options__num'))!.value ? -1 : 1

                })

                commentList.innerHTML = ''
                
                for (let comment of sorted) {

                    commentList.appendChild(comment)

                }

            } else {

                isSorting = true

                navArrow.src = './src/images/icons/arrow-up.svg'

                navArrow.setAttribute('title', 'По возрастанию')

                let sorted = [...items].sort(function(a, b) {

                   return (<HTMLInputElement>a.querySelector('.post-options__num'))!.value > (<HTMLInputElement>b.querySelector('.post-options__num'))!.value ? 1 : -1

                })

                commentList.innerHTML = ''
                
                for (let comment of sorted) {

                    commentList.appendChild(comment)

                }

            }

        })

      })

    }

    sortingByAnswersQuantity() {

        let navArrow = document.querySelector('.nav-arrow') as HTMLImageElement

        let commentList = <HTMLElement>document.querySelector('.comment-list')

        let items = document.querySelectorAll('.comment-block')

        let btnAnswers = <HTMLElement>document.querySelector('#comment-answers')

        btnAnswers.addEventListener('click', function() {

            let sorted = [...items].sort(function(a, b) {

                return a.querySelectorAll('.reply-block__item').length > b.querySelectorAll('.reply-block__item').length ? -1 : 1

            })

            commentList.innerHTML = ''
            
            for (let comment of sorted) {

                commentList.appendChild(comment)

            }

            let isSorting = false
        
            navArrow.addEventListener("click", () => {

                if (isSorting) {

                    navArrow.src = './src/images/icons/arrow-down.svg'

                    navArrow.setAttribute('title', 'По убыванию')

                    isSorting = false

                    let sorted = [...items].sort(function(a, b) {

                        return a.querySelectorAll('.reply-block__item').length > b.querySelectorAll('.reply-block__item').length ? -1 : 1

                    })

                    commentList.innerHTML = ''
                    
                    for (let comment of sorted) {

                        commentList.appendChild(comment)

                    }

                } else {

                    isSorting = true

                    navArrow.src = './src/images/icons/arrow-up.svg'

                    navArrow.setAttribute('title', 'По возрастанию')

                    let sorted = [...items].sort(function(a, b) {

                        return a.querySelectorAll('.reply-block__item').length > b.querySelectorAll('.reply-block__item').length ? 1 : -1

                    })

                    commentList.innerHTML = ''
                    
                    for (let comment of sorted) {

                        commentList.appendChild(comment)

                    }

                }

            })
        })

    }

}