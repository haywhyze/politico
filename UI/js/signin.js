/* eslint-disable no-return-assign */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const signIn = (url, data) =>
  fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(response => response.json());

// const url = 'https://politico-yusuf.herokuapp.com/api/v1/auth/login';
const url = 'http://localhost:3000/api/v1/auth/login';
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const alert = document.querySelector('.alert');
const alertMessage = document.querySelector('#alert-message');
const loader = document.querySelector('#loader');
const loaderBg = document.querySelector('#loader-background');

// Check all fields on submit
document.addEventListener(
  'submit',
  event => {
    event.preventDefault();
    // Get all of the form elements
    const fields = event.target.elements;

    // Validate each field
    let err;
    let hasErr;

    for (let i = 0; i < fields.length; i += 1) {
      err = hasError(fields[i]);
      if (err) {
        showError(fields[i], err);
        if (!hasErr) {
          hasErr = fields[i];
        }
      }
    }

    // If there are errors, don't submit form
    if (hasErr) {
      hasErr.focus();
    } else {
      loaderBg.style.display = 'block';
      loader.style.display = 'block';
      data = {
        email: email.value,
        password: password.value,
      };
      signIn(url, data)
        .then(data => {
          loaderBg.style.display = 'none';
          loader.style.display = 'none';
          alert.style.display = 'block';

          if (data.status === 200) {
            if (alert.classList.contains('failure')) alert.classList.remove('failure');
            alert.classList.add('success');
            alertMessage.innerHTML = 'Logged In Successfully';
            localStorage.setItem('token', data.data[0].token);
            localStorage.setItem('passport', data.data[0].user.passport_url);
            localStorage.setItem(
              'name',
              `${data.data[0].user.firstname} ${data.data[0].user.lastname}`,
            );
            localStorage.setItem('isAdmin', data.data[0].user.is_admin);
            localStorage.setItem('email', data.data[0].user.email);
            localStorage.setItem('phone_number', data.data[0].user.phone_number);
            if (data.data[0].user.is_admin === true) {
              setTimeout(() => (location = './admin.html'), 1000);
            } else {
              setTimeout(() => (location = './profile.html'), 1000);
            }
          } else {
            alert.classList.add('failure');
            alertMessage.innerHTML = data.error;
          }
          setTimeout(() => (alert.style.display = 'none'), 5000);

          console.log(data);
        })
        .catch(error => console.log(error));
    }
  },
  false,
);
