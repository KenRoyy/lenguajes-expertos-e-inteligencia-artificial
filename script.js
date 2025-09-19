const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });

  if (index === 2) {
    animateGraph();
  } else {
    resetGraph();
  }
}

function nextSlide() {
  if (currentSlide < slides.length - 1) {
    currentSlide++;
    showSlide(currentSlide);
  }
}

// function nextSlide() {
//    if(currentSlide < slides.length - 1) {}
// }

function prevSlide() {
  if (currentSlide > 0) {
    currentSlide--;
    showSlide(currentSlide);
  }
}

function restart() {
  currentSlide = 0;
  showSlide(currentSlide);
}

const nodes = [...document.querySelectorAll('#graphContainer .node')];

function animateGraph() {
  resetGraph();
  let step = 0;

  const bfsOrder = [0, 1, 2, 3];  
  const dfsOrder = [0, 1, 3, 2];  

  let mode = 'BFS'; 
  let interval = setInterval(() => {
    if (step > 0) {
      nodes[bfsOrder[step - 1]].classList.remove('active');
    }
    if (step === bfsOrder.length) {
      if (mode === 'BFS') {
        mode = 'DFS';
        step = 0;
        nodes.forEach(n => n.classList.remove('active'));
      } else {
        clearInterval(interval);
        return;
      }
    }

    if (mode === 'BFS' && step < bfsOrder.length) {
      nodes[bfsOrder[step]].classList.add('active');
    }
    if (mode === 'DFS' && step < dfsOrder.length) {
      nodes[dfsOrder[step]].classList.add('active');
    }

    step++;
  }, 800);
}

function resetGraph() {
  nodes.forEach(n => n.classList.remove('active'));
}

showSlide(currentSlide);
