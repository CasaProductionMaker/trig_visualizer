const graphScale = 40; // 30 pixels = 1 unit
let mousePos = {x: 0, y: 0};
let mouseDown = false;
let FINAL_POSITION = {x: graphScale, y: -graphScale};

updateGraph();

window.addEventListener('mousemove', (event) => {
    mousePos = {x: event.clientX, y: event.clientY};

    if (!mouseDown) return;
    if (!isMouseInGraph()) return;

    let screenDim = {x: window.innerWidth, y: window.innerHeight};

    registerMouseLocation();

    updateGraph();
});

window.onmousedown = () => {
    if (!isMouseInGraph()) return;
    mouseDown = true;

    registerMouseLocation();

    updateGraph();
}
window.onmouseup = () => {
    mouseDown = false;
}

function pixelsToUnits(pixels) {
    return Math.round(pixels / graphScale * 100) / 100;
}

function registerMouseLocation() {
    const graphWindow = document.querySelector("#graph_window");
    const rect = graphWindow.getBoundingClientRect();

    let graphWindowDimensions = {x: document.querySelector("#graph_window").clientWidth, y: document.querySelector("#graph_window").clientHeight};
    let graphWindowOrigin = {x: rect.left + (graphWindowDimensions.x / 2), y: rect.top +( graphWindowDimensions.y / 2)};
    FINAL_POSITION = {x: mousePos.x - graphWindowOrigin.x, y: mousePos.y - graphWindowOrigin.y};
}

function updateGraph() {
    let angleToMouse = Math.atan2(FINAL_POSITION.y, FINAL_POSITION.x) * (180 / Math.PI);
    document.querySelector("#q1_angle").style.transform = `rotate(${angleToMouse}deg)`;
    document.querySelector("#q2_angle").style.transform = `rotate(${180 - angleToMouse}deg)`;
    document.querySelector("#q3_angle").style.transform = `rotate(${angleToMouse + 180}deg)`;
    document.querySelector("#q4_angle").style.transform = `rotate(${360 - angleToMouse}deg)`;

    document.querySelector("#q1_button").style.transform = `translate3d(${FINAL_POSITION.x}px, ${FINAL_POSITION.y}px, 0px)`;
    document.querySelector("#q2_button").style.transform = `translate3d(${-FINAL_POSITION.x}px, ${FINAL_POSITION.y}px, 0px)`;
    document.querySelector("#q3_button").style.transform = `translate3d(${-FINAL_POSITION.x}px, ${-FINAL_POSITION.y}px, 0px)`;
    document.querySelector("#q4_button").style.transform = `translate3d(${FINAL_POSITION.x}px, ${-FINAL_POSITION.y}px, 0px)`;

    document.querySelector("#q1_triangle_line").style.transform = `translate3d(${FINAL_POSITION.x + 4}px, ${Math.min(FINAL_POSITION.y, 0) + 4}px, 0px)`;
    document.querySelector("#q1_triangle_line").style.height = `${Math.abs(FINAL_POSITION.y)}px`;
    document.querySelector("#q2_triangle_line").style.transform = `translate3d(${-FINAL_POSITION.x + 4}px, ${Math.min(FINAL_POSITION.y, 0) + 4}px, 0px)`;
    document.querySelector("#q2_triangle_line").style.height = `${Math.abs(FINAL_POSITION.y)}px`;
    document.querySelector("#q3_triangle_line").style.transform = `translate3d(${-FINAL_POSITION.x + 4}px, ${Math.min(-FINAL_POSITION.y, 0) + 4}px, 0px)`;
    document.querySelector("#q3_triangle_line").style.height = `${Math.abs(FINAL_POSITION.y)}px`;
    document.querySelector("#q4_triangle_line").style.transform = `translate3d(${FINAL_POSITION.x + 4}px, ${Math.min(-FINAL_POSITION.y, 0) + 4}px, 0px)`;
    document.querySelector("#q4_triangle_line").style.height = `${Math.abs(FINAL_POSITION.y)}px`;

    document.querySelector("#coords_info").style.transform = `translate3d(${FINAL_POSITION.x}px, ${FINAL_POSITION.y}px, 0px)`;
    document.querySelector("#coords_info").innerText = `(${pixelsToUnits(FINAL_POSITION.x)}, ${pixelsToUnits(-FINAL_POSITION.y)})`;

    document.querySelector("#angle_input").value = -angleToMouse;
}

function isMouseInGraph() {
    const graphWindow = document.querySelector("#graph_window");
    const rect = graphWindow.getBoundingClientRect();
    return mousePos.x >= rect.left && mousePos.x <= rect.left + rect.width && mousePos.y >= rect.top && mousePos.y <= rect.top + rect.height;
}