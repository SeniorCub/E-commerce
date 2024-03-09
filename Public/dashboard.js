document.querySelector('.offCavaBtn').addEventListener('click', ()=>{
     
     let firstSide = document.querySelector('.firstSide')
    let extended = firstSide.style.display === "block";
    firstSide.style.display = extended ? "none" : "block";
})
document.querySelector('.masterCardIcon').addEventListener('click', ()=>{
     
     let thirdSide = document.querySelector('.thirdSide')
    let extended = thirdSide.style.display === "block";
    thirdSide.style.display = extended ? "none" : "block";
})