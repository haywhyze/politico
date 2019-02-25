/* eslint-disable no-return-assign */
/* eslint-disable no-undef */
token = localStorage.getItem('token');
const createParty = (url, data) =>
  fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    body: data,
    headers: {
      'x-access-token': token,
    },
  }).then(response => response.json());

const alert = document.querySelector('.alert');
const alertMessage = document.querySelector('#alert-message');
const logoUrl = document.querySelector('#party-logo');
const partyName = document.querySelector('#party-name');
const hqAddress = document.querySelector('#party-hq-address');
loader = document.querySelector('#loader');
loaderBg = document.querySelector('#loader-background');

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
    } else if (event.target.dataset.form === 'party') {
      loaderBg.style.display = 'block';
      loader.style.display = 'block';
      const formData = new FormData();
      formData.append('logoUrl', logoUrl.files[0]);
      formData.append('name', partyName.value);
      formData.append('hqAddress', hqAddress.value);
      createParty(`${baseUrl}parties`, formData)
        .then(data => {
          loaderBg.style.display = 'none';
          loader.style.display = 'none';
          alert.style.display = 'block';

          if (data.status === 201) {
            if (alert.classList.contains('failure')) alert.classList.remove('failure');
            alert.classList.add('success');
            alertMessage.innerHTML = `${data.data[0].name} Created Successfully`;
            sessionStorage.setItem('reloadParties', 'true');
            setTimeout(() => {
              window.location.reload();
            }, 5000);
          } else {
            alert.classList.add('failure');
            alertMessage.innerHTML = data.error;
          }
          setTimeout(() => (alert.style.display = 'none'), 5000);
          console.log(data);
        })
        .catch(error => {
          loaderBg.style.display = 'none';
          loader.style.display = 'none';
          alert.classList.add('failure');
          setTimeout(() => (alert.style.display = 'none'), 5000);
          console.log(error);
        });
    }
  },
  false,
);
