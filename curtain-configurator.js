import { allSetItems, productToSetMap, setToOptionsMap, getOptionItemsForProduct, getSetIdFromProduct } from './data.js';

document.addEventListener('DOMContentLoaded', function () {
    const viewAngles = ['Front', 'Side', 'Back'];
    let currentViewIndex = 0;
    const urlParts = window.location.pathname.split('/');
    var productId = urlParts[urlParts.length - 1];
    var setId = getSetIdFromProduct(productId);

    if (productId == 2) {
        document.getElementById('product-title').style.display = 'flex';
    }

    // Set up the selected options object to track selections
    const selectedOptions = {
        setId: setId,
        haakband: '225 CM',
        zijgordijnen: '00',
        rand: '00',
        ophangband: '00',
        voorraamband: '00',
        franjes: '00',
        booggordijn: '00',
        kussenvoor: '00',
        kussenachter: '00'
    };

    // Dynamic option items generation
    const optionIds = getOptionItemsForProduct(productId);
    console.log(optionIds);

    const optionsColumn = document.querySelector('.options-column');
    optionsColumn.innerHTML = '';

    if (optionIds && optionIds.length > 0) {
        const filteredItems = allSetItems.filter(item => optionIds.includes(item.id));

        filteredItems.forEach((item, index) => {
            const div = document.createElement('div');
            div.classList.add('option-item');
            if (index === 0) div.classList.add('active');
            div.dataset.option = item.option;
            div.innerHTML = `
                <img src="${item.img}" alt="${item.alt}" class="option-image">
                <div class="option-title">${item.title}</div>
            `;
            optionsColumn.appendChild(div);
        });
    } else {
        optionsColumn.innerHTML = '<p>No options found for this product.</p>';
    }

    // Elements
    const optionItems = document.querySelectorAll('.option-item');
    const optionPanels = document.querySelectorAll('.option-panel');
    const selectionHeading = document.getElementById('selection-heading');
    const responsiveSelectionHeading = document.getElementById('responsive-selection-heading');
    const productTitle = document.getElementById('product-title');
    const qtyValue = document.getElementById('qty-value');
    const decreaseQtyBtn = document.getElementById('decrease-qty');
    const increaseQtyBtn = document.getElementById('increase-qty');
    const rotateLeftBtn = document.getElementById('rotate-left');
    const rotateRightBtn = document.getElementById('rotate-right');
    const previewImage = document.getElementById('preview-main-image');

    // Function to check if we're on mobile
    function isMobile() {
        return window.innerWidth <= 1023;
    }

    // Function to format color ID for display
    function formatColorLabel(colorId) {
        if (!colorId) return '';
        const formattedLabel = colorId.replace(/^\d+\s+/, '');
        return formattedLabel;
    }

    // Color Data Configuration - You'll add this here
    const colorData = {
        // Curtain colors for "zijgordijnen"
        zijgordijnen: [
            { id: '01', label: '01 CREME', imgSrc: './Assets/Colors/Curtain color/01 Creme.png' },
            { id: '02', label: '02 Yellow', imgSrc: './Assets/Colors/Curtain color/02 Yellow.png' },
            { id: '03', label: '03 Brown', imgSrc: './Assets/Colors/Curtain color/03 Brown.png' },
            { id: '04', label: '04 Red', imgSrc: './Assets/Colors/Curtain color/04 Red.png' },
            { id: '05', label: '05 Dark-red', imgSrc: './Assets/Colors/Curtain color/05 Dark-red.png' },
            { id: '06', label: '06 Camel', imgSrc: './Assets/Colors/Curtain color/06 Camel.png' },
            { id: '07', label: '07 Choco', imgSrc: './Assets/Colors/Curtain color/07 Choco.png' },
            { id: '08', label: '08 Green', imgSrc: './Assets/Colors/Curtain color/08 Green.png' },
            { id: '09', label: '09 Blue', imgSrc: './Assets/Colors/Curtain color/09 Blue.png' },
            { id: '10', label: '10 Grey', imgSrc: './Assets/Colors/Curtain color/10 Grey.png' },
            { id: '11', label: '11 Dark-Grey', imgSrc: './Assets/Colors/Curtain color/11 Dark Grey.png' },
            { id: '12', label: '12 Black', imgSrc: './Assets/Colors/Curtain color/12 Black.png' }
        ],
        trimColors: [
            { id: '00', label: 'Dezelfde Kleur als het zijgordijn', special: true },
            { id: '51', label: '51 White', imgSrc: './Assets/Colors/Fringes/51 White.png' },
            { id: '52', label: '52 Ivory', imgSrc: './Assets/Colors/Fringes/52 Ivory.png' },
            { id: '53', label: '53 Sand', imgSrc: './Assets/Colors/Fringes/53 Sand.png' },
            { id: '54', label: '54 Beige', imgSrc: './Assets/Colors/Fringes/54 Beige.png' },
            { id: '55', label: '55 Ochore', imgSrc: './Assets/Colors/Fringes/55 Ochore.png' },
            { id: '56', label: '56 Amber', imgSrc: './Assets/Colors/Fringes/56 Amber.png' },
            { id: '57', label: '57 Fuchsia', imgSrc: './Assets/Colors/Fringes/57 Fuchsia.png' },
            { id: '58', label: '58 Red', imgSrc: './Assets/Colors/Fringes/58 Red.png' },
            { id: '59', label: '59 Cobalt', imgSrc: './Assets/Colors/Fringes/59 Cobalt.png' },
            { id: '60', label: '60 Navy Marine', imgSrc: './Assets/Colors/Fringes/60 Navy Marine.png' },
            { id: '61', label: '61 Brown', imgSrc: './Assets/Colors/Fringes/61 Brown.png' },
            { id: '62', label: '62 Grey', imgSrc: './Assets/Colors/Fringes/62 Grey.png' },
            { id: '63', label: '63 Dark Grey', imgSrc: './Assets/Colors/Fringes/63 Dark Grey.png' },
            { id: '64', label: '64 Black', imgSrc: './Assets/Colors/Fringes/64 Black.png' }
        ],
        rand: [
            { id: '31', label: '31 Yellow-Plush', imgSrc: './Assets/Colors/Plush/31 Yellow.png' },
            { id: '32', label: '32 Red-Plush', imgSrc: './Assets/Colors/Plush/32 Red.png' },
            { id: '33', label: '33 Purple-Plush', imgSrc: './Assets/Colors/Plush/33 Purple.png' },
            { id: '34', label: '34 Green-Plush', imgSrc: './Assets/Colors/Plush/34 Green.png' },
            { id: '35', label: '35 Blue-Plush', imgSrc: './Assets/Colors/Plush/35 Blue.png' },
            { id: '36', label: '36 Brown-Plush', imgSrc: './Assets/Colors/Plush/36 Brown.png' },
            { id: '37', label: '37 Grey-Plush', imgSrc: './Assets/Colors/Plush/37 Grey.png' }
        ],
        ophangband: [
            { id: '01', label: '01 CREME', imgSrc: './Assets/Colors/Curtain color/01 Creme.png' },
            { id: '02', label: '02 Yellow', imgSrc: './Assets/Colors/Curtain color/02 Yellow.png' },
            { id: '03', label: '03 Brown', imgSrc: './Assets/Colors/Curtain color/03 Brown.png' },
            { id: '04', label: '04 Red', imgSrc: './Assets/Colors/Curtain color/04 Red.png' },
            { id: '05', label: '05 Dark-red', imgSrc: './Assets/Colors/Curtain color/05 Dark-red.png' },
            { id: '06', label: '06 Camel', imgSrc: './Assets/Colors/Curtain color/06 Camel.png' },
            { id: '07', label: '07 Choco', imgSrc: './Assets/Colors/Curtain color/07 Choco.png' },
            { id: '08', label: '08 Green', imgSrc: './Assets/Colors/Curtain color/08 Green.png' },
            { id: '09', label: '09 Blue', imgSrc: './Assets/Colors/Curtain color/09 Blue.png' },
            { id: '10', label: '10 Grey', imgSrc: './Assets/Colors/Curtain color/10 Grey.png' },
            { id: '11', label: '11 Dark-Grey', imgSrc: './Assets/Colors/Curtain color/11 Dark Grey.png' },
            { id: '12', label: '12 Black', imgSrc: './Assets/Colors/Curtain color/12 Black.png' },
            { id: '31', label: '31 Yellow-Plush', imgSrc: './Assets/Colors/Plush/31 Yellow.png' },
            { id: '32', label: '32 Red-Plush', imgSrc: './Assets/Colors/Plush/32 Red.png' },
            { id: '33', label: '33 Purple-Plush', imgSrc: './Assets/Colors/Plush/33 Purple.png' },
            { id: '34', label: '34 Green-Plush', imgSrc: './Assets/Colors/Plush/34 Green.png' },
            { id: '35', label: '35 Blue-Plush', imgSrc: './Assets/Colors/Plush/35 Blue.png' },
            { id: '36', label: '36 Brown-Plush', imgSrc: './Assets/Colors/Plush/36 Brown.png' },
            { id: '37', label: '37 Grey-Plush', imgSrc: './Assets/Colors/Plush/37 Grey.png' }
        ],

        voorraamband: [
            { id: '01', label: '01 CREME', imgSrc: './Assets/Colors/Curtain color/01 Creme.png' },
            { id: '02', label: '02 Yellow', imgSrc: './Assets/Colors/Curtain color/02 Yellow.png' },
            { id: '03', label: '03 Brown', imgSrc: './Assets/Colors/Curtain color/03 Brown.png' },
            { id: '04', label: '04 Red', imgSrc: './Assets/Colors/Curtain color/04 Red.png' },
            { id: '05', label: '05 Dark-red', imgSrc: './Assets/Colors/Curtain color/05 Dark-red.png' },
            { id: '06', label: '06 Camel', imgSrc: './Assets/Colors/Curtain color/06 Camel.png' },
            { id: '07', label: '07 Choco', imgSrc: './Assets/Colors/Curtain color/07 Choco.png' },
            { id: '08', label: '08 Green', imgSrc: './Assets/Colors/Curtain color/08 Green.png' },
            { id: '09', label: '09 Blue', imgSrc: './Assets/Colors/Curtain color/09 Blue.png' },
            { id: '10', label: '10 Grey', imgSrc: './Assets/Colors/Curtain color/10 Grey.png' },
            { id: '11', label: '11 Dark-Grey', imgSrc: './Assets/Colors/Curtain color/11 Dark Grey.png' },
            { id: '12', label: '12 Black', imgSrc: './Assets/Colors/Curtain color/12 Black.png' },
            { id: '31', label: '31 Yellow-Plush', imgSrc: './Assets/Colors/Plush/31 Yellow.png' },
            { id: '32', label: '32 Red-Plush', imgSrc: './Assets/Colors/Plush/32 Red.png' },
            { id: '33', label: '33 Purple-Plush', imgSrc: './Assets/Colors/Plush/33 Purple.png' },
            { id: '34', label: '34 Green-Plush', imgSrc: './Assets/Colors/Plush/34 Green.png' },
            { id: '35', label: '35 Blue-Plush', imgSrc: './Assets/Colors/Plush/35 Blue.png' },
            { id: '36', label: '36 Brown-Plush', imgSrc: './Assets/Colors/Plush/36 Brown.png' },
            { id: '37', label: '37 Grey-Plush', imgSrc: './Assets/Colors/Plush/37 Grey.png' }
        ],

        franjes: [
            { id: '51', label: '51 White 5CM', imgSrc: './Assets/Colors/Fringes/51 White.png' },
            { id: '52', label: '52 Ivory 5CM', imgSrc: './Assets/Colors/Fringes/52 Ivory.png' },
            { id: '53', label: '53 Sand 5CM', imgSrc: './Assets/Colors/Fringes/53 Sand.png' },
            { id: '54', label: '54 Beige 5CM', imgSrc: './Assets/Colors/Fringes/54 Beige.png' },
            { id: '55', label: '55 Ochore 5CM', imgSrc: './Assets/Colors/Fringes/55 Ochore.png' },
            { id: '56', label: '56 Amber 5CM', imgSrc: './Assets/Colors/Fringes/56 Amber.png' },
            { id: '57', label: '57 Fuchsia 5CM', imgSrc: './Assets/Colors/Fringes/57 Fuchsia.png' },
            { id: '58', label: '58 Red 5CM', imgSrc: './Assets/Colors/Fringes/58 Red.png' },
            { id: '59', label: '59 Cobalt 5CM', imgSrc: './Assets/Colors/Fringes/59 Cobalt.png' },
            { id: '60', label: '60 Navy Marine 5CM', imgSrc: './Assets/Colors/Fringes/60 Navy Marine.png' },
            { id: '61', label: '61 Brown 5CM', imgSrc: './Assets/Colors/Fringes/61 Brown.png' },
            { id: '62', label: '62 Grey 5CM', imgSrc: './Assets/Colors/Fringes/62 Grey.png' },
            { id: '63', label: '63 Dark Grey 5CM', imgSrc: './Assets/Colors/Fringes/63 Dark Grey.png' },
            { id: '64', label: '64 Black 5CM', imgSrc: './Assets/Colors/Fringes/64 Black.png' },
            { id: '751', label: '51 White 7,5CM', imgSrc: './Assets/Colors/Fringes/51 White.png' },
            { id: '752', label: '52 Ivory 7,5CM', imgSrc: './Assets/Colors/Fringes/52 Ivory.png' },
            { id: '753', label: '53 Sand 7,5CM', imgSrc: './Assets/Colors/Fringes/53 Sand.png' },
            { id: '754', label: '54 Beige 7,5CM', imgSrc: './Assets/Colors/Fringes/54 Beige.png' },
            { id: '755', label: '55 Ochore 7,5CM', imgSrc: './Assets/Colors/Fringes/55 Ochore.png' },
            { id: '756', label: '56 Amber 7,5CM', imgSrc: './Assets/Colors/Fringes/56 Amber.png' },
            { id: '757', label: '57 Fuchsia 7,5CM', imgSrc: './Assets/Colors/Fringes/57 Fuchsia.png' },
            { id: '758', label: '58 Red 7,5CM', imgSrc: './Assets/Colors/Fringes/58 Red.png' },
            { id: '759', label: '59 Cobalt 7,5CM', imgSrc: './Assets/Colors/Fringes/59 Cobalt.png' },
            { id: '760', label: '60 Navy Marine 7,5CM', imgSrc: './Assets/Colors/Fringes/60 Navy Marine.png' },
            { id: '761', label: '61 Brown 7,5CM', imgSrc: './Assets/Colors/Fringes/61 Brown.png' },
            { id: '762', label: '62 Grey 7,5CM', imgSrc: './Assets/Colors/Fringes/62 Grey.png' },
            { id: '763', label: '63 Dark Grey 7,5CM', imgSrc: './Assets/Colors/Fringes/63 Dark Grey.png' },
            { id: '764', label: '64 Black 7,5CM', imgSrc: './Assets/Colors/Fringes/64 Black.png' }
        ],

        booggordijn: [
            { id: '01', label: '01 CREME', imgSrc: './Assets/Colors/Curtain color/01 Creme.png' },
            { id: '02', label: '02 Yellow', imgSrc: './Assets/Colors/Curtain color/02 Yellow.png' },
            { id: '03', label: '03 Brown', imgSrc: './Assets/Colors/Curtain color/03 Brown.png' },
            { id: '04', label: '04 Red', imgSrc: './Assets/Colors/Curtain color/04 Red.png' },
            { id: '05', label: '05 Dark-red', imgSrc: './Assets/Colors/Curtain color/05 Dark-red.png' },
            { id: '06', label: '06 Camel', imgSrc: './Assets/Colors/Curtain color/06 Camel.png' },
            { id: '07', label: '07 Choco', imgSrc: './Assets/Colors/Curtain color/07 Choco.png' },
            { id: '08', label: '08 Green', imgSrc: './Assets/Colors/Curtain color/08 Green.png' },
            { id: '09', label: '09 Blue', imgSrc: './Assets/Colors/Curtain color/09 Blue.png' },
            { id: '10', label: '10 Grey', imgSrc: './Assets/Colors/Curtain color/10 Grey.png' },
            { id: '11', label: '11 Dark-Grey', imgSrc: './Assets/Colors/Curtain color/11 Dark Grey.png' },
            { id: '12', label: '12 Black', imgSrc: './Assets/Colors/Curtain color/12 Black.png' }
        ],

        kussenvoor: [
            { id: '01', label: '01 CREME', imgSrc: './Assets/Colors/Curtain color/01 Creme.png' },
            { id: '02', label: '02 Yellow', imgSrc: './Assets/Colors/Curtain color/02 Yellow.png' },
            { id: '03', label: '03 Brown', imgSrc: './Assets/Colors/Curtain color/03 Brown.png' },
            { id: '04', label: '04 Red', imgSrc: './Assets/Colors/Curtain color/04 Red.png' },
            { id: '05', label: '05 Dark-red', imgSrc: './Assets/Colors/Curtain color/05 Dark-red.png' },
            { id: '06', label: '06 Camel', imgSrc: './Assets/Colors/Curtain color/06 Camel.png' },
            { id: '07', label: '07 Choco', imgSrc: './Assets/Colors/Curtain color/07 Choco.png' },
            { id: '08', label: '08 Green', imgSrc: './Assets/Colors/Curtain color/08 Green.png' },
            { id: '09', label: '09 Blue', imgSrc: './Assets/Colors/Curtain color/09 Blue.png' },
            { id: '10', label: '10 Grey', imgSrc: './Assets/Colors/Curtain color/10 Grey.png' },
            { id: '11', label: '11 Dark-Grey', imgSrc: './Assets/Colors/Curtain color/11 Dark Grey.png' },
            { id: '12', label: '12 Black', imgSrc: './Assets/Colors/Curtain color/12 Black.png' },
            { id: '31', label: '31 Yellow-Plush', imgSrc: './Assets/Colors/Plush/31 Yellow.png' },
            { id: '32', label: '32 Red-Plush', imgSrc: './Assets/Colors/Plush/32 Red.png' },
            { id: '33', label: '33 Purple-Plush', imgSrc: './Assets/Colors/Plush/33 Purple.png' },
            { id: '34', label: '34 Green-Plush', imgSrc: './Assets/Colors/Plush/34 Green.png' },
            { id: '35', label: '35 Blue-Plush', imgSrc: './Assets/Colors/Plush/35 Blue.png' },
            { id: '36', label: '36 Brown-Plush', imgSrc: './Assets/Colors/Plush/36 Brown.png' },
            { id: '37', label: '37 Grey-Plush', imgSrc: './Assets/Colors/Plush/37 Grey.png' }
        ],

        kussenachter: [
            { id: '01', label: '01 CREME', imgSrc: './Assets/Colors/Curtain color/01 Creme.png' },
            { id: '02', label: '02 Yellow', imgSrc: './Assets/Colors/Curtain color/02 Yellow.png' },
            { id: '03', label: '03 Brown', imgSrc: './Assets/Colors/Curtain color/03 Brown.png' },
            { id: '04', label: '04 Red', imgSrc: './Assets/Colors/Curtain color/04 Red.png' },
            { id: '05', label: '05 Dark-red', imgSrc: './Assets/Colors/Curtain color/05 Dark-red.png' },
            { id: '06', label: '06 Camel', imgSrc: './Assets/Colors/Curtain color/06 Camel.png' },
            { id: '07', label: '07 Choco', imgSrc: './Assets/Colors/Curtain color/07 Choco.png' },
            { id: '08', label: '08 Green', imgSrc: './Assets/Colors/Curtain color/08 Green.png' },
            { id: '09', label: '09 Blue', imgSrc: './Assets/Colors/Curtain color/09 Blue.png' },
            { id: '10', label: '10 Grey', imgSrc: './Assets/Colors/Curtain color/10 Grey.png' },
            { id: '11', label: '11 Dark-Grey', imgSrc: './Assets/Colors/Curtain color/11 Dark Grey.png' },
            { id: '12', label: '12 Black', imgSrc: './Assets/Colors/Curtain color/12 Black.png' }
        ],

    };
    // Modified option click handler - centralized logic for both desktop and mobile
    function handleOptionClick(optionElement, optionType) {
        // Remove active class from all options
        document.querySelectorAll('.option-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Add active class to clicked option
        optionElement.classList.add('active');
        
        // Update selection heading
        const title = optionElement.querySelector('.option-title').textContent;
        if (selectionHeading) selectionHeading.textContent = title;
        if (responsiveSelectionHeading) responsiveSelectionHeading.textContent = title;
        
        // Hide all option panels
        document.querySelectorAll('.option-panel').forEach(panel => {
            panel.style.display = 'none';
        });
        
        // Show the selected option panel
        const targetPanel = document.getElementById(`${optionType}-options`) || document.getElementById(`${optionType}`);
        if (targetPanel) {
            targetPanel.style.display = 'block';
        }
    }

    // Helper function to create a special color option element
    function createSpecialOption(colorId, isSelected = false) {
        const colorDiv = document.createElement('div');
        colorDiv.className = `color-option ${isSelected ? 'selected' : ''}`;
        colorDiv.setAttribute('data-color', colorId);

        const sameLabel = document.createElement('div');
        sameLabel.className = 'same-label-color';
        sameLabel.textContent = colorId;
        colorDiv.appendChild(sameLabel);
        
        return colorDiv;
    }

    // Helper function to create a color option element
    function createColorOption(colorId, label, imgSrc, isSelected = false) {
        const colorDiv = document.createElement('div');
        colorDiv.className = `color-option ${isSelected ? 'selected' : ''}`;
        colorDiv.setAttribute('data-color', colorId);

        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = colorId;
        colorDiv.appendChild(img);

        const colorLabel = document.createElement('div');
        colorLabel.className = 'color-label';
        colorLabel.textContent = label || formatColorLabel(colorId);
        colorDiv.appendChild(colorLabel);

        return colorDiv;
    }

    // Dynamically populate color options
    function populateColorOptions() {
        const container = document.querySelector('.selection-column');

        Object.entries(colorData).forEach(([sectionId, colors]) => {
            // Check if section already exists
            let section = document.getElementById(sectionId) || document.getElementById(`${sectionId}-options`);
            
            // If not, create it
            if (!section) {
                section = document.createElement('div');
                section.id = sectionId;
                section.className = 'option-panel';

                const colorsGrid = document.createElement('div');
                colorsGrid.className = 'colors-grid';

                section.appendChild(colorsGrid);
                container.appendChild(section);
            }

            // Now populate the section with color options
            populateColorSection(sectionId, colors);
        });
    }

    // Helper function to populate a specific color section
    function populateColorSection(sectionId, colors) {
        const grid = document.querySelector(`#${sectionId} .colors-grid`) || 
                    document.querySelector(`#${sectionId}-options .colors-grid`);

        if (grid) {
            grid.innerHTML = '';
            const optionType = sectionId.replace('-options', '');

            colors.forEach(color => {
                let colorDiv;
                const isSelected = color.id === selectedOptions[optionType] || color.id === selectedOptions[sectionId];

                if (color.special) {
                    colorDiv = createSpecialOption(color.id, isSelected);
                } else {
                    colorDiv = createColorOption(color.id, color.label, color.imgSrc, isSelected);
                }

                grid.appendChild(colorDiv);
            });
        }
    }

    function updateProductImage() {
        const viewAngle = viewAngles[currentViewIndex];
        const imageName = [
            setId, 
            selectedOptions.zijgordijnen || '00',
            selectedOptions.rand || '00',
            selectedOptions.ophangband || '00',
            selectedOptions.voorraamband || '00',
            selectedOptions.franjes || '000',
            selectedOptions.booggordijn || '00',
            selectedOptions.kussenvoor || '00',
            selectedOptions.kussenachter || '00',
            viewAngle,
            'size.png'
        ].join('-');

        previewImage.src = imageName;

        // Show/hide rotation buttons based on current view
        if (rotateLeftBtn) {
            rotateLeftBtn.style.display = currentViewIndex === 0 ? 'none' : 'inline-block';
        }
        if (rotateRightBtn) {
            rotateRightBtn.style.display = currentViewIndex === viewAngles.length - 1 ? 'none' : 'inline-block';
        }
    }
    
    function updateProductTitle() {
        if (productTitle) {
            const formattedColor = formatColorLabel(selectedOptions.zijgordijnen);
            productTitle.textContent = `KLITTENBAND HAAKBAND Yellow - ${formattedColor}`;
        }
    }

    // Rotation button events
    if (rotateLeftBtn) {
        rotateLeftBtn.addEventListener('click', function () {
            if (currentViewIndex > 0) {
                currentViewIndex--;
                updateProductImage();
            }
        });
    }

    if (rotateRightBtn) {
        rotateRightBtn.addEventListener('click', function () {
            if (currentViewIndex < viewAngles.length - 1) {
                currentViewIndex++;
                updateProductImage();
            }
        });
    }

    // Handle option item clicks
    document.addEventListener('click', function (e) {
        const optionItem = e.target.closest('.option-item');
        if (optionItem) {
            const selectedOption = optionItem.getAttribute('data-option');
            if (!selectedOption) return;

            handleOptionClick(optionItem, selectedOption);
            return;
        }

        // Handle color option clicks
        const colorOption = e.target.closest('.color-option');
        if (colorOption) {
            const parentPanel = colorOption.closest('.option-panel');
            if (!parentPanel) return;

            const optionType = parentPanel.id.replace('-options', '');
            const colorValue = colorOption.getAttribute('data-color');

            // Update selected visual
            parentPanel.querySelectorAll('.color-option').forEach(opt => opt.classList.remove('selected'));
            colorOption.classList.add('selected');

            // Update state
            selectedOptions[optionType] = colorValue;

            // Trigger relevant updates
            updateProductImage();
            
            if (optionType === 'zijgordijnen') {
                updateProductTitle();
            }
            return;
        }

        // Handle product image clicks
        const productImage = e.target.closest('.product-set-image');
        if (productImage) {
            setId = productImage.getAttribute('data-set-id');
            if (!setId) return;

            selectedOptions['setId'] = setId;
            updateProductImage();
        }
    });
    
    // Quantity controls
    if (decreaseQtyBtn && qtyValue) {
        decreaseQtyBtn.addEventListener('click', function () {
            let qty = parseInt(qtyValue.textContent);
            if (qty > 1) {
                qtyValue.textContent = qty - 1;
            }
        });
    }

    if (increaseQtyBtn && qtyValue) {
        increaseQtyBtn.addEventListener('click', function () {
            let qty = parseInt(qtyValue.textContent);
            qtyValue.textContent = qty + 1;
        });
    }

    // Handle window resize to ensure proper layout
    window.addEventListener('resize', function() {
        // Force re-render of active states on resize
        const activeOption = document.querySelector('.options-column > .option-item.active');
        if (activeOption) {
            const optionType = activeOption.dataset.option;
            handleOptionClick(activeOption, optionType);
        }
    });
    
    // Initialize
    updateProductImage();
    
    // Initialize color options after adding colorData
    populateColorOptions();
    
    // Initialize first option
    if (optionItems.length > 0) {
        optionItems[0].click();
    }
});