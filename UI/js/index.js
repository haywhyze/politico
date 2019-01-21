const header = document.querySelector('.header');
const mobileMenu = document.querySelector('#mobile-menu');
const _top = document.querySelector('.top');
const _middle = document.querySelector('.middle');
const _bottom = document.querySelector('.bottom');
const menu = document.querySelector('.header__nav');
let tablinks = document.querySelectorAll('.tablinks');
let tabcontent = document.querySelectorAll('.tabcontent');
// TO animate page header on scroll
if (header) {
  window.addEventListener('scroll', () => {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
      header.style.backgroundColor = 'var(--color-white)';
      header.style.color = 'var(--color-primary)';
    } else {
      header.style.backgroundColor = 'var(--color-primary)';
      header.style.color = 'var(--color-white)';
    }
  });

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
}

// For Tab functionality
tabcontent = Array.from(tabcontent);
tablinks = Array.from(tablinks);
let openTab = () => {
  tablinks.map((e) => {
    e.addEventListener('click', () => {
      tablinks.map((x) => {
        if (x.classList.contains('active')) x.classList.remove('active');
      });
      e.classList.add('active');
      tabcontent.map(e => e.style.display = 'none');
      document.querySelector(`#${e.dataset.tab}`).style.display = 'block';
    });
  });
};


tablinks.map(e => e.addEventListener('click', openTab()));

// Update record Modal
let office = document.querySelectorAll('.office');
let modal = document.querySelector('.modal');
modal.style.display = 'none';
let voteLinks = Array.from(document.querySelectorAll('.vote-link'));
voteLinks.map(e => {
  e.addEventListener('click', (x) => {
    x.preventDefault();
    modal.style.display = 'block';
  })
})
// When the user clicks on <span> (x), close the modal
let close = document.querySelector(".close");
close.addEventListener('click', e => modal.style.display = 'none')