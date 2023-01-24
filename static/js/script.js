const form = document.querySelector('#form');
const setup = new NLWSetup(form);
const headerButton = document.querySelector('.header-button');
const clearSection = document.querySelector('#clear');
const clearButton = document.querySelector('.clear-button');

function setFormAndClearSectionActive() {
    form.classList.add('active');
    clearSection.classList.add('active');  
}

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
    else { 
        setup.addDay(today); 
        addClassNameToDayElement('form-section');
        setFormAndClearSectionActive();
    }
}

function loadData() {
    let storedData = JSON.parse(localStorage.getItem('NLW@Habit'));
    if (storedData) {
        setup.setData(storedData);
        setup.load();
        addClassNameToDayElement('form-section');
        setFormAndClearSectionActive();
    }
}

function saveData() {
    localStorage.setItem('NLW@Habit', JSON.stringify(setup.data));
}

function clearData() {
    localStorage.removeItem('NLW@Habit');
    location.reload();
}

onload = loadData;
headerButton.addEventListener('click', addDay);
form.addEventListener('change', saveData);
clearButton.addEventListener('click', clearData)
