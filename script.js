// Get the canvas and its 2D rendering context
const canvas = document.getElementById("drawableCanvas");
const ctx = canvas.getContext("2d");

// Variables for drawing state and tools
let isDrawing = false;
let drawingColor = "blue";
let drawingTool = "pen"; // Default drawing tool is "pen"
const canvasRect = canvas.getBoundingClientRect();

// History for undo and redo
const drawingHistory = []; // Array to store drawing history
let historyIndex = -1; // Current position in history

// Event listener for mouse down to start drawing
canvas.addEventListener("mousedown", (e) => {
    isDrawing = true;
    ctx.beginPath();
    draw(e);
    canvas.classList.add("draw-cursor");

    // Clear the redo history when a new drawing starts
    if (historyIndex < drawingHistory.length - 1) {
        drawingHistory.splice(historyIndex + 1);
    }
});

// Event listener for mouse up to stop drawing and save the drawing to history
canvas.addEventListener("mouseup", () => {
    isDrawing = false;
    ctx.closePath();

    // Save the drawing to the history
    const drawingData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    drawingHistory.push(drawingData);
    historyIndex = drawingHistory.length - 1;
});

// Event listener for mouse move to draw
canvas.addEventListener("mousemove", draw);

// Event listeners for selecting different drawing tools
document.getElementById("squareTool").addEventListener("click", () => {
    drawingTool = "square";
});

document.getElementById("diamondTool").addEventListener("click", () => {
    drawingTool = "diamond";
});

document.getElementById("circleTool").addEventListener("click", () => {
    drawingTool = "circle";
});

document.getElementById("arrowTool").addEventListener("click", () => {
    drawingTool = "arrow";
});

document.getElementById("lineTool").addEventListener("click", () => {
    drawingTool = "line";
});

// Event listener for the color picker input
const colorPicker = document.getElementById("colorPicker");
colorPicker.addEventListener("input", () => {
    drawingColor = colorPicker.value;
});

// Function to handle drawing with various tools
function draw(e) {
    if (!isDrawing) return;

    const x = e.clientX - canvasRect.left;
    const y = e.clientY - canvasRect.top;

    ctx.strokeStyle = drawingColor;

    // Draw based on the selected tool
    if (drawingTool === "pen") {
        ctx.lineTo(x, y);
        ctx.stroke();
    } else if (drawingTool === "square") {
        ctx.strokeRect(x, y, 40, 40);
    } else if (drawingTool === "diamond") {
        ctx.moveTo(x, y - 20);
        ctx.lineTo(x + 20, y);
        ctx.lineTo(x, y + 20);
        ctx.lineTo(x - 20, y);
        ctx.closePath();
        ctx.stroke();
    } else if (drawingTool === "circle") {
        ctx.arc(x, y, 20, 0, 2 * Math.PI);
        ctx.stroke();
    } else if (drawingTool === "arrow") {
        ctx.moveTo(x, y);
        ctx.lineTo(x + 30, y);
        ctx.moveTo(x + 25, y - 5);
        ctx.lineTo(x + 30, y);
        ctx.lineTo(x + 25, y + 5);
        ctx.stroke();
    } else if (drawingTool === "line") {
        ctx.moveTo(x, y);
        ctx.lineTo(x + 30, y);
        ctx.stroke();
    }
}

// Event listeners for cursor
canvas.addEventListener("mousedown", (e) => {
    isDrawing = true;
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.getBoundingClientRect().left, e.clientY - canvas.getBoundingClientRect().top);
    canvas.classList.add("draw-cursor");
});

canvas.addEventListener("mouseup", () => {
    isDrawing = false;
    canvas.classList.remove("draw-cursor");
});

// Event listeners for undo and redo
document.querySelector(".ur.undo").addEventListener("click", undo);
document.querySelector(".ur.redo").addEventListener("click", redo);

// Event listener for keyboard shortcuts (Ctrl+Z for undo, Ctrl+Y for redo)
document.addEventListener("keydown", (event) => {
    if (event.ctrlKey && event.key === "z") {
        undo();
    } else if (event.ctrlKey && event.key === "y") {
        redo();
    }
});

// Function to undo the last drawing action
function undo() {
    if (historyIndex > 0) {
        historyIndex--;
        ctx.putImageData(drawingHistory[historyIndex], 0, 0);
    } else {
        // Clear the canvas and reset the history if there are no more actions to undo
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawingHistory.length = 0; // Clear the history
        historyIndex = -1; // Reset history index
    }
}


// Function to redo the previously undone drawing action
function redo() {
    if (historyIndex < drawingHistory.length - 1) {
        historyIndex++;
        ctx.putImageData(drawingHistory[historyIndex], 0, 0);
    }
}

// Event listener for the pen icon to show the color picker
document.getElementById("penIcon").addEventListener("click", function() {
    document.getElementById("colorPicker").click();
});

// Event listener for the color picker input to update the drawing color
document.getElementById("colorPicker").addEventListener("input", function() {
    const selectedColor = this.value;
    drawingColor = selectedColor;
});

// Get all tool icons
const toolIcons = document.querySelectorAll(".tool-icon");

// Function to highlight the selected tool and remove highlight from others
function highlightTool(selectedTool) {
    toolIcons.forEach((icon) => {
        icon.classList.remove("active-tool"); // Remove the class from all icons
        const tool = icon.getAttribute("data-tool");
        if (tool === selectedTool) {
            icon.classList.add("active-tool"); // Add the class to the selected icon
        }
    });
}

// Event listeners for tool icons
toolIcons.forEach((icon) => {
    icon.addEventListener("click", (event) => {
        const selectedTool = icon.getAttribute("data-tool");
        drawingTool = selectedTool; // Update the drawing tool
        highlightTool(selectedTool); // Highlight the selected tool and remove highlight from others
    });
});

 