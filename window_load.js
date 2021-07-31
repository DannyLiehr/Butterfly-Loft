window.onload = function() {
    // Just in case...
    clearTable('shoppe');
    initGame();
    displayInv();
    growDrops();
    toggleBuy();
    displayMsg();
    (function loop() {
        var rand = Math.round(Math.random() * ((MINUTES * 2) - (SECONDS * 35)));
        setTimeout(function() {
                //alert('A');
                butterflySpawner();
                loop();
        }, rand);
    }());
    butterflySpawner();
    (function weedLoop() {
        var rand = Math.round(Math.random() * ((MINUTES * 8) - (MINUTES * 2)));
        setTimeout(function() {
                //alert('A');
                flowerCheck();
                weedLoop();
        }, rand);
    }());
    flowerCheck();
    document.title = `Butterfly Loft (${Math.floor(parseFloat(localStorage.getItem("drops")))} dewdrops)`;
    document.getElementById("count").innerHTML = Math.floor((localStorage.getItem("drops"))).toLocaleString();
    document.getElementById("boost").innerHTML = parseInt(boost).toFixed(2);
    document.getElementById("dps").innerHTML = parseInt(dps).toFixed(2);
    document.getElementById("maxSpace").innerHTML = maxS;
};
