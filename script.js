var canvas = document.createElement('canvas');
canvas.id = 'sdop-canvas';
canvas.width = document.documentElement.scrollWidth;
canvas.height = document.documentElement.scrollHeight;
canvas.style.position = 'absolute';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.zIndex = '99999999999';
document.body.appendChild(canvas);

window.addEventListener('resize', () => {
    canvas.width = document.documentElement.scrollWidth;
    canvas.height = document.documentElement.scrollHeight;
});

var color = "#ff0000"
var width = 5;
var ctx = canvas.getContext('2d');
var region;

var mouseDown = false;
var mouseInterval;

var controls = document.createElement('div');
controls.id = 'sdop-controls';
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
            colorChangeBtns[i].classList.remove('sdop-color-active-button');
        }
        button.classList.add('sdop-color-active-button');
        // document.documentElement.style.setProperty('--sdop-current-color', itmColor);
        color = itmColor;
    });
    colorChangeBtns.push(button);
    colorContainer.appendChild(button);
});
colorChangeBtns[0].click();
controls.appendChild(colorContainer);
controls.appendChild(widthContainer);

var tools = document.createElement('div');
tools.classList = 'sdop-tools-row';
controls.appendChild(tools);

var toolsButtons = [];

var drawButton = document.createElement('button');
drawButton.textContent = 'Draw';
drawButton.classList = 'sdop-tools-button';
drawButton.addEventListener('click', () => {
    canvas.style.pointerEvents = 'auto';
    ctx.globalCompositeOperation = "source-over";
    ctx.strokeStyle = color;
    for (var i = 0; i < toolsButtons.length; i++) {
        toolsButtons[i].classList.remove('sdop-tools-active-button');
    }
    drawButton.classList.add('sdop-tools-active-button');
});
tools.appendChild(drawButton);
toolsButtons.push(drawButton);

var eraserButton = document.createElement('button');
eraserButton.textContent = 'Erase';
eraserButton.classList = 'sdop-tools-button';
eraserButton.addEventListener('click', () => {
    canvas.style.pointerEvents = 'auto';
    ctx.globalCompositeOperation = "destination-out";
    ctx.strokeStyle = "rgba(0,0,0,1)";
    for (var i = 0; i < toolsButtons.length; i++) {
        toolsButtons[i].classList.remove('sdop-tools-active-button');
    }
    eraserButton.classList.add('sdop-tools-active-button');
});
tools.appendChild(eraserButton);
toolsButtons.push(eraserButton);

var interactButton = document.createElement('button');
interactButton.textContent = 'Interact';
interactButton.classList = 'sdop-tools-button';
interactButton.addEventListener('click', () => {
    canvas.style.pointerEvents = 'none';
    for (var i = 0; i < toolsButtons.length; i++) {
        toolsButtons[i].classList.remove('sdop-tools-active-button');
    }
    interactButton.classList.add('sdop-tools-active-button');
});
tools.appendChild(interactButton);
toolsButtons.push(interactButton);

canvas.addEventListener('mousemove', (e) => {
    if (mouseDown) {
        ctx.lineTo(e.clientX + window.scrollX, e.clientY + window.scrollY);
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