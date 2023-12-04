var K_count = 0;

//jméno, cena, produkce, počet
var buildings = [
    ["Kluk", 10, 1, 0],
    ["Klan", 100, 4, 0],
    ["Kult", 1000, 9, 0],
    ["Koncern", 10000, 16, 0]
];

function update_visual_state() {
    document.getElementById("K-count").innerHTML = (Math.round(K_count*10)/10).toString();
}

function generate_shop() {
    var shop = document.getElementById("shop-anchor");
    for (let i = 0; i < buildings.length; i++) {
        let name_div = document.createElement('div');
        name_div.innerHTML = buildings[i][0];

        let info_div = document.createElement('div');
        info_div.innerHTML = "Cost: <span id=\"shop-info-" + i + "\"></span>";

        let button_div = document.createElement('div');
        button_div.innerHTML = "<button id=\"shop-button-" + i + "\"></button>";

        let inner_div = document.createElement('div');
        inner_div.className = "cont shop-item";
        inner_div.style = "flex-basis: 33%; flex-grow: 0;";
        inner_div.appendChild(name_div);
        inner_div.appendChild(info_div);
        inner_div.appendChild(button_div);

        let outer_div = document.createElement('div');
        outer_div.className = "cont center";
        outer_div.appendChild(inner_div); 

        shop.appendChild(outer_div);
    }
}

function update_shop() {
    for (let i = 0; i < buildings.length; i++) {
        document.getElementById("shop-info-" + i).innerHTML = Math.round(buildings[i][1] * 10) / 10;
        document.getElementById("shop-button-" + i).innerHTML = "Count: " + buildings[i][3];
        document.getElementById("shop-button-" + i).onclick = try_buy_generator(i);
    }
}

function production() {
    var delta = 0.1;
    for (let i = 0; i < buildings.length; i++) {
        K_count += buildings[i][2] * buildings[i][3] * delta;
    }
    update_visual_state();
}

function try_buy_generator(id) {
    return function() {
        if (K_count >= buildings[id][1]) {
            K_count -= buildings[id][1];
            buildings[id][1] *= 1.25;
            buildings[id][3] += 1;
        }
    }
}

document.getElementById("K-clicker").onclick = function() {
    K_count += 1;
    update_visual_state();
};

generate_shop();

setInterval(update_shop, 100);
setInterval(production, 100);