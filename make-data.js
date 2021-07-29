let x; // Currency
let lastLogin;
let flowerPots= {};
let boost;
let dps;
let visitors=[];
let tbs;
let purchaseMode;
let butterflyMsg;

var now= new Date();
var nowNow= Date.now();

let datatypes=[{name: "tablespace", var: tbs, val: 0}, {name: "purchaseMode", var: purchaseMode, val: 'purchase'}, {name: "drops", var: x, val: 10}, {name: "dps", var: dps, val: 0}, {name: "boost", var: boost, val: 1}, {name: "lastOn", var: lastLogin, val: now},{name: "butterflyMsg", var: butterflyMsg, val: 'Welcome to your sunroom. Buy a dandelion, get dewdrops, and use those dewdrops to get more flowers to attract more butterflies!|'}];

// Make this a looping function eventually.
function buildData(){

    if (localStorage.getItem("drops")){
            // console.log("Has inventory");
            x = (localStorage.getItem("drops"));
        } else{
            // console.log("No inventory")
            x= 10;
        }
        localStorage.setItem("drops", x);
    if (localStorage.getItem("dps")){
            // console.log("Has inventory");
            dps = (localStorage.getItem("dps"));
        } else{
            // console.log("No inventory")
            dps= 0;
        }
        localStorage.setItem("dps", dps);
    if (localStorage.getItem("boost")){
            // console.log("Has inventory");
            boost = (localStorage.getItem("boost"));
        } else{
            // console.log("No inventory")
            boost= 1;
        }
        localStorage.setItem("boost", boost);
    if (localStorage.getItem("tablespace")){
            // console.log("Has inventory");
            tbs = (localStorage.getItem("tablespace"));
        } else{
            // console.log("No inventory")
            tbs= 0;
        }
        localStorage.setItem("tablespace", tbs);
        if (localStorage.getItem("butterflyMsg")){
                // console.log("Has inventory");
                butterflyMsg = (localStorage.getItem("butterflyMsg"));
            } else{
                // console.log("No inventory")
                butterflyMsg= 'Welcome to your sunroom. Buy a dandelion, get dewdrops, and use those dewdrops to get more flowers to attract more butterflies!|';
            }
            localStorage.setItem("butterflyMsg", butterflyMsg);

    // Set Flower count.
    let setFlower;
    for (i in flowers){
        let currentFlower= flowers[i];
        if (localStorage.getItem(currentFlower.name)){
                // console.log("Has inventory");
                setFlower = (localStorage.getItem(currentFlower.name));
            } else{
                // console.log("No inventory")
                setFlower= 0;
            }
            localStorage.setItem(currentFlower.name, setFlower);
            // console.log(`${currentFlower.name}: ${setFlower}`);
    }
    let setButterfly;
    for (i in butterflies){
        let currentBF= butterflies[i];
        if (localStorage.getItem(currentBF.name)){
                // console.log("Has inventory");
                setButterfly = (localStorage.getItem(currentBF.name));
            } else{
                // console.log("No inventory")
                setButterfly= 0;
            }
            localStorage.setItem(currentBF.name, setButterfly);
            // console.log(`${currentBF.name}: ${setButterfly}`);
    }
}
