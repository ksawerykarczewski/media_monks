"use strict"
//gspa plugin
gsap.registerPlugin(ScrollTrigger)

//SVG
let heartIcon = document.querySelector(".baseline");
let heartIconPath = document.querySelector(".heart-icon-path-js");

// Player
const video = document.querySelector('.video-js');
const toggle = document.querySelector('.toggle-js');
const player = document.querySelector('.player-js');

const playerButton = document.querySelector('.player__button');
const playIcon = document.querySelector('.play__icon');
const pauseIcon = document.querySelector('.pause__icon');   

const playerButtonOverlay = document.querySelector('.player-overlay-js');   
const playerButtonOutline = document.querySelector('.player-outline-js');
const playerText = document.querySelector('.player-text-js');

let timelinePlayer = gsap.timeline({
    defaults: { ease: "power4.inOut", duration: 1 }
});

function loadingAnimation() {
    let timeline = gsap.timeline({
    defaults: { ease: "power4.inOut", duration: 1.5 }
    });

    timeline.set(heartIcon, { y: 60, opacity: 0 });

    timeline.from('.copy-js', { opacity: 0 });
    timeline.to('.image-hero-js', { 'clip-path': 'polygon(35% 0px, 91% 0px, 91% 33%, 100% 33%, 100% 100%, 0px 100%, 0% 70%, 0px 0px)', opacity: 1 }, '-=1')
    timeline.to('.image-mask-js',{ opacity: 1 }, '-=1');

    timeline.from('.heading-js',{ opacity: 0, y: 20 }, '-=1')
            .to(heartIcon,{ opacity: 1, y: 0 }, '-=1.5')
            .from('.anchor-js', { y: 25 }, '-=1');

    var timelineGlitch = new TimelineMax({repeat: 4, repeatDelay: 1});

    timelineGlitch.to(heartIcon, 0.04, { x:10 })
       .to(heartIconPath, 0.04, { fill: '#012756'})
       .to(heartIcon, 0.04, { x:0 })
       .to(heartIconPath, 0.04, { fill: '#FF2E4A' })

}

function playerControls() {
    timelinePlayer.set(playerButtonOverlay, { scale: 0 });
    timelinePlayer.set(playerButton, { scale: 1 });
    timelinePlayer.set(playerText, { opacity: 0 });

    pauseIcon.style.display = "none";

    function togglePlay() {
        if (video.paused === true) {
            timelinePlayer.to(playerButtonOutline, { scale: 0 })
            .to(playerButtonOverlay, { scale: 1 }, '-=1')
            .to(playerButton, { scale: 0 })
            .to(playerText, { opacity: 0, onComplete: function(){video.play();}}, '-=1');
        } else {
            pauseIcon.style.display = "none";
            playIcon.style.display = "flex";

            timelinePlayer.to(playerButtonOverlay, { scale: 0 })
            .to(playerButton, { scale: 1 }, '-=1')
            .to(playerButtonOutline, { scale: 1 }, '-=1')
            .to(playerText, { opacity: 1, onComplete: function(){video.pause();} }, '-=1');
        }
    }

    function showPauseButton() {
        if (video.paused === false) {
            timelinePlayer.to(playerButton, { scale: 1})
            pauseIcon.style.display = "flex";
            playIcon.style.display = "none";
        }
        else {
            pauseIcon.style.display = "none";
            playIcon.style.display = "flex";
        }
    }

    function hidePauseButton() {
        if (video.paused === false) {
            timelinePlayer.to(playerButton, { scale: 0 });
        }
    }

    //TODO: calc video length to svg circle percentages
    console.log(video.currentTime, video.duration);

    video.addEventListener('click', togglePlay);
    video.addEventListener('mouseover', showPauseButton);
    playerButton.addEventListener('mouseover', showPauseButton);
    video.addEventListener('mouseout', hidePauseButton);
    toggle.addEventListener('click', togglePlay);
}

function scrollObserver() {
    gsap.to('.video-background-js', {
        "clip-path": "polygon(28% 29%, 28% 0%, 100% 0%, 100% 70%, 100% 100%, 100% 100%, 0% 100%, 0% 29%)",
        duration: 2,
        scrollTrigger: {
            trigger: '.video-background-js',
            start: 300
        }
      });
}

loadingAnimation();
playerControls();
scrollObserver();