(function () {
    var spokes = '';
    for (var i = 0; i < 24; i++) {
        spokes += '<line x1="100" y1="100" x2="100" y2="10" transform="rotate(' + (i * 15) + ' 100 100)"/>';
    }

    var loader = document.createElement('div');
    loader.id = 'page-loader';
    loader.innerHTML =
        '<svg class="loader-chakra" width="120" height="120" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">' +
            '<circle cx="100" cy="100" r="90" fill="none" stroke="#FFD700" stroke-width="4" opacity="0.6"/>' +
            '<circle cx="100" cy="100" r="55" fill="none" stroke="#FFD700" stroke-width="2" opacity="0.5"/>' +
            '<circle cx="100" cy="100" r="8" fill="#FFD700" opacity="0.8"/>' +
            '<g stroke="#FFD700" stroke-width="2" opacity="0.6">' + spokes + '</g>' +
        '</svg>' +
        '<div class="loader-text">Incredible India</div>';

    document.body.prepend(loader);

    setTimeout(function () {
        loader.classList.add('loader-hide');
        loader.addEventListener('transitionend', function () {
            loader.remove();
        });
    }, 1500);
})();


(function () {
    var burger = document.querySelector('.burger');
    var navLinks = document.querySelector('.nav-links');
    var navbar = document.querySelector('.navbar');

    if (!burger || !navLinks) return;

    burger.addEventListener('click', function () {
        navLinks.classList.toggle('nav-open');
        burger.classList.toggle('burger-active');
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            navLinks.classList.remove('nav-open');
            burger.classList.remove('burger-active');
        });
    });

    document.addEventListener('click', function (e) {
        if (navbar && !navbar.contains(e.target)) {
            navLinks.classList.remove('nav-open');
            burger.classList.remove('burger-active');
        }
    });
})();


(function () {
    var navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
})();


(function () {
    var form = document.getElementById('contact-form');
    if (!form) return;

    var successEl = document.getElementById('form-success');
    var errorEl = document.getElementById('form-error');
    var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function setFieldError(fieldId, hasError) {
        var field = document.getElementById(fieldId);
        if (!field) return;
        field.style.borderBottomColor = hasError ? 'rgba(255, 80, 80, 0.9)' : 'rgba(255, 255, 255, 0.15)';
    }

    ['name', 'subject', 'email', 'message'].forEach(function (id) {
        var el = document.getElementById(id);
        if (el) {
            el.addEventListener('input', function () {
                setFieldError(id, false);
            });
        }
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        var nameVal    = (document.getElementById('name').value    || '').trim();
        var subjectVal = (document.getElementById('subject').value || '').trim();
        var emailVal   = (document.getElementById('email').value   || '').trim();
        var messageVal = (document.getElementById('message').value || '').trim();

        var valid = true;

        if (!nameVal)                           { setFieldError('name',    true); valid = false; }
        if (!subjectVal)                        { setFieldError('subject', true); valid = false; }
        if (!emailVal || !emailRe.test(emailVal)) { setFieldError('email',  true); valid = false; }
        if (!messageVal)                        { setFieldError('message', true); valid = false; }

        if (!valid) {
            if (errorEl)   errorEl.style.display   = 'block';
            if (successEl) successEl.style.display = 'none';
            return;
        }

        if (errorEl)   errorEl.style.display   = 'none';
        if (successEl) successEl.style.display = 'block';
        form.reset();
        ['name', 'subject', 'email', 'message'].forEach(function (id) { setFieldError(id, false); });

        setTimeout(function () {
            if (successEl) successEl.style.display = 'none';
        }, 6000);
    });
})();


(function () {
    var elements = document.querySelectorAll('.reveal');
    if (!elements.length) return;

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    elements.forEach(function (el) { observer.observe(el); });
})();


(function () {
    var current = window.location.pathname.split('/').pop() || 'index.html';

    document.querySelectorAll('.nav-links a').forEach(function (link) {
        if (link.getAttribute('href') === current) {
            link.classList.add('active');
        }
    });
})();


document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
        var target = document.getElementById(anchor.getAttribute('href').slice(1));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
