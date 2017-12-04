document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById('canvas');
  canvas.width = 500;
  canvas.height = 500;

  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "blue";
  ctx.fillRect(0, 0, 20, 20);

  ctx.beginPath();
  ctx.arc(100, 100, 10, 0, 2 * Math.PI, true);
  ctx.strokeStyle = "red";
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.fillStyle = "red";
  ctx.fill();

  ctx.beginPath();
  ctx.arc(50, 20, 20, 0, 2 * Math.PI, true);
  ctx.strokeStyle = "blue";
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.fillStyle = "blue";
  ctx.fill();

});



