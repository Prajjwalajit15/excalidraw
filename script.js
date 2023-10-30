const canvas = document.getElementById("drawableCanvas");
const ctx = canvas.getContext("2d");
let isDrawing = false;
let drawingColor = "blue";
let drawingTool = "pen"; // Default drawing tool is "pen"
const canvasRect = canvas.getBoundingClientRect();

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

canvas.addEventListener("mouseup", () => {
    isDrawing = false;
    ctx.closePath();

    // Save the drawing to the history
    const drawingData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    drawingHistory.push(drawingData);
    historyIndex = drawingHistory.length - 1;
});

canvas.addEventListener("mousemove", draw);

// Event listeners for shape tools
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

// Color picker input element
const colorPicker = document.getElementById("colorPicker");
colorPicker.addEventListener("input", () => {
    drawingColor = colorPicker.value;
});

// Undo and redo functionality (as shown in the previous response)

// Function to draw different shapes
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
        // Draw a square (you can modify this to draw other shapes)
        ctx.strokeRect(x, y, 40, 40);
    } else if (drawingTool === "diamond") {
        // Draw a diamond (you can modify this to draw other shapes)
        ctx.moveTo(x, y - 20);
        ctx.lineTo(x + 20, y);
        ctx.lineTo(x, y + 20);
        ctx.lineTo(x - 20, y);
        ctx.closePath();
        ctx.stroke();
    } else if (drawingTool === "circle") {
        // Draw a circle (you can modify this to draw other shapes)
        ctx.arc(x, y, 20, 0, 2 * Math.PI);
        ctx.stroke();
    } else if (drawingTool === "arrow") {
        // Draw an arrow (you can modify this to draw other shapes)
        ctx.moveTo(x, y);
        ctx.lineTo(x + 30, y);
        ctx.moveTo(x + 25, y - 5);
        ctx.lineTo(x + 30, y);
        ctx.lineTo(x + 25, y + 5);
        ctx.stroke();
    } else if (drawingTool === "line") {
        // Draw a line (you can modify this to draw other shapes)
        ctx.moveTo(x, y);
        ctx.lineTo(x + 30, y);
        ctx.stroke();
    }
}


// for cursor
canvas.addEventListener("mousedown", (e) => {
    isDrawing = true;
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.getBoundingClientRect().left, e.clientY - canvas.getBoundingClientRect().top);
    canvas.classList.add("draw-cursor"); // Add the CSS class
});

canvas.addEventListener("mouseup", () => {
    isDrawing = false;
    canvas.classList.remove("draw-cursor"); // Remove the CSS class
});

canvas.addEventListener("mousemove", draw);

// colorpicker
// JavaScript to show the color picker when the pen icon is clicked
document.getElementById("penIcon").addEventListener("click", function() {
    // Trigger a click event on the hidden color picker input
    document.getElementById("colorPicker").click();
});

// JavaScript to update the drawing color when the color picker input changes
document.getElementById("colorPicker").addEventListener("input", function() {
    // Get the selected color from the color picker
    const selectedColor = this.value;
    
    // Update the drawing color (you can modify this to suit your drawing logic)
    drawingColor = selectedColor;
});


