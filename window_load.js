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
    document.getElementById("count").innerHTML = x.toLocaleString();
    document.getElementById("tbs").innerHTML = tbs;

};
