"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const app_1 = require("./app");
const app_2 = require("./app");
class User {
    constructor(id, name, avatar) {
        this.id = id;
        this.name = name;
        this.avatar = avatar;
    }
    addUserData() {
        let user = document.querySelector(".header-area__author");
        user.innerHTML = app_1.currentUser.name;
        let avatar = document.querySelector(".write-block-area__avatar");
        avatar.setAttribute("src", app_1.currentUser.avatar);
    }
    sendMsg() {
        let inputArea = document.querySelector(".send-area__input");
        let commentIndex = 0;
        let commentNum = document.querySelector(".comment-num");
        if (localStorage.getItem('commentIndex') != null) {
            commentIndex = Number(`${localStorage.getItem("commentIndex")}`);
            commentNum.innerHTML = `(${commentIndex})`;
        }
        else {
            commentNum.innerHTML = `(${commentIndex})`;
        }
        let btnSend = document.querySelector(".send-area__btn");
        btnSend.addEventListener('click', () => {
            let postDate = new Date().toLocaleDateString();
            let postTime = new Date().toLocaleTimeString().slice(0, -3);
            if (!inputArea.hasAttribute('data-comment-index')) {
                let commentTemplate = {
                    rate: 0,
                    rated: [],
                    answers: [],
                    favorite: [],
                    date: postDate,
                    time: postTime,
                    text: ""
                };
                let commentList = document.querySelector(".comment-list");
                app_2.app.data.push(commentTemplate);
                app_2.app.data[commentIndex].text =
                    `<div class="comment-block" data-index="${commentIndex}">

                    <div class="comment-block__write">

                        <div class="comment-block-area" data-type-comment>

                        <img class="comment-block__avatar" src="${app_1.currentUser.avatar}" alt="avatar">

                            <div class="comment-block__body">

                                <div class="header-post">

                                    <span class="header-post__author">${app_1.currentUser.name}</span>

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

                </div>`;
                localStorage.setItem('data', JSON.stringify(app_2.app.data));
                commentList.innerHTML += app_2.app.data[commentIndex].text;
                let rateListcomment = document.querySelectorAll('.post-options__num');
                rateListcomment.forEach(item => {
                    if (!item)
                        return;
                    if (item.hasAttribute('data-num-comment')) {
                        let commentIndex = Number(item.closest('.comment-block').getAttribute('data-index'));
                        item.value = app_2.app.data[commentIndex].rate;
                    }
                });
                let rateListAnswer = document.querySelectorAll('.post-options__num');
                rateListAnswer.forEach(item => {
                    if (item.hasAttribute('data-num-answer')) {
                        let commentIndex = Number(item.closest('.reply-block__item').getAttribute('data-comment-index'));
                        let answerIndex = Number(item.closest('.reply-block__item').getAttribute('data-answer-index'));
                        item.value = app_2.app.data[commentIndex].answers[answerIndex].rate;
                    }
                });
                if (localStorage.getItem('commentIndex') != null) {
                    commentIndex = Number(localStorage.getItem("commentIndex"));
                    commentIndex += 1;
                }
                else {
                    commentIndex += 1;
                }
                let countercomments = document.querySelector(".comment-num");
                countercomments.innerHTML = `(${commentIndex})`;
                localStorage.setItem('commentIndex', String(commentIndex));
                inputArea.value = "";
                localStorage.setItem('data', JSON.stringify(app_2.app.data));
                this.ratecomment();
                this.rateAnswer();
                this.replyMsg();
            }
            else {
                let answerTemplate = {
                    rate: 0,
                    rated: [],
                    favorite: [],
                    date: postDate,
                    time: postTime,
                    text: `<div class="reply-block__item" data-comment-index data-type-answer> 
                <img class="comment-block__avatar" src="${app_1.currentUser.avatar}" alt="avatar">

                <div class="reply-block__write">

                    <div class="header-post">
                        <div class="reply-to">
                            <span class="header-post__author">${app_1.currentUser.name}</span>
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
                };
                let areacommentIndex = Number(inputArea.getAttribute('data-comment-index'));
                inputArea.removeAttribute('data-comment-index');
                inputArea.value = "";
                let answerList = document.querySelector('.comment-list').querySelector('[data-index="' + areacommentIndex + '"]').querySelector('.reply-block');
                answerList.innerHTML += answerTemplate.text;
                app_2.app.data[areacommentIndex].answers.push(answerTemplate);
                let replyItems = document.querySelector(`[data-index="${areacommentIndex}"]`).querySelectorAll('.reply-block__item');
                replyItems.forEach(item => {
                    let dataIndex = item.closest('.comment-block').getAttribute('data-index');
                    item.setAttribute("data-comment-index", String(dataIndex));
                    for (let i = 0; i < replyItems.length; i++) {
                        replyItems[i].setAttribute('data-answer-index', String(i));
                    }
                });
                this.rateAnswerRemove();
                this.rateAnswer();
                let replyItemsNew = document.querySelectorAll('.reply-block__item');
                replyItemsNew.forEach(item => {
                    let commentIndex = item.getAttribute('data-comment-index');
                    let answerIndex = item.getAttribute('data-answer-index');
                    let originAuthor = item.closest('.comment-block').querySelector('.header-post__author');
                    let replyAuthor = item.querySelector('.header-post__author--reply');
                    replyAuthor.innerHTML = originAuthor.innerHTML;
                    let newText = item.closest('.reply-block__item').outerHTML;
                    app_2.app.data[Number(commentIndex)].answers[Number(answerIndex)].text = newText;
                    localStorage.setItem('data', JSON.stringify(app_2.app.data));
                });
                let rateList = document.querySelectorAll('.post-options__num');
                rateList.forEach(item => {
                    if (item.hasAttribute('data-num-answer')) {
                        let commentIndex = item.closest('.reply-block__item').getAttribute('data-comment-index');
                        let answerIndex = item.closest('.reply-block__item').getAttribute('data-answer-index');
                        item.value = app_2.app.data[Number(commentIndex)].answers[Number(answerIndex)].rate;
                    }
                });
                localStorage.setItem('data', JSON.stringify(app_2.app.data));
            }
            this.addToFavoritecomment();
            this.addToFavoriteAnswer();
            this.showFavorite();
            this.sortingByDate();
            this.sortingByRate();
            this.sortingByAnswersQuantity();
        });
    }
    replyMsg() {
        let btnsReply = document.querySelectorAll('.post-options-reply');
        btnsReply.forEach(item => {
            item.addEventListener('click', (e) => {
                const target = e.target;
                let answercommentIndex = target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute('data-index');
                let inputArea = document.querySelector(".send-area__input");
                inputArea.setAttribute('data-comment-index', String(answercommentIndex));
                inputArea.focus();
                this.addToFavoritecomment();
                this.addToFavoriteAnswer();
            });
        });
    }
    ratecomment() {
        let rateData = {
            id: app_1.currentUser.id,
            isRated: true
        };
        let counterscomment = document.querySelectorAll('[data-num-comment-block]');
        counterscomment.forEach(item => {
            item.addEventListener('click', (e) => {
                const target = e.target;
                let commentIndex = Number(target.closest('.comment-block').getAttribute('data-index'));
                app_2.app.data[Number(commentIndex)].rate = target.closest('.post-options-counter').querySelector('.post-options__num').value;
                if (target.closest('.btn-counter--minus')) {
                    --app_2.app.data[Number(commentIndex)].rate;
                    if (!app_2.app.data[commentIndex].rated.find((item) => item.id === app_1.currentUser.id)) {
                        app_2.app.data[commentIndex].rated.push(rateData);
                    }
                    target.closest('.post-options-counter').querySelector('.btn-counter--plus').setAttribute('disabled', ''),
                        target.closest('.post-options-counter').querySelector('.btn-counter--minus').setAttribute('disabled', '');
                    if (app_2.app.data[Number(commentIndex)].rate < 0) {
                        target.closest('.post-options-counter').querySelector('.post-options__num').classList.add("red-text");
                    }
                }
                if (target.closest('.btn-counter--plus')) {
                    ++app_2.app.data[Number(commentIndex)].rate;
                    if (!app_2.app.data[commentIndex].rated.find((item) => item.id === app_1.currentUser.id)) {
                        app_2.app.data[commentIndex].rated.push(rateData);
                    }
                    target.closest('.post-options-counter').querySelector('.btn-counter--plus').setAttribute('disabled', ''),
                        target.closest('.post-options-counter').querySelector('.btn-counter--minus').setAttribute('disabled', '');
                    if (app_2.app.data[Number(commentIndex)].rate >= 0) {
                        target.closest('.post-options-counter').querySelector('.post-options__num').classList.remove("red-text");
                    }
                }
                target.closest('.post-options-counter').querySelector('.post-options__num').value = app_2.app.data[Number(commentIndex)].rate;
                localStorage.setItem('data', JSON.stringify(app_2.app.data));
            });
        });
    }
    handlerRate(e) {
        let rateData = {
            id: app_1.currentUser.id,
            isRated: true
        };
        const target = e.target;
        let commentIndex = Number(target.closest('.reply-block__item').getAttribute('data-comment-index'));
        let answerIndex = Number(target.closest('.reply-block__item').getAttribute('data-answer-index'));
        app_2.app.data[Number(commentIndex)].answers[Number(answerIndex)].rate = target.closest('.post-options-counter').querySelector('.post-options__num').value;
        if (target.closest('.btn-counter--minus')) {
            --app_2.app.data[Number(commentIndex)].answers[Number(answerIndex)].rate;
            if (!app_2.app.data[commentIndex].answers[answerIndex].rated.find((item) => item.id === app_1.currentUser.id)) {
                app_2.app.data[commentIndex].answers[answerIndex].rated.push(rateData);
            }
            target.closest('.post-options-counter').querySelector('.btn-counter--plus').setAttribute('disabled', ''),
                target.closest('.post-options-counter').querySelector('.btn-counter--minus').setAttribute('disabled', '');
            if (app_2.app.data[Number(commentIndex)].answers[Number(answerIndex)].rate < 0) {
                target.closest('.post-options-counter').querySelector('.post-options__num').classList.add("red-text");
            }
        }
        if (target.closest('.btn-counter--plus')) {
            ++app_2.app.data[Number(commentIndex)].answers[Number(answerIndex)].rate;
            if (!app_2.app.data[commentIndex].answers[answerIndex].rated.find((item) => item.id === app_1.currentUser.id)) {
                app_2.app.data[commentIndex].answers[answerIndex].rated.push(rateData);
            }
            target.closest('.post-options-counter').querySelector('.btn-counter--plus').setAttribute('disabled', ''),
                target.closest('.post-options-counter').querySelector('.btn-counter--minus').setAttribute('disabled', '');
            if (app_2.app.data[Number(commentIndex)].answers[Number(answerIndex)].rate >= 0) {
                target.closest('.post-options-counter').querySelector('.post-options__num').classList.remove("red-text");
            }
        }
        target.closest('.post-options-counter').querySelector('.post-options__num').value = app_2.app.data[Number(commentIndex)].answers[Number(answerIndex)].rate;
        localStorage.setItem('data', JSON.stringify(app_2.app.data));
    }
    rateAnswer() {
        let countersAnswer = document.querySelectorAll('[data-num-answer-area]');
        countersAnswer.forEach(item => {
            item.addEventListener('click', this.handlerRate);
        });
    }
    rateAnswerRemove() {
        let countersAnswer = document.querySelectorAll('[data-num-answer-area]');
        countersAnswer.forEach(item => {
            item.removeEventListener('click', this.handlerRate);
        });
    }
    addToFavoritecomment() {
        let favoriteData = {
            id: app_1.currentUser.id,
            isFavorite: true
        };
        let btnsFavoritecomment = document.querySelectorAll('.post-options-favorite-comment');
        btnsFavoritecomment.forEach(item => {
            item.addEventListener('click', (e) => {
                const target = e.target;
                let commentIndex = Number(target.closest('.comment-block').getAttribute('data-index'));
                let userIndex = app_2.app.data[commentIndex].favorite.findIndex((item) => item.id === app_1.currentUser.id);
                if (!app_2.app.data[commentIndex].favorite.find((item) => item.id === app_1.currentUser.id)) {
                    app_2.app.data[commentIndex].favorite.push(favoriteData),
                        target.closest('.comment-block-area').setAttribute('data-favorite', ''),
                        target.closest('.post-options-favorite-comment').querySelector('img').src = './src/images/icons/in_favorite.svg',
                        target.closest('.post-options-favorite-comment').querySelector('.btn-favorite').textContent = 'В избранном';
                    localStorage.setItem('data', JSON.stringify(app_2.app.data));
                }
                else {
                    app_2.app.data[commentIndex].favorite.splice(userIndex, 1),
                        target.closest('.comment-block-area').removeAttribute('data-favorite'),
                        target.closest('.post-options-favorite-comment').querySelector('img').src = './src/images/icons/add_favorite.svg',
                        target.closest('.post-options-favorite-comment').querySelector('.btn-favorite').textContent = 'В избранноe';
                    localStorage.setItem('data', JSON.stringify(app_2.app.data));
                }
            });
            localStorage.setItem('data', JSON.stringify(app_2.app.data));
        });
    }
    addToFavoriteAnswer() {
        let favoriteData = {
            id: app_1.currentUser.id,
            isFavorite: true
        };
        let btnsFavoriteAnswer = document.querySelectorAll('.post-options-favorite-answer');
        btnsFavoriteAnswer.forEach(item => {
            item.addEventListener('click', (e) => {
                const target = e.target;
                let commentIndex = Number(item.closest('.reply-block__item').getAttribute('data-comment-index'));
                let answerIndex = Number(item.closest('.reply-block__item').getAttribute('data-answer-index'));
                let userIndex = app_2.app.data[commentIndex].answers[answerIndex].favorite.findIndex((item) => item.id === app_1.currentUser.id);
                if (!app_2.app.data[commentIndex].answers[answerIndex].favorite.find((item) => item.id === app_1.currentUser.id)) {
                    app_2.app.data[commentIndex].answers[answerIndex].favorite.push(favoriteData),
                        target.closest('.reply-block__item').setAttribute('data-favorite', ''),
                        target.closest('.post-options-favorite-answer').querySelector('img').src = './src/images/icons/in_favorite.svg',
                        target.closest('.post-options-favorite-answer').querySelector('.btn-favorite').textContent = 'В избранном';
                    localStorage.setItem('data', JSON.stringify(app_2.app.data));
                }
                else {
                    app_2.app.data[commentIndex].answers[answerIndex].favorite.splice(userIndex, 1),
                        target.closest('.reply-block__item').removeAttribute('data-favorite'),
                        target.closest('.post-options-favorite-answer').querySelector('img').src = './src/images/icons/add_favorite.svg',
                        target.closest('.post-options-favorite-answer').querySelector('.btn-favorite').textContent = 'В избранноe';
                    localStorage.setItem('data', JSON.stringify(app_2.app.data));
                }
            });
            localStorage.setItem('data', JSON.stringify(app_2.app.data));
        });
    }
    showFavorite() {
        let btnFavorite = document.querySelector('.favorite-list');
        let comments = document.querySelectorAll('.comment-block-area');
        let answers = document.querySelectorAll('.reply-block__item');
        let writeBlock = document.querySelector('.write-block');
        let sortingBlock = document.querySelector('.comment-nav-list');
        let isSorting = false;
        btnFavorite.addEventListener("click", () => {
            if (isSorting) {
                writeBlock.classList.remove('invisible');
                sortingBlock.classList.remove('invisible');
                comments.forEach(item => {
                    item.classList.remove('invisible');
                });
                answers.forEach(item => {
                    item.classList.remove('invisible');
                    item.classList.remove('in-favorite');
                });
                isSorting = false;
            }
            else {
                isSorting = true;
                writeBlock.classList.add('invisible');
                sortingBlock.classList.add('invisible');
                comments.forEach(item => {
                    if (!item.hasAttribute('data-favorite')) {
                        item.classList.add('invisible');
                    }
                });
                answers.forEach(item => {
                    if (!item.hasAttribute('data-favorite')) {
                        item.classList.add('invisible');
                    }
                    if (item.hasAttribute('data-favorite')) {
                        item.classList.add('in-favorite');
                    }
                });
            }
        });
    }
    sortingOptions() {
        let navDrop = document.querySelector('.comment-nav-drop');
        let navMenuItem = document.querySelector('.drop-default');
        let navArea = document.querySelector('.drop-default ');
        let navArrow = document.querySelector('.nav-arrow');
        navArea.addEventListener("mouseover", () => {
            navDrop.classList.add('open-menu');
        });
        navDrop.addEventListener('click', (e) => {
            const target = e.target;
            if (target.classList.contains("drop-choose")) {
                navMenuItem.textContent = target.textContent;
                navDrop.classList.remove('open-menu');
                navArrow.src = './src/images/icons/arrow-down.svg';
                navArrow.setAttribute('title', 'По убыванию');
            }
        });
        document.addEventListener('click', (e) => {
            const target = e.target;
            if (!target.classList.contains('drop-choose')) {
                navDrop.classList.remove('open-menu');
            }
        });
    }
    sortingByDate() {
        let navArrow = document.querySelector('.nav-arrow');
        let commentList = document.querySelector('.comment-list');
        let items = document.querySelectorAll('.comment-block');
        let btnDate = document.querySelector('#comment-date');
        function defaultSorting() {
            let sorted = [...items].sort(function (a, b) {
                return a.querySelector('.header-post__posted').innerHTML > b.querySelector('.header-post__posted').innerHTML ? -1 : 1;
            });
            commentList.innerHTML = '';
            for (let comment of sorted) {
                commentList.appendChild(comment);
            }
            let isSorting = false;
            navArrow.addEventListener("click", () => {
                if (isSorting) {
                    navArrow.src = './src/images/icons/arrow-down.svg';
                    navArrow.setAttribute('title', 'По убыванию');
                    isSorting = false;
                    let sorted = [...items].sort(function (a, b) {
                        return a.querySelector('.header-post__posted').innerHTML > b.querySelector('.header-post__posted').innerHTML ? -1 : 1;
                    });
                    commentList.innerHTML = '';
                    for (let comment of sorted) {
                        commentList.appendChild(comment);
                    }
                }
                else {
                    isSorting = true;
                    navArrow.src = './src/images/icons/arrow-up.svg';
                    navArrow.setAttribute('title', 'По возрастанию');
                    let sorted = [...items].sort(function (a, b) {
                        return a.querySelector('.header-post__posted').innerHTML > b.querySelector('.header-post__posted').innerHTML ? 1 : -1;
                    });
                    commentList.innerHTML = '';
                    for (let comment of sorted) {
                        commentList.appendChild(comment);
                    }
                }
            });
        }
        defaultSorting();
        btnDate.addEventListener('click', function () {
            defaultSorting();
        });
    }
    sortingByRate() {
        let navArrow = document.querySelector('.nav-arrow');
        let commentList = document.querySelector('.comment-list');
        let items = document.querySelectorAll('.comment-block');
        let btnRate = document.querySelector('#comment-rate');
        btnRate.addEventListener('click', function () {
            let sorted = [...items].sort(function (a, b) {
                return a.querySelector('.post-options__num').value > b.querySelector('.post-options__num').value ? -1 : 1;
            });
            commentList.innerHTML = '';
            for (let comment of sorted) {
                commentList.appendChild(comment);
            }
            let isSorting = false;
            navArrow.addEventListener("click", () => {
                if (isSorting) {
                    navArrow.src = './src/images/icons/arrow-down.svg';
                    navArrow.setAttribute('title', 'По убыванию');
                    isSorting = false;
                    let sorted = [...items].sort(function (a, b) {
                        return a.querySelector('.post-options__num').value > b.querySelector('.post-options__num').value ? -1 : 1;
                    });
                    commentList.innerHTML = '';
                    for (let comment of sorted) {
                        commentList.appendChild(comment);
                    }
                }
                else {
                    isSorting = true;
                    navArrow.src = './src/images/icons/arrow-up.svg';
                    navArrow.setAttribute('title', 'По возрастанию');
                    let sorted = [...items].sort(function (a, b) {
                        return a.querySelector('.post-options__num').value > b.querySelector('.post-options__num').value ? 1 : -1;
                    });
                    commentList.innerHTML = '';
                    for (let comment of sorted) {
                        commentList.appendChild(comment);
                    }
                }
            });
        });
    }
    sortingByAnswersQuantity() {
        let navArrow = document.querySelector('.nav-arrow');
        let commentList = document.querySelector('.comment-list');
        let items = document.querySelectorAll('.comment-block');
        let btnAnswers = document.querySelector('#comment-answers');
        btnAnswers.addEventListener('click', function () {
            let sorted = [...items].sort(function (a, b) {
                return a.querySelectorAll('.reply-block__item').length > b.querySelectorAll('.reply-block__item').length ? -1 : 1;
            });
            commentList.innerHTML = '';
            for (let comment of sorted) {
                commentList.appendChild(comment);
            }
            let isSorting = false;
            navArrow.addEventListener("click", () => {
                if (isSorting) {
                    navArrow.src = './src/images/icons/arrow-down.svg';
                    navArrow.setAttribute('title', 'По убыванию');
                    isSorting = false;
                    let sorted = [...items].sort(function (a, b) {
                        return a.querySelectorAll('.reply-block__item').length > b.querySelectorAll('.reply-block__item').length ? -1 : 1;
                    });
                    commentList.innerHTML = '';
                    for (let comment of sorted) {
                        commentList.appendChild(comment);
                    }
                }
                else {
                    isSorting = true;
                    navArrow.src = './src/images/icons/arrow-up.svg';
                    navArrow.setAttribute('title', 'По возрастанию');
                    let sorted = [...items].sort(function (a, b) {
                        return a.querySelectorAll('.reply-block__item').length > b.querySelectorAll('.reply-block__item').length ? 1 : -1;
                    });
                    commentList.innerHTML = '';
                    for (let comment of sorted) {
                        commentList.appendChild(comment);
                    }
                }
            });
        });
    }
}
exports.User = User;
