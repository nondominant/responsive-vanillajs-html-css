
const update = (key) => {
  const element = document.querySelector('.display');
  element.innerHTML = window.localStorage.getItem('value');
}

const press = () => {
  let current = parseInt(window.localStorage.getItem('value'), 10);
  if(!current) {
    current = 0;
  }
  window.localStorage.setItem('value', current + 1)
  update('value');
}


