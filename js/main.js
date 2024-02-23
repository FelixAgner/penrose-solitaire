let pegs = [
    { x: 25, y: 75, radius: 10, isSelected: false },
    { x: 75, y: 75, radius: 10, isSelected: false },
    { x: 125, y: 75, radius: 10, isSelected: false },
    // Add more pegs as needed
  ];
  
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

function drawPegs() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
  pegs.forEach(peg => {
    ctx.beginPath();
    ctx.arc(peg.x, peg.y, peg.radius, 0, Math.PI * 2);
    ctx.fillStyle = peg.isSelected ? 'red' : 'blue'; // Highlight selected peg
    ctx.fill();
  });
}

drawPegs(); // Initial drawing
