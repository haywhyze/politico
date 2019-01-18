const header = document.querySelector('#header');
const mobileMenu = document.querySelector('#mobile-menu');
const _top = document.querySelector('.top');
const _middle = document.querySelector('.middle');
const _bottom = document.querySelector('.bottom');
const menu = document.querySelector('.header__nav');

// // TO animate page header on scroll
// window.addEventListener('scroll', () => {
//   if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
//   header.style.padding = '0rem 5rem';
//   } else {
//     header.style.padding = '1rem 5rem';
//   }
// });

// To animate hamburger menu on click
mobileMenu.addEventListener('click', () => {
  if (mobileMenu.classList.contains('menu-close')) {
    mobileMenu.classList.remove('menu-close');
    menu.style.display = 'flex';
    _top.style.transform = 'rotate(-.125turn)';
    _middle.style.visibility = 'hidden';
    _bottom.style.transform = 'rotate(.125turn)';
  } else {
    mobileMenu.classList.add('menu-close');
    menu.style.display = 'none';
    _top.style.transform = 'none';
    _middle.style.visibility = 'visible';
    _bottom.style.transform = 'none';
  }
})
window.addEventListener('resize', (event) => {
  window.innerWidth > 800 ?
    menu.style.display = 'flex' :
    menu.style.display = 'none';
});