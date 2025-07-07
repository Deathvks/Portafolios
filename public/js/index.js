document.addEventListener('DOMContentLoaded', () => {
  // --- Animación de secciones al hacer scroll ---
  const sectionsToAnimate = document.querySelectorAll('.fade-in-section');
  if (sectionsToAnimate.length > 0) {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });

    sectionsToAnimate.forEach(section => {
      observer.observe(section);
    });
  }

  // --- Funcionalidad para copiar teléfono ---
  const phoneLink = document.getElementById('phone-link');
  if (phoneLink) {
    const phoneNumber = '+34722813535';

    phoneLink.addEventListener('click', (event) => {
      event.preventDefault();
      navigator.clipboard.writeText(phoneNumber).then(() => {
        const notification = document.createElement('div');
        notification.textContent = '¡Teléfono copiado al portapapeles!';

        Object.assign(notification.style, {
          position: 'fixed',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '12px 25px',
          backgroundColor: 'rgba(30, 30, 40, 0.85)',
          color: '#e5e7eb',
          borderRadius: '10px',
          zIndex: '1000',
          boxShadow: '0 5px 20px rgba(0, 0, 0, 0.25)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          transition: 'opacity 0.4s ease, transform 0.4s ease',
          opacity: '0',
          transform: 'translate(-50%, 10px)'
        });
        
        document.body.appendChild(notification);

        setTimeout(() => {
          notification.style.opacity = '1';
          notification.style.transform = 'translate(-50%, 0)';
        }, 20);

        setTimeout(() => {
          notification.style.opacity = '0';
          notification.style.transform = 'translate(-50%, 10px)';
          setTimeout(() => {
            document.body.removeChild(notification);
          }, 400);
        }, 3000);

      }).catch(err => {
        console.error('Error al intentar copiar el número de teléfono:', err);
      });
    });
  }

  // --- Lógica del Navbar y Menú Móvil ---
  const navbar = document.getElementById('navbar');
  const menuButton = document.getElementById('mobile-menu-button');
  const navbarMenu = document.getElementById('navbar-menu');

  if (navbar) {
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      // Lógica para mostrar/ocultar la barra de navegación
      if (scrollTop > lastScrollTop && scrollTop > 150) {
        // Scroll hacia abajo
        navbar.style.opacity = '0';
        navbar.style.transform = 'translateY(-100%)';
      } else {
        // Scroll hacia arriba
        if (scrollTop > 150) {
          navbar.style.opacity = '1';
          navbar.style.transform = 'translateY(0)';
        } else {
           navbar.style.opacity = '0';
           navbar.style.transform = 'translateY(-100%)';
        }
      }
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Evita valores negativos
    });
  }

  if (menuButton && navbarMenu) {
    const menuIcon = menuButton.querySelector('i');
    const menuLinks = navbarMenu.querySelectorAll('a');

    const toggleMenu = () => {
      const isActive = navbarMenu.classList.toggle('is-active');
      menuButton.setAttribute('aria-expanded', isActive);

      // Cambia el icono y gestiona el scroll del body
      if (isActive) {
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-times');
        document.body.style.overflow = 'hidden';
      } else {
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
        document.body.style.overflow = '';
      }
    };

    menuButton.addEventListener('click', toggleMenu);

    // Cierra el menú al hacer clic en un enlace
    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navbarMenu.classList.contains('is-active')) {
          toggleMenu();
        }
      });
    });
  }
});