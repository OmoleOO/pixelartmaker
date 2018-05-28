
$(function(){


    function makeGrid(h, w){
        var height = h || 15; width = w || 30;
        var table = $('#pixelCanvas');
        table.children().remove();

        for (var x = 1; x <= height; x++){
            var tr = $('<tr></tr>');
            table.append(tr);
            for (var j = 1; j <= width; j++) {
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
        var inputHeight = $('#inputHeight').val(); 
        var inputWidth = $('#inputWidth').val();
        makeGrid(inputHeight, inputWidth);
    });

    // Grid controls
    // Ctrl + mouseover grid to draw
    // Shift + mouseover grid to erase
    $('#pixelCanvas').on('mouseover', 'td', function(evt){
        if (evt.ctrlKey){
            $( evt.target ).css('background-color', $('#colorPicker').val());
        } else if (evt.shiftKey){
            $( evt.target ).css('background-color', '#fff');
        }
    });
    
});
