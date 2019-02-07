/* eslint-disable no-undef */
const name = localStorage.getItem('name');
const passport = localStorage.getItem('passport');
const headerName = document.querySelector('p.nav-list__item');
const headerImage = document.querySelector('#header-img');
const signOut = Array.from(document.querySelectorAll('.sign-out'));

headerName.innerHTML = name;
headerImage.src = passport;

signOut.map(e => {
  e.addEventListener('click', () => {
    localStorage.clear();
  });
});
