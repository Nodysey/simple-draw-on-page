var canvas = document.createElement('canvas');
canvas.id = 'sdop-canvas';
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;
canvas.style.position = 'absolute';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.zIndex = '99999999999';
document.body.appendChild(canvas);

var color = "#ff0000"
var width = 5;
var ctx = canvas.getContext('2d');
var region;

var mouseDown = false;
var mouseInterval;

var controls = document.createElement('div');
controls.style.position = 'fixed';
controls.style.top = '0';
controls.style.right = '0';
controls.style.zIndex = '99999999999';
controls.style.display = 'flex';
controls.style.flexDirection = 'column';
controls.style.backgroundColor = 'white';
controls.style.padding = '5px';
controls.style.margin = '10px';
controls.style.border = '1px solid gray';
document.body.appendChild(controls);

/* colorPicker = document.createElement('input');
colorPicker.type = 'color';
colorPicker.value = color;
colorPicker.style.backgroundColor = 'transparent';
colorPicker.style.padding = '0';
colorPicker.style.margin = '2px 0';
controls.appendChild(colorPicker); 

colorPicker.addEventListener('change', (e) => {
    color = e.target.value;
}); */
widthContainer = document.createElement('div');
widthContainer.classList = 'sdop-tools-row';

widthSlider = document.createElement('input');
widthSlider.type = 'range';
/* widthSlider.style.writingMode = 'vertical-rl';
widthSlider.style.direction = 'rtl'; */
widthSlider.min = 1;
widthSlider.max = 20;
widthSlider.value = 5;
widthSlider.step = 1;
widthSlider.id = 'sdop-width-slider';
widthSlider.addEventListener('change', (e) => {
    width = e.target.value;
});

widthLabel = document.createElement('label');
widthLabel.classList = 'sdop-width-label';
widthLabel.textContent = '5px';
widthSlider.addEventListener('input', (e) => {
    widthLabel.textContent = `${e.target.value}px`;
});

widthContainer.appendChild(widthSlider);
widthContainer.appendChild(widthLabel);

var colorContainer = document.createElement('div');
colorContainer.classList = 'sdop-tools-row';

var colors = ['#ff0000', '#00ff00', '#0000ff', '#8000ff', '#ffff00', '#ff00ff', '#00ffff', '#ff8000', '#ff0080'];
var colorChangeBtns = [];
colors.forEach((itmColor) => {
    var button = document.createElement('button');
    button.style.backgroundColor = itmColor;
    button.classList = 'sdop-color-button';
    button.addEventListener('click', () => {
        for (var i = 0; i < colorChangeBtns.length; i++) {
            colorChangeBtns[i].style.border = '1px solid black';
        }
        button.style.border = '2px solid #3ba4e5';
        color = itmColor;
    });
    colorChangeBtns.push(button);
    colorContainer.appendChild(button);
});
controls.appendChild(colorContainer);
controls.appendChild(widthContainer);

var tools = document.createElement('div');
tools.classList = 'sdop-tools-row';
controls.appendChild(tools);

var drawButton = document.createElement('button');
drawButton.textContent = 'Draw';
drawButton.classList = 'sdop-tools-button';
drawButton.addEventListener('click', () => {
    ctx.globalCompositeOperation = "source-over";
    ctx.strokeStyle = color;
    drawButton.classList.add('sdop-tools-active-button');
    eraserButton.classList.remove('sdop-tools-active-button');
});
tools.appendChild(drawButton);

var eraserButton = document.createElement('button');
eraserButton.textContent = 'Erase';
eraserButton.classList = 'sdop-tools-button';
eraserButton.addEventListener('click', () => {
    ctx.globalCompositeOperation = "destination-out";
    ctx.strokeStyle = "rgba(0,0,0,1)";
    eraserButton.classList.add('sdop-tools-active-button');
    drawButton.classList.remove('sdop-tools-active-button');
});
tools.appendChild(eraserButton);

canvas.addEventListener('mousemove', (e) => {
    if (mouseDown) {
        ctx.lineTo(e.clientX, e.clientY);
        ctx.strokeStyle = color;
        ctx.stroke();
    }
})

canvas.addEventListener('mousedown', (e) => {
    region = new Path2D();
    ctx.lineWidth = width;
    ctx.beginPath();
    mouseDown = true;
    console.log('indeed mousedown');
});
canvas.addEventListener('mouseup', (e) => {
    ctx.closePath();
    mouseDown = false;
    clearInterval(mouseInterval);
    console.log('indeed mouseup');
});

function close() {
    canvas.remove();
    controls.remove();
}

chrome.runtime.onMessage.addListener((message) => {
    if (message.off) {
        close();
    }
});