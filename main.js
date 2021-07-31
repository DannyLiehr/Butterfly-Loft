Object.size = function(obj) {
  var size = 0,
    key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};

var now= new Date();
var nowNow= Date.now();

let shop= document.querySelector('#shoppe');
let inv= document.querySelector('#inv');
let buttF= document.querySelector('#butterfly');




// Initialising localStorage values.

function initGame(){
    buildData();
    document.getElementById("boost").innerHTML = boost;
    document.getElementById("dps").innerHTML = dps;
    // console.log(flowerPots);
}

// Event Listeners
document.getElementById('restart').addEventListener("click", function(){
    localStorage.clear();
    clearTable("inv");
    initGame();
    displayInv();
    document.getElementById("count").innerHTML = Math.floor((localStorage.getItem("drops"))).toLocaleString();
    document.getElementById("boost").innerHTML = boost.toFixed(2);
    document.getElementById("dps").innerHTML = dps.toFixed(2);
    document.getElementById("tbs").innerHTML = tbs;
    displayMsg();
});



// Functions

function drpt(){
    iterate("drops", (parseFloat(localStorage.getItem("dps")).toFixed(2) * parseInt(localStorage.getItem("boost"))));
}

var dropl;
function growDrops(){
    if (typeof dropl == 'undefined'){
        // console.log(`Start growth`);
        dropl= setInterval(drpt, SECONDS * 1);
    } else {
        // console.log(`Already began growth.`);
        clearInterval(dropl);
        dropl= setInterval(drpt, SECONDS * 1);
    }

}


function iterate(data, num){
    let currBal= parseFloat(localStorage.getItem(data));

    if (data=="boost"){
        localStorage.setItem(data, currBal *= num);
    } else {
        localStorage.setItem(data, currBal += num);
    }

    buildShop();
    switch(data){
        case "drops":
            // console.log("drops", localStorage.getItem("drops"));
            document.title = `Butterfly Loft (${Math.floor(parseFloat(localStorage.getItem("drops")))} dewdrops)`;
            document.getElementById("count").innerHTML = Math.floor(parseFloat(localStorage.getItem("drops")));
        break;
        case "dps":
            document.getElementById("dps").innerHTML = (localStorage.getItem("dps"));
        break;
        case "boost":
            document.getElementById("boost").innerHTML = Math.floor((localStorage.getItem("boost")));
        break;
        case "tablespace":
            document.getElementById("tbs").innerHTML = (localStorage.getItem("tablespace"));
        break;
    }
    return num;
}

function toggleShop() {
  var shop = document.getElementById("shoppe");
  var closeS = document.getElementById("closeShop");
  if (shop.style.display === "none") {
    shop.style.display = "block";
    closeS.style.display = "block";
  } else {
    shop.style.display = "none";
    closeS.style.display = "none";
  }
  buildShop();
}

function toggleBuy() {
  var bs = document.getElementById("buysell");
  if (bs.innerHTML === "Buy Mode") {
    bs.innerHTML = "Sell Mode";
    purchaseMode= 'sell';
  } else {
    bs.innerHTML = "Buy Mode";
    purchaseMode= 'purchase';
  }
  localStorage.setItem("purchaseMode", purchaseMode);
  buildShop();
}


// Set up shop. Literally.
var shopArr= Object.assign([]);
for (item in flowers){
    shopArr.push(flowers[item]);
}

function clearTable(name){
    var table = document.getElementById(name);
    var rowCount = table.rows.length;
    for (var i = 1; i < rowCount; i++) {
        table.deleteRow(1);
    }
}


function buildShop(){
    clearTable('shoppe');
    // Iterate through built in flowers

    for (item in shopArr){
        let flw= shopArr[item];
        let stock= shop.getElementsByTagName('tbody')[0] || document.createElement('tbody');
        let row = stock.insertRow(-1);
        // Proceed with populating fields.
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4);
        cell1.innerHTML=`<img src="./img/${flw.image}.png" height="32px" style="vertical-align: middle;">${flw.name}`;
        cell2.innerHTML=`${flw.desc}`;
        cell3.innerHTML=`${(flw.price).toLocaleString()}`;

        cell4.innerHTML=`<button name="${flw.name}" id="${flw.id}" onclick="${purchaseMode}Pot(this)">x1</button>`;

        // console.log(flw.name,flw.id);

        if (purchaseMode=="sell"){
            if (parseInt(localStorage.getItem(flw.name)) <= 0){
                document.getElementById(flw.id).disabled = true;

            } else {
                document.getElementById(flw.id).disabled = false;
            }
        } else if (purchaseMode== "purchase"){
            if ((localStorage.getItem("drops")) < flw.price || localStorage.getItem("tablespace") == 10){
                document.getElementById(flw.id).disabled = true;

            } else {
                document.getElementById(flw.id).disabled = false;
            }
        }

    }
    // ^ End Loop.
    if(localStorage.getItem("tablespace")== 10){
        let row2 = shop.insertRow(0);
        let cell1 = row2.insertCell(0);
        cell1.innerHTML=`<td colspan="4">You are out of space on your table! Sell some flowers. (Coming soon)</td>`;
    }
}

function purchasePot(itm){
    // Localstore based on flower name.
    // Iterate through flower array. If itm.id == flower.id, add one to localStorage.
    for (i in flowers){
        let currFlow= flowers[i];
        if (currFlow.id == itm.id){
            // Add 1 to the flower.
            let flowerNum= parseInt(localStorage.getItem(itm.name));
            localStorage.setItem(itm.name, flowerNum += 1);
            iterate("drops", -(currFlow.price));
            iterate("dps", currFlow.prize);
            iterate("boost", currFlow.boost);
            iterate("tablespace", 1);
            clearTable("inv");
            displayInv();
            break;
        }
    }
}

function sellPot(itm){
    // Work backwards w purchasePot
    for (i in flowers){
        let currFlow= flowers[i];
        if (currFlow.id == itm.id){
            // Add 1 to the flower.
            let flowerNum= parseInt(localStorage.getItem(itm.name));
            localStorage.setItem(itm.name, flowerNum -= 1);
            iterate("drops", +(currFlow.price));
            iterate("dps", -(currFlow.prize));
            localStorage.setItem("boost", (parseFloat(localStorage.getItem("boost"))/currFlow.boost));
            document.getElementById("boost").innerHTML = Math.floor((localStorage.getItem("boost")));
            iterate("tablespace", -1);
            clearTable("inv");
            displayInv();
            break;
        }
    }
}

function displayInv(){
    // For each flower, add a row.
    for (i in flowers){
        if (Object.keys(localStorage).includes(flowers[i].name)){
            if (parseInt(localStorage.getItem(flowers[i].name)) > 0){
                let row = inv.insertRow(-1);
                let cell1 = row.insertCell(0);
                for (let j = 0; j < parseInt(localStorage.getItem(flowers[i].name)); j++){
                    cell1.innerHTML += `<img src="./img/${flowers[i].image}.png" style="position: relative; top:${getRandomInt(-10,10)}" class="sprite-med">`
                }
            }
        }
    }
}

function displayMsg(){
    document.getElementById("bflog").innerHTML = "";
    let msgArr= (localStorage.getItem("butterflyMsg")).split("|");
    for (i in msgArr){
        document.getElementById("bflog").innerHTML += `<p class="ephemeral">${msgArr[i]}</p>`;
        setTimeout(function() {
            $('.ephemeral').fadeOut('slow');
            localStorage.setItem("butterflyMsg", "")
        }, SECONDS *12);
    }
}

function buildBF(){
    var shop = document.getElementById("shoppe");
    var closeS = document.getElementById("closeShop");
    if (shop.style.display === "block"){
        shop.style.display = "none";
        closeS.style.display = "none";
    }
    clearTable('butterfly');
    let stock= buttF.getElementsByTagName('tbody')[0] || document.createElement('tbody');
    // Proceed with populating fields.

    // let row = stock.insertRow(-1);

    for (i in butterflies){
        let row = stock.insertRow(-1);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        if (parseInt(localStorage.getItem(butterflies[i].name)) > 0){
            // They have at least one of them.
            cell1.innerHTML= `<img src="./img/${butterflies[i].image}.png" class="sprite"> ${butterflies[i].name}`;
            cell2.innerHTML= `<em>${butterflies[i].desc}</em>`;
        } else {
            cell1.innerHTML= `<img src="./img/butterfly_locked.png" class="sprite"> ???`;
            cell2.innerHTML= `<em>You haven't seen this butterfly yet.</em>`;
        }
    }

}

function toggleBF() {
  var butterf = document.getElementById("butterfly");
  var closeB = document.getElementById("closeButterfly");
  if (butterf.style.display === "none") {
    butterf.style.display = "block";
    closeB.style.display = "block";
  } else {
      butterf.style.display = "none";
      closeB.style.display = "none";
  }
  buildBF();
}

function butterflySpawner(){
    // Step 1: Grab a butterfly.
    // Step 2: Is this butterfly's spawnswith array including any owned flowers?
    // If yes:
    //     probability(butterfly.rarity), if it doesn't return false then spawn a butterfly.
    // Else:
    //     pass\
    let chosenBF= randomise(butterflies);
    let tempOne = Object.assign([]);
    for (i in flowers){
        if (parseInt(localStorage.getItem(flowers[i].name)) > 0){
            if ((chosenBF.spawnswith).includes(flowers[i].id)){
                // The flower's spawn is in the butterfly's array.
                if (probability(chosenBF.rarity)){
                    // Spawn the butterfly.
                    let butterFQuant= parseInt(localStorage.getItem(chosenBF.name));
                    localStorage.setItem(chosenBF.name, butterFQuant+=1);
                    iterate("drops", chosenBF.prize);
                    localStorage.setItem("butterflyMsg", `<img src="./img/${chosenBF.image}.png" class="element-animation sprite"> <strong>${chosenBF.flavour}</strong> A ${chosenBF.name} visited your garden! ${randomise(['He', 'She', 'They', 'It', 'Xe'])} left you a gift of ${chosenBF.prize} dewdrops!`);
                    buildBF();
                    displayMsg();
                }
            }
        }
    }
    // if ((chosenBF.spawnswith).includes)
}
