import ProgressLoader from "./components/progress-loader.js";

customElements.define('progress-loader', ProgressLoader);

const loader = document.querySelector('progress-loader');

const valueInput = document.querySelector('input#value');
const animateInput = document.querySelector('input#animate');
const hideInput = document.querySelector('input#hide');

valueInput.addEventListener('keydown', e => {
    if (!validateForNumbers(e)) {
        e.preventDefault();
        e.returnValue = false;
    }
});

valueInput.addEventListener('input', e => {
    validateForRange(e);
    e.target.value = parseInt(e.target.value);
});

valueInput.addEventListener('change', e => {
    if (valueInput.checkValidity() === true) {
        if (e.target.value === '') {
            e.target.value = '0';
        }

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

function validateForNumbers(event) {
    const regex = /[0-9]/;

    return regex.test(event.key)
        || event.key === 'Enter'
        || event.key === 'Backspace'
        || event.key === 'Delete'
        || event.key === 'ArrowLeft'
        || event.key === 'ArrowRight';
}

function validateForRange(event) {
    const value = parseInt(event.target.value + event.key, 10);
    const minValue = 0;
    const maxValue = 100;
    if (value < minValue) {
        event.target.value = minValue;
    } else if (value > maxValue) {
        event.target.value = maxValue;
    }
}