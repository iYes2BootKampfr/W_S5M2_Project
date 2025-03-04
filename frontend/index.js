function moduleProject2() {
  let startTime = null;
  let timer = null;
  let timeElapsed = 0;
  
  function startTimer() {
    if (!timer) {
      startTime = new Date().getTime();
      timer = setInterval(() => {
        timeElapsed = Math.floor((new Date().getTime() - startTime) / 1000);
      }, 1000);
    }
  }
  
  function stopTimer() {
    clearInterval(timer);
    timer = null;
  }
  
  function displayTimeElapsed() {
    let header = document.querySelector('#game-header');
    header.textContent = `Time Elapsed: ${timeElapsed} seconds`;
  }
  
  let keys = {
    space: ' ',
    up: 'ArrowUp',
    right: 'ArrowRight',
    down: 'ArrowDown',
    left: 'ArrowLeft',
  };
  
  const getAllSquares = () => document.querySelectorAll('.square');
  
  for (let n = 0; n < 5; n++) {
    let row = document.createElement('div');
    document.querySelector('#grid').appendChild(row);
    row.classList.add('row');
    
    for (let m = 0; m < 5; m++) {
      let square = document.createElement('div');
      square.classList.add('square');
      row.appendChild(square);
      square.addEventListener('click', () => {
        startTimer();
        square.classList.add("targeted");
      });
    }
  }
  
  document.querySelector('.row:nth-child(3)').children[2].classList.add('targeted');
  
  document.addEventListener('keydown', evt => {
    startTimer();
    let currentSquare = document.querySelector('.targeted');
    if (!currentSquare) return;
    
    if (evt.key === keys.right && currentSquare.nextElementSibling) {
      currentSquare.classList.remove('targeted');
      currentSquare.nextElementSibling.classList.add('targeted');
    }
    if (evt.key === keys.left && currentSquare.previousElementSibling) {
      currentSquare.classList.remove('targeted');
      currentSquare.previousElementSibling.classList.add('targeted');
    }
    if (evt.key === keys.down) {
      const rowBelow = currentSquare.parentElement.nextElementSibling;
      if (rowBelow) {
        const columnIndex = [...currentSquare.parentElement.children].indexOf(currentSquare);
        currentSquare.classList.remove('targeted');
        rowBelow.children[columnIndex].classList.add('targeted');
      }
    }
    if (evt.key === keys.up) {
      const rowAbove = currentSquare.parentElement.previousElementSibling;
      if (rowAbove) {
        const columnIndex = [...currentSquare.parentElement.children].indexOf(currentSquare);
        currentSquare.classList.remove('targeted');
        rowAbove.children[columnIndex].classList.add('targeted');
      }
    }
  });
  
  function endGame() {
    stopTimer();
    displayTimeElapsed();
  }
} 

if (typeof module !== 'undefined' && module.exports) module.exports = { moduleProject2 }
else moduleProject2();
