const form = document.querySelector('#form');
const setup = new NLWSetup(form);
const button = document.querySelector('.header-button');

function addClassNameToDayElement(className) {
    const days = document.querySelectorAll('.day');
    if (days.length === 0) return;
    days.forEach(e => e.classList.add(className));
}

function addDay() {
    const today = new Date().toLocaleDateString('pt-br').slice(0, 5);
    if (setup.dayExists(today)) {
        const warning = document.querySelector('#warning');
        warning.classList.toggle('active');
        setTimeout(() => { warning.classList.toggle('active'); }, 5000);
    }
    else { setup.addDay(today); }
    addClassNameToDayElement('form-section');
}

function loadData() {
    const storedData = JSON.parse(localStorage.getItem('NLW@Habit')) || {};
    setup.setData(storedData);
    setup.load();
    addClassNameToDayElement('form-section');    
}

function saveData() {
    localStorage.setItem('NLW@Habit', JSON.stringify(setup.data));
}

button.addEventListener('click', addDay);

form.addEventListener('change', saveData);

onload = loadData;
