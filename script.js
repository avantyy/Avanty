window.onload = function(){
    let imagenInicio = document.getElementById("imagenInicio")
    setTimeout(function() {
        imagenInicio.style.opacity = '0';
    }, 2000);


    function miFuncion() {
        imagenInicio.style.display = 'none';
    }
    
    setTimeout(miFuncion, 4000); 
}


let slideIndex = 0;

document.addEventListener('DOMContentLoaded', function () {
    showSlides();
});

function showSlides() {
    let slides = document.getElementsByClassName('cliente');
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }
    if (slideIndex >= slides.length) {
        slideIndex = 0;
    }
    if (slideIndex < 0) {
        slideIndex = slides.length - 1;
    }
    slides[slideIndex].style.display = 'flex';
}

function changeSlide(n) {
    slideIndex += n;
    showSlides();
}


const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".articu i");
const carouselChildrens = [...carousel.children];

let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to the beginning of the carousel for infinite scrolling
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Insert copies of the first few cards to the end of the carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carousel to the appropriate position to hide the first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.stopPropagation();
        carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
    });
});

const dragStart = (e) => {
    e.preventDefault();
    isDragging = true;
    carousel.classList.add("dragging");
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
    if (!isDragging) return;
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
};

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
};

const infiniteScroll = () => {
    if (carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    } else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }

    clearTimeout(timeoutId);
    if (!wrapper.matches(":hover")) autoPlay();
};

const autoPlay = () => {
    if (window.innerWidth < 800 || !isAutoPlay) return;
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 5000);
};
autoPlay();

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);


const botones = document.querySelectorAll('.lateral');
const secciones = document.querySelectorAll('section');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const seccionId = entry.target.id;

            // Resetea todas las clases 'activo'
            botones.forEach(boton => {
                boton.classList.remove('activo');
            });

            // Agrega la clase 'activo' al botón correspondiente
            const botonActivo = document.querySelector(`.lateral[href="#${seccionId}"]`);
            if (botonActivo) {
                botonActivo.classList.add('activo');
            }
        }
    });
}, { threshold: 0.5 });

// Observa todas las secciones
secciones.forEach(seccion => {
    observer.observe(seccion);
});

// Observa la sección de servicios específicamente
const serviciosSection = document.getElementById('ser');
if (serviciosSection) {
    observer.observe(serviciosSection);
}

// Actualiza la clase 'activo' cuando se hace clic en un enlace
botones.forEach(boton => {
    boton.addEventListener('click', (event) => {
        event.preventDefault();
        const targetId = boton.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);

        // Resetea todas las clases 'activo'
        botones.forEach(b => {
            b.classList.remove('activo');
        });

        // Agrega la clase 'activo' al botón correspondiente
        boton.classList.add('activo');

        // Desplaza la vista a la sección correspondiente
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

