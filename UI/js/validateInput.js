/* eslint-disable consistent-return */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */
const hasError = field => {
  if (field.disabled || field.type === 'submit' || field.type === 'button') return;
  const ValidityState = field.validity;

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
    if (!event.target.form) return;
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
