const graphScale = 40; // 30 pixels = 1 unit
let mousePos = {x: 0, y: 0};
let mouseDown = false;
let FINAL_POSITION = {x: graphScale, y: -graphScale};

updateGraph();

// Event Listeners

window.addEventListener('pointermove', (event) => {
    mousePos = {x: event.clientX, y: event.clientY};

    if (!mouseDown) return;
    if (!isMouseInGraph()) return;

    let screenDim = {x: window.innerWidth, y: window.innerHeight};

    registerMouseLocation();

    updateGraph();
});

window.addEventListener('pointerdown', (event) => {
    if (!isMouseInGraph()) return;
    mouseDown = true;

    registerMouseLocation();

    updateGraph();
});
window.addEventListener('pointerup', (event) => {
    mouseDown = false;
});

document.querySelector("#angle_input").addEventListener("change", (event) => {
    let distanceToPoint = Math.sqrt(FINAL_POSITION.x**2 + FINAL_POSITION.y**2);
    let angleInRadians = (event.target.value) * (Math.PI / 180);
    let newX = distanceToPoint * Math.cos(angleInRadians);
    let newY = -distanceToPoint * Math.sin(angleInRadians);
    FINAL_POSITION = {x: newX, y: newY};
    updateGraph();
});

document.querySelector("#sin_theta_input").addEventListener("change", (event) => {
    let distanceToPoint = Math.sqrt(FINAL_POSITION.x**2 + FINAL_POSITION.y**2);
    let angleInRadians = Math.asin(event.target.value);
    let newX = distanceToPoint * Math.cos(angleInRadians);
    let newY = -distanceToPoint * Math.sin(angleInRadians);
    FINAL_POSITION = {x: newX, y: newY};
    updateGraph();
});

document.querySelector("#cos_theta_input").addEventListener("change", (event) => {
    let distanceToPoint = Math.sqrt(FINAL_POSITION.x**2 + FINAL_POSITION.y**2);
    let angleInRadians = Math.acos(event.target.value);
    let newX = distanceToPoint * Math.cos(angleInRadians);
    let newY = -distanceToPoint * Math.sin(angleInRadians);
    FINAL_POSITION = {x: newX, y: newY};
    updateGraph();
});

document.querySelector("#tan_theta_input").addEventListener("change", (event) => {
    let distanceToPoint = Math.sqrt(FINAL_POSITION.x**2 + FINAL_POSITION.y**2);
    let angleInRadians = Math.atan(event.target.value);
    let newX = distanceToPoint * Math.cos(angleInRadians);
    let newY = -distanceToPoint * Math.sin(angleInRadians);
    FINAL_POSITION = {x: newX, y: newY};
    updateGraph();
});

document.querySelector("#x_input").addEventListener("change", (event) => {
    FINAL_POSITION.x = event.target.value * graphScale;
    updateGraph();
});

document.querySelector("#y_input").addEventListener("change", (event) => {
    FINAL_POSITION.y = -event.target.value * graphScale;
    updateGraph();
});

document.querySelector("#q1_text").addEventListener("mouseover", (event) => {
    event.target.innerText = "All";
});

document.querySelector("#q1_text").addEventListener("mouseout", (event) => {
    event.target.innerText = "A";
});

document.querySelector("#q2_text").addEventListener("mouseover", (event) => {
    event.target.innerText = "Students";
});

document.querySelector("#q2_text").addEventListener("mouseout", (event) => {
    event.target.innerText = "S";
});

document.querySelector("#q3_text").addEventListener("mouseover", (event) => {
    event.target.innerText = "Take";
});

document.querySelector("#q3_text").addEventListener("mouseout", (event) => {
    event.target.innerText = "T";
});

document.querySelector("#q4_text").addEventListener("mouseover", (event) => {
    event.target.innerText = document.querySelector("#is_alternate_astc").checked ? "Cocaine" : "Calculus";
});

document.querySelector("#q4_text").addEventListener("mouseout", (event) => {
    event.target.innerText = "C";
});

// Functions

function pixelsToUnits(pixels) {
    return roundToDecimalPlaces(pixels / graphScale, 2);
}

function roundToDecimalPlaces(number, decimals) {
    let multiplier = 10**decimals;
    return Math.round(number * multiplier) / multiplier;
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
    let angleToMouse360 = (-angleToMouse < 0 ? 360-angleToMouse : -angleToMouse);

    let referenceAngle = angleToMouse360;
    if (referenceAngle > 90 && referenceAngle < 180) referenceAngle = 180 - referenceAngle;
    if (referenceAngle > 180 && referenceAngle < 270) referenceAngle = referenceAngle - 180;
    if (referenceAngle > 270 && referenceAngle < 360) referenceAngle = 360 - referenceAngle;

    // Graph updates

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

    document.querySelector("#x_label").style.transform = `translate3d(${FINAL_POSITION.x/2}px, 0px, 0px)`;
    document.querySelector("#y_label").style.transform = `translate3d(${FINAL_POSITION.x}px, ${FINAL_POSITION.y/2}px, 0px)`;
    document.querySelector("#x_label").innerText = document.querySelector("#show_x_and_y_labels").checked ? "X" : "";
    document.querySelector("#y_label").innerText = document.querySelector("#show_x_and_y_labels").checked ? "Y" : "";

    var c = document.querySelector("#angle_display");
    var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, 100, 100);
    ctx.strokeStyle = "#ff7451";
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.arc(50, 50, 15, (2 * Math.PI) - (referenceAngle * (Math.PI / 180)), 2 * Math.PI);
    ctx.stroke();
    ctx.strokeStyle = "#ffb951";
    ctx.beginPath();
    ctx.arc(50, 50, 25, (2 * Math.PI) - (angleToMouse360 * (Math.PI / 180)), 2 * Math.PI);
    ctx.stroke()

    // Input updates

    document.querySelector("#angle_input").value = roundToDecimalPlaces(angleToMouse360, 2);

    document.querySelector("#ref_angle_input").value = roundToDecimalPlaces(referenceAngle, 2);

    document.querySelector("#x_input").value = pixelsToUnits(FINAL_POSITION.x);
    document.querySelector("#y_input").value = pixelsToUnits(-FINAL_POSITION.y);

    document.querySelector("#sin_theta_input").value = roundToDecimalPlaces(Math.sin(angleToMouse360 * (Math.PI / 180)), 4);
    document.querySelector("#cos_theta_input").value = roundToDecimalPlaces(Math.cos(angleToMouse360 * (Math.PI / 180)), 4);
    document.querySelector("#tan_theta_input").value = roundToDecimalPlaces(Math.tan(angleToMouse360 * (Math.PI / 180)), 4);
}

function isMouseInGraph() {
    const graphWindow = document.querySelector("#graph_window");
    const rect = graphWindow.getBoundingClientRect();
    return mousePos.x >= rect.left && mousePos.x <= rect.left + rect.width && mousePos.y >= rect.top && mousePos.y <= rect.top + rect.height;
}