const colors = {
    "U6": "rgb(154,103,54)",
    "U4": "rgb(0,171,79)",
    "U3": "rgb(255,125,36)",
    "U2": "rgb(160,101,170)",
    "U1": "rgb(255,46,23)"
}

let tooltip = document.getElementById("tooltip");

function showTooltip(text, e) {
    tooltip.innerHTML = text;
    let x = e.clientX + ((e.clientX < window.innerWidth/2) ? (20) : (-(tooltip.getBoundingClientRect().width + 20)));
    tooltip.style = `opacity: 1; left: ${x}px; top: ${e.clientY}px;`;
    tooltip.className = (e.clientX < window.innerWidth/2) ? "right" : "left";
}

function hideTooltip() {
    tooltip.style = "opacity: 0";
}

let stations = document.getElementById("Stations").children;
let stationMap = {};

for (let i = 0; i < stations.length; i++) {
    let station = stations[i];
    stationMap[station.id] = i;

    station.addEventListener('mouseover', (e) => { showTooltip(station.id, e); });
    station.addEventListener('mouseleave', () => { hideTooltip(); });
}

let connections = [];

for (let i = 0; i < stations.length; i++) {
    connections[i] = [];
    for (let j = 0; j < stations.length; j++) {
        connections[i][j] = 0;
    }
}

function addText(text, x, y) {
    let b = document.createElement("b");
    b.innerText = text;
    b.style = `position: absolute;left: ${x}px;top: ${y}px;margin: 0;padding: 0;transform: translate(-50%, -50%);`

    b.addEventListener('mouseover', (e) => { showTooltip(text, e); });
    b.addEventListener('mouseleave', () => { hideTooltip(); });

    document.body.appendChild(b);
}

connections[stationMap["Siebenhirten"]][stationMap["Perfektastraße"]] = 50
connections[stationMap['Perfektastraße']][stationMap["Siebenhirten"]] = 50

connections[stationMap["Landstraße--Bhf.-Wien-Mitte-"]][stationMap["Stadtpark"]] = 20
connections[stationMap['Stadtpark']][stationMap["Landstraße--Bhf.-Wien-Mitte-"]] = 20

connections[stationMap["Tscherttegasse"]][stationMap["Bahnhof-Meidling"]] = 15
connections[stationMap['Bahnhof-Meidling']][stationMap["Tscherttegasse"]] = 15

let uBahnen = document.getElementById("U-bahn").children;

for (let i = 0; i < uBahnen.length; i++) {
    let uBahn = uBahnen[i];
    for (let j = 0; j < uBahn.children.length; j++) {
        let connection = uBahn.children[j];
        let tp = connection.id.split("_")[0];
        let stations = connection.id.split("_")[1];

        let s0 = stations.split(":")[0];
        let s1 = stations.split(":")[1];

        let weight = connections[stationMap[s0]][stationMap[s1]];
        if(weight !== 0) {
            let cr = connection.getBoundingClientRect();
            addText(weight, cr.x+(cr.width/2), cr.y+(cr.height/2));
        }
    }
}