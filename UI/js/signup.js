/* eslint-disable */
const signUp = (url, data) =>
  fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    body: data,
  }).then(response => response.json());
const alert = document.querySelector('.alert');
const alertMessage = document.querySelector('#alert-message');
const url = 'https://politico-yusuf.herokuapp.com/api/v1/auth/signup';
// const url = 'http://localhost:3000/api/v1/auth/signup';
const passportUrl = document.querySelector('#passportUrl');
const fullName = document.querySelector('#name');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirmPassword');
const phoneNumber = document.querySelector('#phone');
const loader = document.querySelector('#loader');
const loaderBg = document.querySelector('#loader-background');

const hasError = field => {
  if (field.disabled || field.type === 'submit' || field.type === 'button') return;
  const ValidityState = field.validity;

  if (field === confirmPassword) {
    if (confirmPassword.value !== password.value) return 'Passwords do not match';
  }

  if (field === passportUrl) {
    if (!passportUrl.value) return 'Your passport is required for registration';
    if (
      !passportUrl.value.toLowerCase().endsWith('.jpg') &&
      !passportUrl.value.toLowerCase().endsWith('.jpeg') &&
      !passportUrl.value.toLowerCase().endsWith('.gif') &&
      !passportUrl.value.toLowerCase().endsWith('.png')
    )
      return 'Filetype not allowed. Please select an image file of type jpeg, gif or png';
  }

  if (ValidityState.valid) return;

  if (ValidityState.valueMissing) return 'Please fill out this required field.';

  if (ValidityState.typeMismatch) {
    if (field.type === 'email') return 'Please enter a valid email address.';
  }

  if (ValidityState.tooShort)
    return `Value too short. Please provide value of at least 
    ${field.getAttribute('minLength')} characters or more. 
    You are currently using ${field.value.length} characters.`;

  if (ValidityState.tooLong)
    return `Value too long. Pls provide value less than 
    ${field.getAttribute('maxLength')} characters. 
    You are currently using ${field.value.length} characters.`;

  if (ValidityState.patternMismatch) return field.getAttribute('title');
};

const showError = (field, error) => {
  field.classList.add('error');
  const id = field.id;
  if (!id) return;
  // Check if error message field already exists
  // If not, create one
  let message = field.form.querySelector(`.error-message#error-for-${id}`);
  if (!message) {
    message = document.createElement('div');
    message.className = 'error-message';
    message.id = `error-for-${id}`;

    let label;

    if (!label) {
      field.parentNode.insertBefore(message, field.nextSibling);
    }
  }
  // Update error message
  message.innerHTML = error;

  // Show error message
  message.style.display = 'block';
  message.style.visibility = 'visible';
};

const removeError = field => {
  // Remove error class to field
  field.classList.remove('error');

  // Get field id or name
  const id = field.id;
  if (!id) return;

  // Check if an error message is in the DOM
  const message = field.form.querySelector(`.error-message#error-for-${id}`);
  if (!message) return;

  // If so, hide it
  message.innerHTML = '';
  message.style.display = 'none';
  message.style.visibility = 'hidden';
};

// Listen to all blur events
document.addEventListener(
  'input',
  event => {
    // Only run if the field is in a form to be validated
    if (!event.target.form.classList.contains('validate')) return;

    // Validate the field
    const error = hasError(event.target);
    if (error) {
      showError(event.target, error);
      return;
    }

    removeError(event.target);
  },
  true,
);

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
      const formData = new FormData();
      formData.append('passportUrl', passportUrl.files[0]);
      formData.append('fullname', fullName.value);
      formData.append('email', email.value);
      formData.append('password', password.value);
      formData.append('confirmPassword', confirmPassword.value);
      formData.append('phoneNumber', phoneNumber.value);
      signUp(url, formData)
        .then(data => {
          loaderBg.style.display = 'none';
          loader.style.display = 'none';
          alert.style.display = 'block';

          if (data.status === 201){
            if (alert.classList.contains('failure')) alert.classList.remove('failure');
            alert.classList.add('success');
            alertMessage.innerHTML = 'Account Registered Successfully';
            localStorage.setItem('token', data.data[0].token);
            localStorage.setItem('passport', data.data[0].user.passport_url);
            localStorage.setItem(
              'name',
              `${data.data[0].user.firstname} ${data.data[0].user.lastname}`,
            );

            if (data.data[0].user.is_admin === true) {
              setTimeout(() => (location = './admin.html'), 1000);
            } else {
              setTimeout(() => (location = './profile.html'), 1000);
            }
          }
          else { 
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
