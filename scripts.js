document.addEventListener('DOMContentLoaded', () => {
    const shapes = [
        { element: document.querySelector('#botticelli-bov polygon'), caption: 'Botticelli\'s Birth of Venus', bottomCaption: 'Detailed view of Venus\'s arrival on the shell' },
        { element: document.querySelector('#botticelli-primavera polygon'), caption: 'Botticelli\'s Primavera', bottomCaption: 'Spring in the Garden of Venus' },
        { element: document.querySelector('#eyck-ga polygon'), caption: 'Van Eyck\'s Ghent Altarpiece', bottomCaption: 'The Adoration of the Mystic Lamb' },
        { element: document.querySelector('#perugino-clc polygon'), caption: 'Perugino\'s Combat of Lust and Chastity', bottomCaption: 'A battle of rightousness versus evil?' },
        { element: document.querySelector('#ghirlandaio-nas polygon'), caption: 'Ghirlandaio\'s The Nativity and Adoration of the Shepherds', bottomCaption: 'The Nativity and Adoration of the Shepherds is blah blah' },
        { element: document.querySelector('#masaccio-eae polygon'), caption: 'Masaccio\'s Expulsion of Adam and Eve', bottomCaption: 'The Expulsion of Adam and Eve is blah blah' },
        { element: document.querySelector('#bellini-esf polygon'), caption: 'Bellini\'s The Ecstasy of Saint Francis', bottomCaption: 'The Ecstasy of Saint Francis is blah blah' },
        { element: document.querySelector('#fra-angelico-nmt polygon'), caption: 'Fra Angelico\'s Nolli Me Tangere', bottomCaption: 'Nolli Me Tangere is blah blah' },
        { element: document.querySelector('#uccello-sgd polygon'), caption: 'Uccello\'s Saint George and the Dragon', bottomCaption: 'Saint George and the Dragon is blah blah' },
        { element: document.querySelector('#lippi-vac polygon'), caption: 'Fillipo Lippi\'s Virgin and the Child', bottomCaption: 'Virgin and the Child is blah blah' },
        { element: document.querySelector('#bellini-smpa polygon'), caption: 'Bellini\'s Saint Mark Preaches in Alexandria', bottomCaption: 'Saint Mark Preaches in Alexandria is blah blah' },
        { element: document.querySelector('#fabriano-aotm polygon'), caption: 'Fabriano\'s Adoration of the Magi', bottomCaption: 'Adoration of the Magi is blah blah' },
        { element: document.querySelector('#giotto-kj polygon'), caption: 'Giotto\'s The Kiss of Judas', bottomCaption: 'The Kiss of Judas is blah blah' },
        { element: document.querySelector('#botticelli-aotm polygon'), caption: 'Botticelli\'s self portrait from The Adoration of the Magi', bottomCaption: 'The Adoration of the Magi is blah blah' },
        { element: document.querySelector('#botticelli-pd polygon'), caption: 'Botticelli\'s Portrait of Dante', bottomCaption: 'Portrait of Dante is blah blah' }
    ];

    const caption = document.getElementById('caption');
    //const bottomCaption = document.getElementById('bottomCaption');
    const magnifier = document.getElementById('magnifier');
    const magnifierRight = document.getElementById('magnifier-right');
    const imageContainer = document.getElementById('imageContainer');
    const gozzoliAotM = document.getElementById('gozzoli-aotm');

    let selectedShape = null; // Track the selected shape

    // Debounce function to improve performance
    function debounce(func, wait) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    shapes.forEach(shape => {
        shape.element.addEventListener('mouseover', () => {
            if (!selectedShape) {
                shape.element.classList.add('highlighted');
                caption.textContent = shape.caption;
                caption.style.opacity = '1';
                bottomCaption.textContent = shape.bottomCaption;
                bottomCaption.style.opacity = '1';
            }
        });

        shape.element.addEventListener('mouseout', () => {
            if (!selectedShape) {
                shape.element.classList.remove('highlighted');
                caption.style.opacity = '0';
                bottomCaption.style.opacity = '0';
            }
        });

        shape.element.addEventListener('click', () => {
            if (selectedShape === shape.element) {
                shape.element.classList.remove('highlighted');
                selectedShape = null;
                caption.style.opacity = '0';
                bottomCaption.style.opacity = '0';
            } else {
                if (selectedShape) {
                    selectedShape.classList.remove('highlighted');
                }
                shape.element.classList.add('highlighted');
                selectedShape = shape.element;
                caption.textContent = shape.caption;
                caption.style.opacity = '1';
                bottomCaption.textContent = shape.bottomCaption;
                bottomCaption.style.opacity = '1';
            }
        });
    });

    function scaleContent() {
        const width = window.innerWidth * 0.5;
        const aspectRatio = 7200 / 5695; // Example ratio

        imageContainer.style.width = `${width}px`;
        imageContainer.style.height = `${width / aspectRatio}px`;

        document.querySelectorAll('svg').forEach(svg => {
            svg.setAttribute('width', '100%');
            svg.setAttribute('height', '100%');
        });

        gozzoliAotM.style.width = `${width}px`;
        gozzoliAotM.style.height = `${width / aspectRatio}px`; 
    }

    window.addEventListener('load', scaleContent);
    window.addEventListener('resize', debounce(scaleContent, 100));

    function updateMagnifiers(event) {
        if (magnifier.style.display === 'none' && magnifierRight.style.display === 'none') {
            return;
        }

        const rect = imageContainer.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const scale = 2;

        magnifier.style.left = `${event.clientX}px`;
        magnifier.style.top = `${event.clientY}px`;
        magnifier.style.backgroundImage = `url('images/Background.png')`;
        magnifier.style.backgroundSize = `${imageContainer.offsetWidth * scale}px ${imageContainer.offsetHeight * scale}px`;
        magnifier.style.backgroundPosition = `-${x * scale - magnifier.offsetWidth / 2}px -${y * scale - magnifier.offsetHeight / 2}px`;
        magnifier.style.display = 'block';

        const rightX = event.clientX + window.innerWidth * 0.5;
        magnifierRight.style.left = `${rightX}px`;
        magnifierRight.style.top = `${event.clientY}px`;
        //magnifierRight.style.backgroundImage = `url('images/Scaled_Gozzoli_AotM.png')`;
        magnifierRight.style.backgroundSize = `${imageContainer.offsetWidth * scale}px ${imageContainer.offsetHeight * scale}px`;
        magnifierRight.style.backgroundPosition = `-${x * scale - magnifierRight.offsetWidth / 2}px -${y * scale - magnifierRight.offsetHeight / 2}px`;
        magnifierRight.style.display = 'block';
    }

    function toggleMagnifiers(event) {
        if (event.key === 'm' || event.key === 'M') {
            const isVisible = magnifier.style.display === 'block';
            if (isVisible) {
                magnifier.style.display = 'none';
                magnifierRight.style.display = 'none';
            } else {
                magnifier.style.display = 'block';
                magnifierRight.style.display = 'block';
                // Move magnifiers to the current mouse position
                updateMagnifiers(event);
            }
            // Toggle cursor visibility
            document.body.classList.toggle('invisible-cursor', !isVisible);
        }
    }

    imageContainer.addEventListener('mousemove', updateMagnifiers);
    document.addEventListener('keydown', toggleMagnifiers);

    // Ensure magnifiers are off initially
    magnifier.style.display = 'none';
    magnifierRight.style.display = 'none';
});
