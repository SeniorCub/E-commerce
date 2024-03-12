let firstStage = document.querySelector('.firstStage')
let secondStage = document.querySelector('.secondStage')
let submit = document.querySelector('.submit')

secondStage.style.display = 'none';

submit.addEventListener('click', () => {
     firstStage.style.display = 'none'
     secondStage.style.display = 'block'
})