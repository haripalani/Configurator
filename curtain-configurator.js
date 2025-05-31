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
    const productTitle = document.getElementById('product-title');
    const rotateLeftBtn = document.getElementById('rotate-left');
    const rotateRightBtn = document.getElementById('rotate-right');
    const previewImage = document.getElementById('preview-main-image');


    updateProductImage();

    // Color Data Configuration
    

    function populateColorOptions() {
        const container = document.querySelector('.selection-column');

        Object.entries(colorData).forEach(([sectionId, colors]) => {
            // Check if section already exists
            let section = document.getElementById(sectionId);
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

    function populateColorSection(sectionId, colors) {
        const grid = document.querySelector(`#${sectionId} .colors-grid`);

        if (grid) {
            grid.innerHTML = '';

            colors.forEach(color => {
                const isSelected = color.id === selectedOptions?.[sectionId];
                const colorDiv = createColorOption(color.id, color.label, color.imgSrc, isSelected);
                grid.appendChild(colorDiv);
            });
        }
    }

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
        colorLabel.textContent = label;

        colorDiv.appendChild(colorLabel);

        return colorDiv;
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

        rotateLeftBtn.style.display = currentViewIndex === 0 ? 'none' : 'inline-block';
        rotateRightBtn.style.display = currentViewIndex === viewAngles.length - 1 ? 'none' : 'inline-block';
    }

    rotateLeftBtn.addEventListener('click', function () {
        if (currentViewIndex > 0) {
            currentViewIndex--;
            updateProductImage();
        }
    });

    rotateRightBtn.addEventListener('click', function () {
        if (currentViewIndex < viewAngles.length - 1) {
            currentViewIndex++;
            updateProductImage();
        }
    });


    document.addEventListener('click', function (e) {

        const colorOption = e.target.closest('.color-option');
        if (colorOption) {


            const parentPanel = colorOption.closest('.option-panel');
            if (!parentPanel) return;

            const optionType = parentPanel.id;
            const colorValue = colorOption.getAttribute('data-color');

            // Update selected visual
            parentPanel.querySelectorAll('.color-option').forEach(opt => opt.classList.remove('selected'));
            colorOption.classList.add('selected');

            // Update state
            selectedOptions[optionType] = colorValue;

            // Trigger relevant updates
            updateProductImage();

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







    document.addEventListener('click', function (e) {
        const optionItem = e.target.closest('.option-item');
        if (!optionItem) return;

        const selectedOption = optionItem.getAttribute('data-option');
        if (!selectedOption) return;

        document.querySelectorAll('.option-item').forEach(item => {
            item.classList.remove('active');
        });
        optionItem.classList.add('active');

        document.querySelectorAll('.option-panel').forEach(panel => {
            panel.style.display = 'none';
        });


        const targetPanel = document.getElementById(`${selectedOption}`);
        if (targetPanel) {
            targetPanel.style.display = 'block';
        }
        //updateProductImage();
        // const selectionHeading = document.getElementById('selection-heading');
        // const titleText = optionItem.querySelector('.option-title')?.textContent;
        //  if (selectionHeading && titleText) {
        //      selectionHeading.textContent = titleText;
        //  }
    });

    populateColorOptions();
    if (optionItems.length > 0) {
        optionItems[0].click();
    }


});