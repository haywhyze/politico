/* eslint-disable no-return-assign */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
token = localStorage.getItem('token');
const registerCandidate = (url, data) =>
  fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
  }).then(response => response.json());

const id = localStorage.getItem('id');

const url = `https://politico-yusuf.herokuapp.com/api/v1/offices/${id}/register`;
// const url = `http://localhost:3000/api/v1/offices/${id}/register`;
const alert = document.querySelector('.alert');
const alertMessage = document.querySelector('#alert-message');

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
        party: selectParties.value,
        office: selectOffices.value,
      };
      registerCandidate(url, data)
        .then(data => {
          loaderBg.style.display = 'none';
          loader.style.display = 'none';
          alert.style.display = 'block';

          if (data.status === 201) {
            if (alert.classList.contains('failure')) alert.classList.remove('failure');
            alert.classList.add('success');
            alertMessage.innerHTML = 'Form submitted successfully';
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
