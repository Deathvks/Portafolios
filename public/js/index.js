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

  // --- Mstrar el Navbar al hacer scroll ---
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.onscroll = function () {
      if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150) {
        navbar.style.opacity = "1";
        navbar.style.transform = "translateY(0)";
      } else {
        navbar.style.opacity = "0";
        navbar.style.transform = "translateY(-100%)";
      }
    };
  }
});