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