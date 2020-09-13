const particlesParams = {
    particles: {
        number: {
            value: 80
        },
        size: {
            value: 3
        }
    },
    interactivity: {
        detect_on: "window",
        events: {
            onhover: {
                enable: true,
                mode: "grab"
            },
            onclick: {
                enable: true,
                mode: "repulse"
            },
            resize: true
        },
        modes:{
            grab: {
                distance: 200,
                line_linked: {
                    opacity: 1
                }
            },
            repulse: {
                distance: 200,
                duration: 0.4
            }
        }
    },
    retina_detect: true
}

export default particlesParams;