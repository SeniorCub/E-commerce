document.querySelector('.offCavaBtn').addEventListener('click', ()=>{
     
     let firstSide = document.querySelector('.firstSide')
    let extended = firstSide.style.display === "block";
    firstSide.style.display = extended ? "none" : "block";
})