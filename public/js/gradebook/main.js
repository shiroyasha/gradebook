function getIndex( element ) {
    var id = $(element).attr('id');
    var p = id.indexOf('-');

    id = id.substring( p + 1);
    p = id.indexOf('-');

    var i = parseInt( id.substring( 0, p ) );
    var j = parseInt( id.substring( p + 1) );

    return { y : i, x : j};
}



$(document).ready( function() {

    var s = [ { properties : { id : 0, name : '#'}, structure : [] }].concat( students_structure ).concat(data_structure);

    var model = new DataModel( 5555, 7777, s , data );
    var tableView = new TableView( model );

    tableView.renderEdit("#gradebookTable");


    /*
    var structure = DataStructure( data_structure, students_structure );
    DataRenderer( structure, data ).renderView("gradebookTable");

    $('a.gradebookControlLink').click( function() {
        if( $(this).parent().hasClass('active') ) return;

        $('#gradebookControls .span4 li').removeClass('active');
        $(this).parent().addClass('active');
 
        var izbor = $(this).attr('rel');



        if( izbor == 'view' ) {
        
            DataRenderer( structure, data ).renderView("gradebookTable");             
        
        } else if ( izbor == 'edit' ) {

            var s = DataStructure( data_structure, students_structure );
            DataRenderer( s, data ).renderEdit("gradebookTable"); 

            $('td span input').change( function() {
                var element = this;

                $(this).addClass('checking');

                var index = getIndex( this )
                
                console.log( "updating", s.getPath(index.x) );

                $.getJSON('/gradebook/0/periods/0/check', { structurePath : s.getPath( index.x ) , value : $(this).attr('value') }, function (json) {
                    //console.log( $(element) );

                    $(element).removeClass('checking');

                    if( json.valid ) {
                        $(element).removeClass('error');
                        $(element).tooltip('disable');
                    }
                    else {
                        $(element).addClass('error');
                        $(element).attr('title', json.reason ).attr('rel', 'tooltip');
                        $(element).tooltip({ placement : 'right' });
                    }
                });
            });



            $('td span input').keydown(function(e)
            {
                //console.log( data );
                code= (e.keyCode ? e.keyCode : e.which);
                //console.log( code );
                // 38 - up arrow , 40 - down arrow
                var up = (code == 13 && e.shiftKey ) || ( code == 38 );
                var down = ( code == 13 && !e.shiftKey) || ( code == 40 );
                
                if( up || down ) {
                    
                    var id = $(this).attr('id');
                    var p = id.indexOf('-');

                    id = id.substring( p + 1);
                    p = id.indexOf('-');

                    var i = parseInt( id.substring( 0, p ) );
                    var j = parseInt( id.substring( p + 1) );
                    
                    if( up ) {
                        if( i - 1 >= 0 ) {
                            i = i - 1;
                        } else {
                            i = data.length - 1;
                            j = j - 1;
                        }<F2>
                    } else if( down ) {
                        if( i + 1 < data.length ) {
                            i = i + 1;
                        } else {
                            i = 0;
                            j = j + 1;
                        }
                    }
                    
                    $('#data-' + i + "-" + j ).focus();
                    e.preventDefault();
 
                }

            });



        }
    });
    */

});
