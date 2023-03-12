let svg = document.getElementsByTagName("svg")[0];
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

for (let i = 0; i < stations.length; i++) {
    let station = stations[i];

    station.addEventListener('mouseover', (e) => { showTooltip(station.id, e); });

    station.addEventListener('mouseleave', () => { hideTooltip(); });
}