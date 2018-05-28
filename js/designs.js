

 

$(function(){
    var chosenColour = $('#colorPicker').val();

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

    //Colour Palette
    var colours = [];

    $('#colorPicker').on('change', function(){
        colours.splice(0, 0, $(this).val());
        var palette = $('.palette');
        palette.children().remove();

        colours.forEach(function(colour, index, colours){
            if (index <= 4){
                var tr = $('<tr style="background-color: '+colour+'"></tr>');
                tr.append('<td style="padding: 10px">' + colour + '</td>')
                palette.append(tr);
            }
        });

        chosenColour = $('#colorPicker').val();

        $('.palette').on('click', 'tr', function(evt){
            $(evt.target).css('cursor', 'pointer');
            chosenColour = $(this).css('background-color');
        })
    })

   

  

    // Grid controls
    // Ctrl + mouseover grid to draw
    // Shift + mouseover grid to erase
    $('#pixelCanvas').on('mouseover', 'td', function(evt){
        if (evt.ctrlKey){
            $( evt.target ).css('background-color', chosenColour);
        } else if (evt.shiftKey){
            $( evt.target ).css('background-color', '#fff');
        }
    });
    
});
