const canvas = document.createElement("canvas");
canvas.width = 800;
canvas.height = 600;
canvas.style.border = "1px solid";

const ctx = canvas.getContext("2d");
ctx.fillStyle = "blue";
ctx.fillRect(80, 50, 250, 175);

ctx.strokeStyle = "olive";
ctx.strokeRect(120, 75, 300, 100);

const gradient = ctx.createLinearGradient(150, 150, 450, 150);
gradient.addColorStop(0, "yellow");
gradient.addColorStop(0.5, "maroon");
gradient.addColorStop(1, "magenta");
ctx.fillStyle = gradient;
ctx.fillRect(150, 150, 300, 300);

ctx.fillStyle = "black";
ctx.font = `96px Helvetica`;
ctx.fillText("Hello, canvas!", 125, 485);

document.getElementById("add-canvas-here").appendChild(canvas);
