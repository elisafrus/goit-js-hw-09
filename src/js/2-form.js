const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

let formData = {
  email: "",
  message: "",
};

const savedData = localStorage.getItem(STORAGE_KEY);
if (savedData) {
  try {
    formData = JSON.parse(savedData);
    form.elements.email.value = formData.email || "";
    form.elements.message.value = formData.message || "";
  } catch (e) {
    console.error('Failed to parse localStorage data:', e);
  }
}

form.addEventListener('input', e => {
  const { name, value } = e.target;

  if (name in formData) {
    formData[name] = value.trim();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }
});

form.addEventListener('submit', e => {
  e.preventDefault();

  const { email, message } = formData;

  if (!email || !message) {
    alert('Fill please all fields');
    return;
  }

  console.log(formData);

  formData = { email: "", message: "" };
  form.reset();
  localStorage.removeItem(STORAGE_KEY);
});