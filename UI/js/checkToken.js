/* eslint-disable no-return-assign */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const token = localStorage.getItem('token');
const tokenregex = /^[\d\w_-]{20,}.[\d\w_-]{40,}.[\d\w_-]{20,}$/;
if (!tokenregex.test(token)) {
  location = './login.html';
}
