/* eslint-disable prefer-const */
/* eslint-disable no-return-assign */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
let token = localStorage.getItem('token');
let isAdmin = localStorage.getItem('isAdmin');
const tokenregex = /^[\d\w_-]{20,}.[\d\w_-]{40,}.[\d\w_-]{20,}$/;
if (!tokenregex.test(token)) {
  location = './login.html';
}

if (location.href.includes('admin') && isAdmin === 'false') location = './profile.html';
