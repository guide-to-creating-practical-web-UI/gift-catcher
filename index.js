var movedLocation = {
    x: 0,
    y: 0,
};
var keyPressEventHandler = function (event) {
    var baedal = document.querySelector(".baedal");
    if (!baedal) {
        return;
    }
    if (event.code === "KeyW") {
        // Move top
        movedLocation.y -= 30;
        baedal.style.top = "calc(50vh - 48px + ".concat(movedLocation.y, "px)");
    }
    if (event.code === "KeyA") {
        // Move left
        movedLocation.x -= 30;
        baedal.style.left = "calc(50vw - 48px + ".concat(movedLocation.x, "px)");
    }
    if (event.code === "KeyS") {
        // Move right
        movedLocation.y += 30;
        baedal.style.top = "calc(50vh - 48px + ".concat(movedLocation.y, "px)");
    }
    if (event.code === "KeyD") {
        // Move down
        movedLocation.x += 30;
        baedal.style.left = "calc(50vw - 48px + ".concat(movedLocation.x, "px)");
    }
    checkCollision();
};
var createRandomLocation = function () {
    var randomX = Math.floor(Math.random() * (window.innerWidth - 64));
    var randomY = Math.floor(Math.random() * (window.innerHeight - 64));
    while (randomX < 200 && randomY < 100) {
        randomX = Math.floor(Math.random() * (window.innerWidth - 64));
        randomY = Math.floor(Math.random() * (window.innerHeight - 64));
    }
    return {
        x: randomX,
        y: randomY,
    };
};
var createGift = function () {
    var gift = document.createElement("img");
    gift.src = "images/gift.png";
    var randomLocation = createRandomLocation();
    gift.style.position = "absolute";
    gift.style.left = "".concat(randomLocation.x, "px");
    gift.style.top = "".concat(randomLocation.y, "px");
    gift.classList.add("gift");
    document.body.appendChild(gift);
};
var gameState = "idle";
var remainingTime = 30;
var clearGift = function () {
    var gifts = document.querySelectorAll(".gift");
    gifts.forEach(function (gift) {
        gift.remove();
    });
};
var showTimer = function (remain) {
    var timer = document.querySelector(".time");
    if (!timer)
        return;
    timer.innerHTML = remain.toString();
};
var score = 0;
var showScore = function (score) {
    var scoreElement = document.querySelector(".count");
    if (!scoreElement)
        return;
    scoreElement.innerHTML = score.toString();
};
var checkCollision = function () {
    var baedal = document.querySelector(".baedal");
    var gifts = document.querySelectorAll(".gift");
    if (!baedal)
        return;
    gifts.forEach(function (gift) {
        var baedalRect = baedal.getBoundingClientRect();
        var giftRect = gift.getBoundingClientRect();
        if (baedalRect.left < giftRect.right &&
            baedalRect.right > giftRect.left &&
            baedalRect.top < giftRect.bottom &&
            baedalRect.bottom > giftRect.top) {
            score += 1;
            gift.remove();
        }
    });
    showScore(score);
};
var toggleModalDisplay = function () {
    var modal = document.querySelector(".modal_container");
    var result = document.querySelector(".result");
    if (!modal || !result)
        return;
    result.innerHTML = score.toString();
    modal.classList.toggle("hidden");
};
var startGame = function () {
    var timer = setInterval(function () {
        remainingTime -= 1;
        createGift();
        showTimer(remainingTime);
        if (remainingTime <= 0) {
            clearInterval(timer);
            clearGift();
            gameState = "end";
            score = 0;
            toggleModalDisplay();
        }
    }, 1000);
};
var handleRestart = function () {
    remainingTime = 30;
    showTimer(remainingTime);
    gameState = "playing";
    movedLocation.x = 0;
    movedLocation.y = 0;
    toggleModalDisplay();
    startGame();
};
window.addEventListener("load", function () {
    var body = document.querySelector("body");
    body === null || body === void 0 ? void 0 : body.addEventListener("keypress", keyPressEventHandler);
    var restartButton = document.querySelector(".restart");
    restartButton === null || restartButton === void 0 ? void 0 : restartButton.addEventListener("click", handleRestart);
    gameState = "playing";
    showTimer(remainingTime);
    startGame();
});
