

 

$(function(){
    let chosenColour = $('#colorPicker').val();
    let colours = [];
    let palette = $('.palette');

    // Show grid by default
    makeGrid();
    $('#sizePicker').hide();

    //Clear canvas
    document.getElementById("clear-canvas").addEventListener('click', function() {
        let rows = document.getElementById("pixelCanvas").rows;
        for (let row of rows){
            for (let cell of row.cells){
                cell.style.backgroundColor = '#fff'
            }
        } 
    });

    /**
     * @description creates default or custom grid
     * @param {*height} h 
     * @param {*width} w 
     */
    function makeGrid(h, w){
        let height = h || 10; 
        let width = w || 40;
        let table = $('#pixelCanvas');
        table.children().remove();
        let x = 1; 
        while ( x <= height ){
            let tr = $('<tr></tr>');
            table.append(tr);
            for (let j = 1; j <= width; j++) {
                tr.append('<td></td>');
            } 
            x++
        }  
    }

    // Grid size option
    $('#gridSize').on('change', 'input[type=radio]', function(evt){
        if(evt.target.value === 'Default'){
            makeGrid();
            $('#sizePicker').hide();
        } else {
            $('#sizePicker').show();
            $('#pixelCanvas').children().remove();
        }
    });

    // Draw custom grid
    $('#btn-submit').on('click', function(evt){
        evt.preventDefault();
        let inputHeight = $('#inputHeight').val(); 
        let inputWidth = $('#inputWidth').val();
        let errorMsg = [
            "Grid height should be less than 25", 
            "Grid width should be less than 100"
        ];
        if ((inputHeight > 25) || (inputWidth > 100)) {
           alert(`${inputHeight > 25 ? errorMsg[0] : ""} ${inputWidth > 100 ? errorMsg[1] : ""}`); 
           return;
        }
        else {
            $('main').css('height', 'auto');
            makeGrid(inputHeight, inputWidth);
        }
    });

    // Grid controls
    $('#pixelCanvas').on('mouseover', 'td', function(evt){
        // To draw: mouseover grid 
        $( evt.target ).css('background-color', chosenColour);
         
        if (evt.ctrlKey){ 
            // To erase: Ctrl + mouseover grid
            $( evt.target ).css('background-color', '#fff');
        }
    });
    
    // Monitors colorPicker
    $('#colorPicker').on('change', function(){ 
        chosenColour = $('#colorPicker').val();
        // Add new colour to palette
        if (!colours.includes($(this).val())){ 
            colours.splice(0, 0, $(this).val());
        }
        palette.children().remove();

        colours.forEach(function(colour, index, colours){
            if (index <= 6){ // Colour palette holds 7 recently used colours
                let tr = $(`<tr style="background-color: ${colour}"></tr>`);
                tr.append(`<td style="padding: 10px">${colour}</td>`)
                palette.append(tr);
            }
        });

        // Monitor the palette
        $('.palette').on('click', 'tr', function(evt){ 
            $(evt.target).css('cursor', 'pointer');
            // Select colour from palette
            chosenColour = $(this).css('background-color'); 
        });
    });
    
});
