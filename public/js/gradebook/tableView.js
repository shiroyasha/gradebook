var TableView = function( model ) {
    
    function createHeader() {
        var rez = "";
        var dim = model.headerDimension();      

        for( var i = 0; i < dim.height; i++ ) {
            rez += "<tr>";
            
            var row = model.getHeaderRow( i );
            console.log(row);
            for( var j = 0; j < row.length; j++) {
                rez += "<th colspan='" + row[j].colspan + "' rowspan='" + row[j].rowspan + "' >" + row[j].properties.name + "</th>";
            }

            rez += "</tr>";
        }

        return rez;
    }

    function format( data , index ) {
        var t = model.getType(index);

        if( t == "number") {
            return data.toFixed(2);
        }

        return data;
    }

    function createViewBody() {
        var rez = "";
        
        for( var i = 0; i < model.rowCount(); i++ ) {
            rez += "<tr>";
            var row = model.getRow(i);

            for( var j = 0; j < row.length; j++ ) {
                rez += "<td data-index-i=" + i + " data-index-j=" + j + " >" + format( row[j].value, j ) + "</td>";  
            }

            rez += "</tr>";
        }

        return rez;
    }

    function createEditBody() {
        var rez = "";
        
        for( var i = 0; i < model.rowCount(); i++ ) {
            rez += "<tr>";
            var row = model.getRow(i);

            for( var j = 0; j < row.length; j++ ) {
                if( row[j].edit == "yes" )
                    rez += "<td data-index-i=" + i + " data-index-j=" + j + " ><input type='text' value='" + format( row[j].value, j ) + "' ></td>";  
                else
                    rez += "<td data-index-i=" + i + " data-index-j=" + j + " >" + format( row[j].value, j ) + "</td>";
            }

            rez += "</tr>";
        }

        return rez;
    }

    function createTable( edit ) {
        return "<table class='table table-bordered'>" + 
                   "<thead>" + createHeader() + "</thead>" +
                   "<tbody>" + ( edit ? createEditBody() : createViewBody() ) + "</tbody>" + 
               "</table>";
    }

    function getIndex( e ) {
        return { i : parseInt( e.data('indexI') ),
                 j : parseInt( e.data('indexJ') )
               };
    }


    function setChangeAction() {
        $('td input').change( function() {
            
            var element = this;

            $(this).addClass('checking');
            var index = getIndex( this );

            model.setData( model.getPath(index), 
                  $(this).value(), 
                  function( answer ) {

                $(element).removeClass('checking');

                if( answer.success ) {
                    $(element).removeClass('error');
                    $(element).tooltip('disable');
                } else {
                    $(element).addClass('error');
                    $(element).attr('title', json.reason ).attr('rel', 'tooltip');
                    $(element).tooltip({ placement : 'right' });
                }
            } );

        });
    }

    function setKeyoardNavigation() {
        $("td input[type='text']").keydown( function(e) {
            //console.log( data );
            code= (e.keyCode ? e.keyCode : e.which);
            //console.log( code );
            // 38 - up arrow , 40 - down arrow
            //
            var up = (code == 13 && e.shiftKey ) || ( code == 38 );
            var down = ( code == 13 && !e.shiftKey) || ( code == 40 );
           
            if( up || down ) {
                
                var index = getIndex( $(this).parent() );
                var i = index.i; var j = index.j;

               console.log(i, j);


                if( up ) {
                    if( i - 1 >= 0 ) {
                        i = i - 1;
                    } else {
                        i = data.length - 1;
                        j = j - 1;
                    }
                } else if( down ) {
                    if( i + 1 < data.length ) {
                        i = i + 1;
                    } else {
                        i = 0;
                        j = j + 1;
                    }
                }
                console.log(i, j);
                $('td[data-index-i=' + i + '][data-index-j=' + j + '] input').focus();
                e.preventDefault();
       
            }
        });
    }

    function createTree() {

        function create( s ) {
            if( s.structure == [] ) return "";
            
            var rez = "<ul>";
            
            for( var i = 0; i < s.length ; i++) {
                rez += "<li>";
                rez += "<h2>" + s[i].properties.name + "</h2>";
                rez += "<a href='#'>rename </a>";
                rez += "<a href='#'>add parent </a>";
                rez += "<a href='#'>add child</a>"; 
                rez += create( s[i].structure );
                rez += "</li>"; 
            }
            rez += "</ul>"; 

            return rez;
        }
        
        return "<ul>" + 
                 "<h1>" + model.getGradebookName() + "</h1>" +
                 "<a href='#'>rename </a>" +
                 "<a href='#'>add child</a>" +
                 create( model.getStructure().slice(2) ) +
               "</ul>";

    }

    var View = {
        renderView : function( element ) {
            var table = createTable(false);

            $( element ).html( table );
        },

        renderEdit: function( element ) {
            var table = createTable(true);

            $( element ).html( table );


            setChangeAction();
            setKeyoardNavigation();
        },

        renderStructure: function( element ) {
            var tree = createTree();
            console.log(tree);
            $( element ).html(tree);

        }
    };

    return View;
};
