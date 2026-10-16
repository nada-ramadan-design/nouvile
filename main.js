
const header = document.querySelector(".header");
const nav = document.querySelector("#nav");
const menuToggle = document.querySelector("#menuToggle");

const stars = document.querySelector("#stars");
const moon = document.querySelector("#moon");
const mountain3 = document.querySelector("#mountain3");
const mountain4 = document.querySelector("#mountain4");
const rivers = document.querySelector("#rivers");
const boat = document.querySelector("#boat6");
const mountain7 = document.querySelector("#mountain7");

let ticking = false;

function updateScene() {
    const scrollY = window.scrollY;

    header.classList.toggle("scrolled", scrollY > 40);

    if (stars) {
        stars.style.transform =
            `translate3d(${-scrollY * 0.08}px, ${scrollY * 0.05}px, 0)`;
    }

    if (moon) {
        moon.style.transform =
            `translate3d(0, ${scrollY * 0.28}px, 0)`;
    }

    if (mountain3) {
        mountain3.style.transform =
            `translate3d(0, ${scrollY * 0.12}px, 0)`;
    }

    if (mountain4) {
        mountain4.style.transform =
            `translate3d(0, ${scrollY * 0.08}px, 0)`;
    }

    if (rivers) {
        rivers.style.transform =
            `translate3d(0, ${scrollY * 0.035}px, 0)`;
    }

    if (boat) {
        const boatX = Math.min(scrollY * 0.3, 180);
        const boatY = scrollY * 0.055;

        boat.style.transform =
            `translate3d(${boatX}px, ${boatY}px, 0)`;
    }

    if (mountain7) {
        mountain7.style.transform =
            `translate3d(0, ${scrollY * 0.02}px, 0)`;
    }

    ticking = false;
}

window.addEventListener("scroll", () => {
    if (!ticking) {
        window.requestAnimationFrame(updateScene);
        ticking = true;
    }
}, { passive: true });

window.addEventListener("resize", updateScene);

menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");

        document.querySelectorAll(".nav-link").forEach(item => {
            item.classList.remove("active");
        });

        link.classList.add("active");
    });
});

const sections = document.querySelectorAll(
    "#top, #about, #journey, #contact"
);

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const id = entry.target.id === "top"
                ? "home"
                : entry.target.id;

            document.querySelectorAll(".nav-link").forEach(link => {
                link.classList.toggle(
                    "active",
                    link.getAttribute("href") === `#${id}` ||
                    (id === "home" && link.getAttribute("href") === "#top")
                );
            });
        });
    }, { threshold: 0.45 });

    sections.forEach(section => observer.observe(section));
}

updateScene();
