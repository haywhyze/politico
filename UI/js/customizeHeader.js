/* eslint-disable no-undef */
const name = localStorage.getItem('name');
const passport = localStorage.getItem('passport');
const email = localStorage.getItem('email');
const phoneNumber = localStorage.getItem('phone_number');
const headerName = document.querySelector('p.nav-list__item');
const headerImage = document.querySelector('#header-img');
const headerEmail = document.querySelector('#header-mail');
const headerPhoneNumber = document.querySelector('#header-phone');
const signOut = Array.from(document.querySelectorAll('.sign-out'));

headerName.innerHTML = name;
headerImage.src = passport;
headerEmail.innerHTML = email;
headerPhoneNumber.innerHTML = phoneNumber;

signOut.map(e => {
  e.addEventListener('click', () => {
    localStorage.clear();
  });
});
