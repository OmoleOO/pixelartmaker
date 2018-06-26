
 


let chosenColour = document.getElementById("colorPicker").value;
let colours = [];
let palette = document.getElementById("palette");
let table = document.getElementById('pixelCanvas');
let sizePicker = document.getElementById('sizePicker');
let colorPicker = document.getElementById("colorPicker");
let gridSize = document.getElementById('gridSize');
let submitBtn = document.getElementById('btn-submit');
let clearCanvas = document.getElementById("clear-canvas");
let gridOption = document.querySelector("input[type=radio]");



// Show grid by default
if (gridOption.value == "Default"){
    makeGrid();
    gridControl();
}


//Clear canvas
clearCanvas.addEventListener('click', function() {
    let cells = document.querySelectorAll('#pixelCanvas td');
    cells.forEach(cell => cell.style.backgroundColor = '#fff');
});

// Grid size option
gridSize.addEventListener("change", function(evt) {
    if(evt.target.value === 'Default'){
        sizePicker.style.display = 'none';
        makeGrid();
        gridControl();
    } else {
        sizePicker.style.display = 'block';
        clearTableRows("#pixelCanvas tr");
    }
});


// Draw custom grid
submitBtn.addEventListener('click', function(evt){
    evt.preventDefault();
    let inputHeight = document.getElementById("inputHeight").value; 
    let inputWidth = document.getElementById("inputWidth").value;
    let errorMsg = [
        "Grid height should be less than 25", 
        "Grid width should be less than 100"
    ];
    if ((inputHeight > 25) || (inputWidth > 100)) {
        alert(`${inputHeight > 25 ? errorMsg[0] : ""} ${inputWidth > 100 ? errorMsg[1] : ""}`); 
        return;
    }
    else {
        document.getElementsByTagName("main")[0].style.height = 'auto';
        makeGrid(inputHeight, inputWidth);
        gridControl();
    }
});


// Monitors colorPicker
colorPicker.addEventListener('change', function(){ 
    chosenColour = colorPicker.value;
    // Add new colour to palette
    if (!colours.includes(chosenColour)){ 
        colours.splice(0, 0, chosenColour);
    }
    clearTableRows("#palette tr");

    // Build and fill palette
    colours.forEach(function(colour, index, colours){
        // Colour palette holds 7 recently used colours
        if (index <= 6){ 
            let tr = document.createElement("tr");
            let td = document.createElement("td");
            td.style.padding = '10px';
            td.innerHTML = colour;
            td.style.backgroundColor = colour;
            tr.appendChild(td)
            palette.appendChild(tr);
        }
    });

    // Monitor the palette
    let paletteCells = document.querySelectorAll('#palette tr');
    paletteCells.forEach(cell => cell.addEventListener('click', function(evt){ 
        evt.target.style.cursor = 'pointer';
        // Select colour from palette
        chosenColour = evt.target.style.backgroundColor;
    }));
});

/**
 * @description Clear table rows
 * @param {*String query selector} querySelector
 */
function clearTableRows(querySelector){
    document.querySelectorAll(querySelector)
        .forEach(row => row.remove());
}

/**
 * @description creates default or custom grid
 * @param {*int height} h 
 * @param {*int width} w 
 */
function makeGrid(h, w){
    let height = h || 10; 
    let width = w || 40;
    clearTableRows("#pixelCanvas tr");
    let x = 1; 
    while ( x <= height ){
        let tr = document.createElement("tr");
        table.appendChild(tr);
        for (let j = 1; j <= width; j++) {
            let td = document.createElement("td");
            tr.appendChild(td);
        } 
        x++
    }  
}

/**
 * @description Controls grid's painting work follow
 * mouseover grid to paint | Ctrl + mouseover grid to erase |
 * Shift + mouseover grid to temporarily suspend painting
 */
function gridControl(){
    // Grid controls
    let gridCells = document.querySelectorAll('#pixelCanvas td');
    gridCells.forEach(cell => cell.addEventListener('mouseover', function(evt){ 
        if (evt.shiftKey){ 
            // To suspend painting: Shift + mouseover grid
            return false;
        } else if (evt.ctrlKey){ 
            // To erase: Ctrl + mouseover grid
            evt.target.style.backgroundColor = '';
        } else {
            // To paint: mouseover grid
            evt.target.style.backgroundColor = chosenColour;
        }
    }));
}
