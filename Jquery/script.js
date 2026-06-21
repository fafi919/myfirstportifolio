$(document).ready(function(){
    const typingText = "I create interactive, user-friendly web experiences.";
    let i = 0;
    const speed = 50;
    
    function typeWriter() {
        if (i < typingText.length) {
            document.getElementById("typed-text").innerHTML = typingText.substring(0, i + 1);
            i++;
            setTimeout(typeWriter, speed);
        } else {
            setInterval(() => {
                $('.typing-cursor').toggle();
            }, 500);
        }
    }
    
    setTimeout(typeWriter, 1000);

    function initProfileEffects() {
        console.log("Profile effects initialized");
        
        $('.profile-img-container').each(function() {
            const $container = $(this);
            const $p1 = $container.find('.particle-1');
            const $p2 = $container.find('.particle-2');
            const $p3 = $container.find('.particle-3');
            const $p4 = $container.find('.particle-4');
            const $inner = $container.find('.inner-ring');
            const $code = $container.find('.code-ring');
            let raf = null;

            $container.on('mousemove', function(e) {
                const offset = $container.offset();
                const w = $container.width();
                const h = $container.height();
                const mouseX = e.pageX - offset.left;
                const mouseY = e.pageY - offset.top;

                const nx = (mouseX / w - 0.5) * 2;
                const ny = (mouseY / h - 0.5) * 2;

                if (raf) cancelAnimationFrame(raf);
                raf = requestAnimationFrame(() => {
                    $p1.css('transform', `translate(${nx * 6}px, ${ny * 6}px)`);
                    $p2.css('transform', `translate(${-nx * 4}px, ${-ny * 4}px)`);
                    $p3.css('transform', `translate(${ny * 5}px, ${-nx * 5}px)`);
                    $p4.css('transform', `translate(${-ny * 2}px, ${nx * 2}px)`);

                    const rotateDegree = nx * 12; 
                    $inner.css({
                        'transform': `rotate(${rotateDegree}deg)`,
                        'transition': 'transform 0.12s linear'
                    });
                });
            });

            $container.on('mouseleave', function() {
                if (raf) cancelAnimationFrame(raf);
                $container.find('.glow-particle').css({
                    'transform': 'translate(0,0)',
                    'transition': 'transform 0.4s ease'
                });
                $inner.css({
                    'transform': 'rotate(0deg)',
                    'transition': 'transform 0.6s ease'
                });
            });

            $container.on('click', function() {
                createProfileRipple($container);

                $code.css({
                    'box-shadow': '0 0 120px rgba(64, 156, 255, 0.6)'
                });

                setTimeout(function() {
                    $code.css({
                        'box-shadow': 'inset 0 0 50px rgba(64, 156, 255, 0.3), 0 0 60px rgba(64, 156, 255, 0.2)'
                    });
                }, 800);
            });
        });
    }
    
    function createProfileRipple(container) {
        var ripple = $('<div class="profile-ripple"></div>');
        container.append(ripple);
        
        ripple.css({
            'position': 'absolute',
            'width': '10px',
            'height': '10px',
            'background': 'radial-gradient(circle, rgba(64, 156, 255, 0.8) 0%, transparent 70%)',
            'border-radius': '50%',
            'top': '50%',
            'left': '50%',
            'transform': 'translate(-50%, -50%)',
            'z-index': 2,
            'pointer-events': 'none'
        });
        
        ripple.animate({
            width: '350px',
            height: '350px',
            opacity: 0
        }, 1200, function() {
            $(this).remove();
        });
    }
    
    initProfileEffects();
    
    $('head').append('<style>.profile-ripple { transition: all 1s ease; }</style>');
    
    $(document).keydown(function(e) {
        if (e.ctrlKey && e.key === 'b') { 
            e.preventDefault();
            $('.code-ring').toggleClass('enhanced');
        }
    });
    
    $('head').append(`
        <style>
            .code-ring.enhanced {
                animation-duration: 2s !important;
                box-shadow: 
                    inset 0 0 100px rgba(64, 156, 255, 0.6),
                    0 0 150px rgba(64, 156, 255, 0.5) !important;
            }
        </style>
    `);

    $('.download-cv-btn').on('click', function(e) {
        $(this).css({
            'transform': 'scale(0.95)',
            'transition': 'transform 0.2s'
        });
        
        setTimeout(() => {
            $(this).css('transform', 'scale(1)');
        }, 200);
        
        console.log('Opening CV from Canva...');
    });

    
    $('#contactForm').on('submit', function(e){
        e.preventDefault();
        
        const name = $('#name').val();
        const email = $('#email').val();
        const subject = $('#subject').val();
        const message = $('#message').val();
        
        const submitBtn = $(this).find('button[type="submit"]');
        const originalText = submitBtn.html();
        submitBtn.html('<i class="fas fa-spinner fa-spin me-2"></i>Sending...');
        submitBtn.prop('disabled', true);
        
        setTimeout(() => {
            $('#responseMessage')
                .removeClass('response-error')
                .addClass('response-success')
                .html(`<i class="fas fa-check-circle me-2"></i>Thank you, ${name}! Your message has been sent successfully. I'll get back to you soon.`)
                .fadeIn();
            $(this)[0].reset();
            
            submitBtn.html(originalText);
            submitBtn.prop('disabled', false);
            
            setTimeout(() => {
                $('#responseMessage').fadeOut();
            }, 5000);
            
        }, 1500);
    });

    $('.form-control').on('focus', function() {
        $(this).parent().addClass('focused');
    }).on('blur', function() {
        if ($(this).val() === '') {
            $(this).parent().removeClass('focused');
        }
    });

    function checkScroll() {
        var windowHeight = $(window).height();
        var scrollFromTop = $(window).scrollTop();
        
        $('.scroll-animate').each(function() {
            var elementOffset = $(this).offset().top;

            if (elementOffset < scrollFromTop + windowHeight - 150) {
                $(this).addClass('in-view');
            }
        });
    }

    checkScroll();
    $(window).on('scroll', checkScroll);
    $(window).on('resize', checkScroll);
});

document.addEventListener("scroll", function () {
    const aboutSection = document.getElementById("about");
    const rect = aboutSection.getBoundingClientRect();

    if (rect.top < window.innerHeight * 0.5 && rect.bottom > window.innerHeight * 0.25) {
        document.body.classList.add("about-active");
    } else {
        document.body.classList.remove("about-active");
    }
});

