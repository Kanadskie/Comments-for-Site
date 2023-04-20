"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main = void 0;
const app_1 = require("./app");
const app_2 = require("./app");
const app_3 = require("./app");
class Main {
    constructor() {
        this.data = [];
    }
    sortingBy() {
        app_1.currentUser.sortingByDate();
        app_1.currentUser.sortingByDate();
        app_1.currentUser.sortingByAnswersQuantity();
    }
    start() {
        if (localStorage.getItem("data") != null) {
            app_2.app.data = JSON.parse(localStorage.getItem('data'));
            app_2.app.data.forEach(function (item) {
                document.querySelector('.comment-list').innerHTML += item.text;
            });
            let answerList = document.querySelectorAll('.reply-block');
            answerList.forEach(function (item) {
                let commentIndex = item.closest('.comment-block').getAttribute('data-index');
                app_2.app.data[Number(commentIndex)].answers.forEach(function (reply) {
                    item.innerHTML += reply.text;
                });
            });
            let rates = document.querySelectorAll('.post-options__num');
            rates.forEach(function (item) {
                if (item.hasAttribute('data-num-comment')) {
                    let commentIndex = Number(item.closest('.comment-block').getAttribute('data-index'));
                    item.value = app_2.app.data[commentIndex].rate;
                    if (Number(item.value) < 0) {
                        item.classList.add('red-text');
                    }
                    if (app_2.app.data[commentIndex].rated.find((item) => item.id === app_1.currentUser.id)) {
                        item.closest('.post-options-counter').querySelector('.btn-counter--plus').setAttribute('disabled', '');
                        item.closest('.post-options-counter').querySelector('.btn-counter--minus').setAttribute('disabled', '');
                    }
                }
                if (item.hasAttribute('data-num-answer')) {
                    let commentIndex = Number(item.closest('.reply-block__item').getAttribute('data-comment-index'));
                    let answerIndex = Number(item.closest('.reply-block__item').getAttribute('data-answer-index'));
                    item.value = app_2.app.data[commentIndex].answers[answerIndex].rate;
                    if (Number(item.value) < 0) {
                        item.classList.add('red-text');
                    }
                    if (app_2.app.data[commentIndex].answers[answerIndex].rated.find((item) => item.id === app_1.currentUser.id)) {
                        item.closest('.post-options-counter').querySelector('.btn-counter--plus').setAttribute('disabled', '');
                        item.closest('.post-options-counter').querySelector('.btn-counter--minus').setAttribute('disabled', '');
                    }
                }
            });
            let btnsFavoritecomment = document.querySelectorAll('.post-options-favorite-comment');
            btnsFavoritecomment.forEach(item => {
                let commentIndex = Number(item.closest('.comment-block').getAttribute('data-index'));
                if (app_2.app.data[commentIndex].favorite.find((item) => item.id === app_1.currentUser.id)) {
                    item.closest('.comment-block-area').setAttribute('data-favorite', '');
                    item.closest('.post-options-favorite-comment').querySelector('img').setAttribute('src', './src/images/icons/in_favorite.svg');
                    item.closest('.post-options-favorite-comment').querySelector('.btn-favorite').textContent = 'В избранном';
                }
            });
            let btnsFavoriteAnswer = document.querySelectorAll('.post-options-favorite-answer');
            btnsFavoriteAnswer.forEach(item => {
                let commentIndex = Number(item.closest('.reply-block__item').getAttribute('data-comment-index'));
                let answerIndex = Number(item.closest('.reply-block__item').getAttribute('data-answer-index'));
                if (app_2.app.data[commentIndex].answers[answerIndex].favorite.find((item) => item.id === app_1.currentUser.id)) {
                    item.closest('.reply-block__item').setAttribute('data-favorite', '');
                    item.closest('.post-options-favorite-answer').querySelector('img').setAttribute('src', './src/images/icons/in_favorite.svg');
                    item.closest('.post-options-favorite-answer').querySelector('.btn-favorite').textContent = 'В избранном';
                }
            });
            app_1.currentUser.replyMsg();
            app_1.currentUser.ratecomment();
            app_1.currentUser.rateAnswer();
            app_1.currentUser.addToFavoritecomment();
            app_1.currentUser.addToFavoriteAnswer();
            app_1.currentUser.showFavorite();
            this.sortingBy();
        }
        app_3.chars.charsCounter();
        app_1.currentUser.addUserData();
        app_1.currentUser.sendMsg();
        app_1.currentUser.sortingOptions();
    }
}
exports.Main = Main;
