window.addEventListener('scroll', onScroll)

onScroll()
function  onScroll() {
    showNavOnScroll()
    colorToggle()
    showBackToTopButtonOnScroll()

    activateMenuAtCurrentSection(home)
    activateMenuAtCurrentSection(services)
    activateMenuAtCurrentSection(about)
    activateMenuAtCurrentSection(testimonials)
    activateMenuAtCurrentSection(contact)
}

function activateMenuAtCurrentSection(section) {
    //linha alvo
    const targetLine = scrollY + innerHeight / 2

    //verificar se a seção passou da linha
    //quais dados vou precisar?

    //o topo da seção
    const sectionTop = section.offsetTop

    //a altura da seção
    const sectionHeight = section.offsetHeight

    //o topo da seção cehgou ou ultrapassou da linha alvo
    const sectionTopReachOrPassedTargetline = targetLine >= sectionTop

    //informações dos dados e da lógica
    console.log('O topo da seção chegou ou passou da linha?', sectionTopReachOrPassedTargetline)

    //verificar se a base está abaixo da linha alvo 
    //qauis dados vou precisar?

    //a seção termina onde?
    const sectionEndsAt = sectionTop + sectionHeight

    //final da seção passou da linha alvo 
    const sectionEndPassedTargetline = sectionEndsAt <= targetLine

    console.log('O fundo da seção passou da linha?', sectionEndPassedTargetline)

    //limites da seção
    const sectionBoundaries =
    sectionTopReachOrPassedTargetline &&
    !sectionEndPassedTargetline

    const sectionId = section.getAttribute('id')
    const menuElement = document
    .querySelector(`.menu a[href*=${sectionId}]`)

    menuElement.classList.remove('active')
    if (sectionBoundaries) {
        menuElement.classList.add('active')
    }
}

function showNavOnScroll() {
    if (scrollY > 0) {
        navigation.classList.add('scroll')
    }else{
        navigation.classList.remove('scroll')
    }
}

function colorToggle() {
    if (scrollY > 0) {
        color.classList.add('scrolling')
    }else{
        color.classList.remove('scrolling')
    }
}

function showBackToTopButtonOnScroll() {
    if (scrollY > 550) {
        backToTopButton.classList.add('show')
    }else{
        backToTopButton.classList.remove('show')
    }
}

function openMenu() {
    document.body.classList.add('menu-expanded')
}

function closeMenu() {
    document.body.classList.remove('menu-expanded')
}

ScrollReveal({
    origin: 'top',
    distance: '30px',
    duration: 700,
}).reveal(`
#home,
#home img,
#home .stats,
#services,
#services header,
#services .card,
#about,
#about header,
#about .content,
#testimonials,
#testimonials header,
#testimonials .testimonial`);

/* Testimonials carousel slider swiper */
const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    pagination: {
        el: '.swiper-pagination'
    },
    mousewheel: true,
    keyboard: true,
    breakpoints: {
        1024: {
            slidesPerView: 2,
            setWrapperSize: true,
        }
    }
});

/* DARK MODE*/

const html = document.querySelector("html")
const checkbox = document.querySelector("input[name=theme]")

const getStyle = (element, style) => 
    window
        .getComputedStyle(element)
        .getPropertyValue(style)


const initialColors = {
    primaryColor: getStyle(html, "--primary-color"),
    headline: getStyle(html, "--headline"),
    paragraph: getStyle(html, "--paragraph"),
    brandBeige: getStyle(html, "--brand-beige"),
    brandBeige2: getStyle(html, "--brand-beige-2"),
    brandLight: getStyle(html, "--brand-light"),
    brandLight2: getStyle(html, "--brand-light-2"),
    brandDark: getStyle(html, "--brand-dark"),
    bgLight: getStyle(html, "--bg-light"),
}

const darkMode = {
    primaryColor: "black",
    headline: "black",
    paragraph: "black",
    brandBeige: "white",
    brandBeige2: "white",
    brandLight: "white",
    brandLight2: "black",
    brandDark: "white",
    bgLight: "white",
}

const transformKey = key => 
    "--" + key.replace(/([A-Z])/, "-$1").toLowerCase()


const changeColors = (colors) => {
    Object.keys(colors).map(key => 
        html.style.setProperty(transformKey(key), colors[key]) 
    )
}


checkbox.addEventListener("change", ({target}) => {
    target.checked ? changeColors(darkMode) : changeColors(initialColors)
})