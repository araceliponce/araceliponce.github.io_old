// not in index.html   <script src="https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.19.0/matter.min.js"></script> 


{/* <script> */}
  document.addEventListener("DOMContentLoaded", function () {

  const navigationLinks = document.querySelectorAll('.desktop .is-a-link');

  function removeActiveClass() {
    navigationLinks.forEach((link) => {
      link.classList.remove('is-active');
    });
  }

  function addActiveClass(clickedLink) {
    clickedLink.classList.add('is-active');
  }

  function updateActiveLink() {
    const sections = document.querySelectorAll('section');
    let currentSectionId = '';
  const margin = 120; // Para activar la sección un poco antes

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top - margin <= 0 && rect.bottom + margin >= 0) {
      currentSectionId = section.id;
    }
  });

      //Remueve .is-active de los demas links y la añade al link que referencia a la seccion actual
      removeActiveClass();

    navigationLinks.forEach((link) => {
      if (link.getAttribute('href').substring(1) === currentSectionId) {
        link.classList.add('is-active');
      }
    });
  }


  let animationFrameId = null;
  function handleScroll() {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }

    animationFrameId = requestAnimationFrame(updateActiveLink);
  }

  window.addEventListener('scroll', handleScroll);

  // Llamado en domload
  updateActiveLink();
});




// </script>

  // <script>
    // Define the media query for a min-width of 768px
    const mediaQuery = window.matchMedia('(min-width: 768px)');

    function handleMediaQueryChange(event) {
      // if window width is at least 768px
      if (event.matches) {
        // and if the body has the class .nav-is-visible
        if (document.body.classList.contains('nav-is-visible')) {
          // Remove it
          document.body.classList.remove('nav-is-visible');
        }
      }
    }

    // Add a listener to the media query
    mediaQuery.addListener(handleMediaQueryChange);

    // Initial check when the script runs
    handleMediaQueryChange(mediaQuery);



    const CONTROLS = document.querySelectorAll(".btn--custom");
    const UPDATE = ({ x, y }) => {

      const ELEMENT = document.elementFromPoint(x, y);
      const CONTROL = ELEMENT.closest(".btn--custom");
      if (CONTROL) {
        // console.info('doing it')
        const BOUNDS = CONTROL.getBoundingClientRect()
        CONTROL.style.setProperty("--rx", (x - BOUNDS.x) / BOUNDS.width);
        CONTROL.style.setProperty("--x", (x - BOUNDS.x) / BOUNDS.width);
        CONTROL.style.setProperty("--y", (y - BOUNDS.y) / BOUNDS.height);
      }
    };

    document.body.addEventListener("pointermove", UPDATE);

  // </script>


  // <script>
    /* Threshold is a number between 0 and 1, that represents the viewable area of the target element in the screen. For example, 0 represents no area of element is visible. A value of 0.10 represents about 10% area is viewable in the screen. Value of 1 means element is fully viewable in the screen. */


    const schemas = ['spring', 'summer', 'fall', 'winter'];
    let contenedor, elementos;

 
    window.addEventListener('DOMContentLoaded', () => {
      const canHover = !(matchMedia('(hover: none)').matches);
      if (canHover) {
        document.body.classList.add('can-hover');
      }



      contenedor = document.querySelector('#colors');
      elementos = document.querySelectorAll('#colors>*');
      // console.log(elementos)

      // If body is .can-hover listen to click, if not then watchs wich one is visible on scroll

      if (document.body.classList.contains('can-hover')) {
        // console.log('body can hover')
        elementos.forEach(el => {
          el.addEventListener('click', () => {
            // alert('click')

            // console.log(el.classList); // "media-group", "winter"
            document.body.className = el.classList[1] + ' can-hover';
          });
        });

      } else {

        detectVisibleElement();
        contenedor.addEventListener('scroll', detectVisibleElement);
      }




      // btn toggle for nav
      const navToggle = document.getElementById('navToggle');
      if (navToggle) {
        navToggle.addEventListener('click', () => {
          document.body.classList.toggle('nav-is-visible')
        })
      }


    });






    function detectVisibleElement() {
      const containerRect = contenedor.getBoundingClientRect();
      elementos.forEach((element, index) => {
        const elementRect = element.getBoundingClientRect();
        if (
          elementRect.left >= containerRect.left &&
          elementRect.right <= containerRect.right
        ) {
          // alert(`Elemento ${index + 1} es visible.`);
          // console.log(`Elemento ${index + 1} es visible.`);
          document.body.className = schemas[index] + ' can-hover';
         

        }
      });
    }










  // </script>