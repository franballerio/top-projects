"use strict"
// Create a 16x16 grid of square divs and append to an existing container div
function createGrid(gridSize) {
    const container = document.querySelector('#game-container'); // Assumes the container div is the first div in the HTML

    container.innerHTML = ''; // Clear previous grid

    container.style.display = "flex";
    container.style.flexWrap = 'wrap';
    container.style.width = gridSize * 20 + 'px'; // 16 * 20px squares
    container.style.height = gridSize * 20 + 'px'; // 16 * 20px squares

    const colors = Array.from({ length: 256 }, (_, i) => `hsl(${Math.floor(i * 360 / 256)}, 70%, 60%)`);
    for (let i = 0; i < gridSize*gridSize; i++) {
        const square = document.createElement('div');
        square.style.width = '20px';
        square.style.height = '20px';
        square.style.boxSizing = 'border-box';
        square.style.border = '1px solid #ccc';
        square.style.opacity = '0%'; // Set initial opacity
        square.addEventListener('mouseover', () => {
            square.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            square.style.opacity = parseFloat(square.style.opacity) + 0.1; // increase opacity on each hover
        });
        container.appendChild(square);
    }
}

document.querySelector('#new_square').addEventListener('click', () => {
    let gridSize = prompt("Enter the grid size (e.g., 16 for a 16x16 grid, max 100x100):", "16");
    if (gridSize === null || gridSize < 1 || gridSize > 100) {
        alert("Please enter a valid grid size between 1 and 100.");
        return;
    } else {
        createGrid(gridSize);
    }
});
