// Occasionally, flowers classified as weeds will overtake other flowers.

// Step one: Every few minutes, the game will check for the amount of weeds in the garden. Every weed increases probability.
// Step two: Look for other non-weed flowers.
// If they have non-weed flowers: Replace one.
// If not: Populate?

var willReplace;

function flowerCheck(){
    for (i in flowers){
        if (parseInt(localStorage.getItem(flowers[i].name)) > 0){
            if (flowers[i].isWeed == true){
                // The flower's spawn is in the butterfly's array.
                if (probability(.2 + (parseInt(localStorage.getItem(flowers[i].name))/100))){
                    // Look for non-weeds.
                    willReplace= true;
                }
            }

            if (willReplace == true && localStorage.getItem(flowers[i].name) > 0 && flowers[i].isWeed == false ){
                let flowerQuant= parseInt(localStorage.getItem(flowers[i].name));
                let flowerBoost= parseInt(flowers[i].boost);
                let flowerDPS= parseInt(flowers[i].prize);
                let currDPS= parseInt(localStorage.getItem("dps"));
                let currBoost= parseInt(localStorage.getItem("boost"));
                localStorage.setItem(flowers[i].name, flowerQuant-=1);
                let dandQuant= parseInt(localStorage.getItem("Dandelion"));
                localStorage.setItem("Dandelion", dandQuant +=1);
                localStorage.setItem("boost", currBoost /= flowerBoost);
                localStorage.setItem("dps", currDPS -= flowerDPS);
                document.getElementById("boost").innerHTML = Math.floor((localStorage.getItem("boost")));
                document.getElementById("dps").innerHTML = (localStorage.getItem("dps"));
                localStorage.setItem("butterflyMsg", `<strong>Oh no!!</strong> A weed in the garden has begun taking over other plants! Try <span class="hint">buying non-weed plants</span> so no other flowers get choked out!`);
                // iterate("tablespace", -1);
                clearTable("inv");
                displayInv();
                displayMsg();
                return "Flower got eaten by weeds";
            }
        }
    }
}
