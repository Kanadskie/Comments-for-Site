"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = exports.currentUser = exports.chars = void 0;
const main_1 = require("./main");
const user_1 = require("./user");
const insert_1 = require("./insert");
function generateUser() {
    let users = [
        { id: 0, name: 'Boba', avatar: './src/images/avatars/boba.png' },
        { id: 1, name: 'R2D2', avatar: './src/images/avatars/r2d2.png' },
        { id: 2, name: 'Mando', avatar: './src/images/avatars/mando.png' },
        { id: 3, name: 'Grogu', avatar: './src/images/avatars/grogu.png' },
        { id: 4, name: 'Wader', avatar: './src/images/avatars/wader.png' },
        { id: 5, name: 'Padme', avatar: './src/images/avatars/padme.png' },
        { id: 6, name: 'Rey', avatar: './src/images/avatars/rey.png' },
        { id: 7, name: 'Chewbacca', avatar: './src/images/avatars/chewbacca.png' },
        { id: 8, name: 'Trooper', avatar: './src/images/avatars/trooper.png' },
        { id: 9, name: 'Luke', avatar: './src/images/avatars/luke.png' },
        { id: 10, name: 'Solo', avatar: './src/images/avatars/solo.png' },
        { id: 11, name: 'Obi-Wan', avatar: './src/images/avatars/obi-wan.png' },
        { id: 12, name: 'Palapatin', avatar: './src/images/avatars/palapatin.png' },
        { id: 13, name: 'Ewok', avatar: './src/images/avatars/ewok.png' },
        { id: 14, name: 'Jawas', avatar: './src/images/avatars/jawas.png' },
        { id: 15, name: 'Dart Mol', avatar: './src/images/avatars/dart-mol.png' }
    ];
    let index = Math.floor(Math.random() * users.length);
    let user = new user_1.User(Number(`${users[index].id}`), `${users[index].name}`, `${users[index].avatar}`);
    return user;
}
let chars = new insert_1.Insert(1000);
exports.chars = chars;
let currentUser = generateUser();
exports.currentUser = currentUser;
let app = new main_1.Main();
exports.app = app;
