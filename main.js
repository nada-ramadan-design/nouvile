
const stars = document.getElementById("stars");
const moon = document.getElementById("moon");
const mountain3 = document.getElementById("mountain3");
const mountain4 = document.getElementById("mountain4");
const rivers = document.getElementById("rivers");
const boat6 = document.getElementById("boat6");
const mountain7 = document.getElementById("mountain7");

const title = document.querySelector(".nouvile");
const main = document.querySelector(".main");
const header = document.querySelector("header");

let ticking = false;

function updateScene() {
    const scrollY = window.scrollY;

    // Move the stars slowly
    stars.style.transform =
        `translateX(${-scrollY * 0.12}px)`;

    // Move each layer at a different speed
    moon.style.transform =
        `translateY(${scrollY * 0.35}px)`;

    mountain3.style.transform =
        `translateY(${scrollY * 0.18}px)`;

    mountain4.style.transform =
        `translateY(${scrollY * 0.10}px)`;

    rivers.style.transform =
        `translateY(${scrollY * 0.04}px)`;

    mountain7.style.transform =
        `translateY(${scrollY * 0.02}px)`;

    // Move the boat gently
    const boatX = Math.min(scrollY * 0.35, 180);
    const boatY = scrollY * 0.08;

    boat6.style.transform =
        `translate(${boatX}px, ${boatY}px)`;

    // Grow the title, then fade it out
    const titleSize = Math.min(25 + scrollY * 0.12, 67);

    title.style.fontSize = `${titleSize}px`;

    const opacity = Math.max(
        0,
        1 - Math.max(0, scrollY - 220) / 220
    );

    title.style.opacity = opacity;

    // Change the sky color
    if (scrollY >= 127) {
        main.style.background =
            "linear-gradient(#376281, #10001f)";
    } else {
        main.style.background =
            "linear-gradient(#200016, #10001f)";
    }

    // Make the header look different after scrolling
    header.classList.toggle("scrolled", scrollY > 40);

    ticking = false;
}

window.addEventListener("scroll", function () {
    if (!ticking) {
        window.requestAnimationFrame(updateScene);
        ticking = true;
    }
});

window.addEventListener("resize", updateScene);

// Set the correct scene when the page first opens
updateScene();
