/* eslint-disable no-unused-expressions */
/* eslint-disable no-return-assign */
/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
const header = document.querySelector('.header');
const mobileMenu = document.querySelector('#mobile-menu');
const _top = document.querySelector('.top');
const _middle = document.querySelector('.middle');
const _bottom = document.querySelector('.bottom');
const menu = document.querySelector('.header__nav');
const dropToggle = document.querySelector('.dropdownTrigger');
const dropContent = document.querySelector('.dropdownContent');
let tablinks = document.querySelectorAll('.tablinks');
let tabcontent = document.querySelectorAll('.tabcontent');

const forms = Array.from(document.querySelectorAll('form'));
forms.map(form => form.setAttribute('novalidate', true));

dropToggle.addEventListener('click', () => {
  dropContent.classList.toggle('show');
});

// TO animate page header on scroll
if (header) {
  window.addEventListener('scroll', () => {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
      header.style.backgroundColor = 'var(--color-white)';
      header.style.color = 'var(--color-primary)';
      dropContent.style.backgroundColor = 'var(--color-primary)';
      dropContent.style.color = 'var(--color-white)';
    } else {
      dropContent.style.backgroundColor = 'var(--color-secondary)';
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
  });
  window.addEventListener('resize', () => {
    window.innerWidth > 800 ? (menu.style.display = 'flex') : (menu.style.display = 'none');
  });
}

// For Tab functionality
tabcontent = Array.from(tabcontent);
tablinks = Array.from(tablinks);
const openTab = () => {
  tablinks.map(e => {
    e.addEventListener('click', () => {
      tablinks.map(x => {
        if (x.classList.contains('active')) x.classList.remove('active');
      });
      e.classList.add('active');
      tabcontent.map(e => (e.style.display = 'none'));
      document.querySelector(`#${e.dataset.tab}`).style.display = 'block';
    });
  });
};

tablinks.map(e => e.addEventListener('click', openTab()));

// Modal
const modal = document.querySelector('.modal');
const modalVote = document.querySelector('.modal-vote');
const modalEdit = document.querySelector('.modal-edit');
const modalDelete = document.querySelector('.modal-delete');

if (modal) modal.style.display = 'none';
if (modalEdit) modalEdit.style.display = 'none';
if (modalDelete) modalDelete.style.display = 'none';
if (modalVote) modalVote.style.display = 'none';

const voteLinks = Array.from(document.querySelectorAll('.vote-link'));
const resultLinks = Array.from(document.querySelectorAll('.result-link'));
const editLinks = Array.from(document.querySelectorAll('.edit'));
const deleteLinks = Array.from(document.querySelectorAll('.delete'));

const openModal = (links, modal) => {
  links.map(link => {
    link.addEventListener('click', x => {
      x.preventDefault();
      modal.style.display = 'block';
    });
  });
};
if (resultLinks && modal) openModal(resultLinks, modal);
if (editLinks && modalEdit) openModal(editLinks, modalEdit);
if (deleteLinks && modalDelete) openModal(deleteLinks, modalDelete);
if (voteLinks && modalVote) openModal(voteLinks, modalVote);

// When the user clicks on <span> (x), close the modal
const close = Array.from(document.querySelectorAll('.close'));
close.map(e =>
  e.addEventListener('click', () => {
    if (modal) modal.style.display = 'none';
    if (modalEdit) modalEdit.style.display = 'none';
    if (modalDelete) modalDelete.style.display = 'none';
    if (modalVote) modalVote.style.display = 'none';
  }),
);

window.addEventListener('click', e => {
  if (!e.target.matches('#header-img') && !e.target.matches('.dropdownContent')) {
    if (dropContent.classList.contains('show')) dropContent.classList.remove('show');
  }
});
