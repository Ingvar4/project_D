gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// If you use default #smooth-wrapper and #smooth-content, then can use just simple:
// let smoother = ScrollSmoother.create();

// Can tie (ex) scew image to velocity values... Might be fun



let rotateSetter = gsap.quickTo('.box-b', 'rotation');
let clamp = gsap.utils.clamp(-360, 360);

let smoother = ScrollSmoother.create({
  wrapper: '#smooth-wrapper',
  content: '#smooth-content',
  smooth: 2, // time for the content to catch up to the scroll position
  smoothTouch: 0.1, // Better not to use it or use a small value
  effects: true, // add some effects \(-_-)/
  // some callbacks
  onStop: () => console.log('stopped'),
  onUpdate: (self) => console.log('velocity', rotateSetter(clamp(self.getVelocity())))
})

const title = document.querySelector('.title');

title.addEventListener('click', e => {
  smoother.scrollTo(
    '.box-c', // element to scroll to, can use specific number (px)
    true, // true = smooth scroll, false = instant
    'bottom 200px' // center of box hits center of viewport
  );
})

const button = document.querySelector('.btn-custom-scroll');

button.addEventListener('click', e => {
  gsap.to(smoother, {
    scrollTop: smoother.offset('.box-c', 'center center'),
    duration: 2,
    ease: 'back.out'
  })
});

smoother.effects('button', {
  speed: 0.9
})

smoother.effects('.title span', {
  lag: (i) => i * 0.1
})

// ScrollTrigger animation
gsap.to('.box-c', {
  rotate: 360,
  scrollTrigger: {
    trigger: '.box-c',
    start: 'center center',
    end: '+=300px', // can skip that
    markers: true,
    scrub: true // connect to the scroll
  }
})

// Pin element
ScrollTrigger.create({
  pin: '.box-d',
  start: 'top center',
  end: '+=300px',
  markers: true
})

// Parallax effect
smoother.effects('.img-parallax img', {
  speed: 'auto'
})

// Toggle a modal 
const modalBtn = document.querySelector('.btn-toggle-modal');
const modal = document.querySelector('.modal');
let isOpen;

modalBtn.addEventListener('click', () => {
  isOpen = !isOpen;
  gsap.to(modal, {
    autoAlpha: isOpen ? 1 : 0
  })
  
  // Toggle smoother
  smoother.paused(isOpen);
});