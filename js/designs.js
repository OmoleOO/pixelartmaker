

 

$(function(){
    let chosenColour = $('#colorPicker').val();

    function makeGrid(h, w){
        let height = h || 15; width = w || 30;
        let table = $('#pixelCanvas');
        table.children().remove();

        for (let x = 1; x <= height; x++){
            let tr = $('<tr></tr>');
            table.append(tr);
            for (let j = 1; j <= width; j++) {
                tr.append('<td></td>');
            } 
        }  
    }
    
    // Show grid by default
    makeGrid();
    $('#sizePicker').hide();

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
        if (inputHeight > 40 || inputWidth > 100){
            break;
        }
        makeGrid(inputHeight, inputWidth);
    });

    //Colour Palette
    let colours = [];
    let palette = $('.palette');

    $('#colorPicker').on('change', function(){ // Monitors colorPicker
        chosenColour = $('#colorPicker').val();
        if (!colours.includes($(this).val())){ // Add new colour to palette
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

        $('.palette').on('click', 'tr', function(evt){ // Monitor the palette
            $(evt.target).css('cursor', 'pointer');
            chosenColour = $(this).css('background-color'); // Select colour from palette
        })
    })

    // Grid controls
    $('#pixelCanvas').on('mouseover', 'td', function(evt){
        if (evt.ctrlKey){ // Ctrl + mouseover grid to draw
            $( evt.target ).css('background-color', chosenColour);
        } else if (evt.shiftKey){ // Shift + mouseover grid to erase
            $( evt.target ).css('background-color', '#fff');
        }
    });
    
});
