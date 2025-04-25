import ProgressLoader from "./components/progress-loader.js";

customElements.define('progress-loader', ProgressLoader);

const loader = document.querySelector('progress-loader');

const valueInput = document.querySelector('input#value');
const animateInput = document.querySelector('input#animate');
const hideInput = document.querySelector('input#hide');

valueInput.addEventListener('change', e => {
    if (valueInput.checkValidity() === true) {
        loader.setAttribute('value', e.target.value);
    }
});

animateInput.addEventListener('change', e => {
    if (e.target.checked) {
        loader.setAttribute('animate', e.target.checked);
    } else {
        loader.removeAttribute('animate');
    }
});

hideInput.addEventListener('change', e => {
    if (e.target.checked) {
        loader.setAttribute('hide', e.target.checked);
    } else {
        loader.removeAttribute('hide');
    }
});