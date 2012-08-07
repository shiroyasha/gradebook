var DataModel = function(gradebookID, periodID, structure, data) {

    /*  
     * path format is gradebookID:periodID:structure_path:studentID 
     */

    var header = [];
    var rows = [];

    var maxDepth = 0;
    var leafCount = 0;

    paths = [];

    /*------------------------------------------------------------*/

    function dubina( s ) {
        if( s == [] ) return 0;
        
        var max = 0;

        for( var i = 0; i < s.length; i++ ) {
            var d = dubina( s[i].structure ) + 1;
            if( max < d ) max = d;
        }

        return max;
    }

    function brojListova( s ) {
        if( s == [] ) return 0;

        var suma = 0;
        for( var i = 0; i < s.length; i++ ) {
            if( s[i].structure.length == 0 ) suma += 1;
            else suma += brojListova( s[i].structure );
        }

        return suma;
    }

    function napraviLiniju( s, line, akum ) {
        var rez = [];

        for( var i= 0; i < s.length; i++) {
            if( akum == 0 ) {
                sirina = brojListova( s[i].structure );

                rez.push( { properties: s[i].properties,
                            colspan: sirina,
                            rowspan: ( s[i].structure.length == 0 ? ( maxDepth - line ) : 1 )
                          });
            }
            else {
                rez = rez.concat( napraviLiniju( s[i].structure, line, akum - 1)  );    
            }
        }

        return rez;
    }

    function createPaths( prefix, s ) {
        //console.log('tu', prefix, s);
        if( s.length == 0 ) {
            //console.log('tu sam');
            paths.push( prefix );
            return;
        }
        
        for( var i = 0; i < s.length; i++ ) {
            createPaths( prefix + ":" + s[i].properties.id , s[i].structure );
        }
    }

    function getPath( index ) {
        return gradebookID + ":" + periodID + ":" + paths[index.j] + ":" + data[index.i].id;
    }

    function processData() {
        maxDepth = dubina(structure);
        leafCount = brojListova(structure);

        for( var i = 0; i < maxDepth; i++ ) {
            header.push( napraviLiniju(structure, i, i) );
        }

        rows = data;
    }

    function update() {
        $.getJSON('/gradebook/update', {gradebookID : gradebookID, periodID : periodID }, function( v ) {
            processData( v.structure, v.data );
        });        
    }

    /*-------------------------------------------------------------*/
    /* inicialization */
    
    processData();

    /*-------------------------------------------------------------*/

    var model = {
        update: update,

        headerDimension: function() {
            return { height : maxDepth, width : leafCount };
        },

        rowCount: function() {
            return data.length; 
        },

        getHeaderRow : function( index ) {
            return header[index];
        },

        getType : function( index ) {
            /*
            console.log( header[index].properties );
            return header[index].properties.type;
            */ if( index > 3 ) return "number";
        },

        getRow : function( index ) {
            return [index].concat( data[index] );
        },

        getData: function( index ) {
            return data[index.i].values[index.j];
        },

        getPath : getPath,
    
        setData: function( index , value, f ) {

            var path = getPath( index );

            $.getJSON('/gradebook/setData', { path : path , value : value }, function( value ) {
                f( {success : true, reason : "some reason" } );
            });
        }

    };

    return model;
};



/*

var DataRenderer = function( structure, data ) {
    
    function createTable( edit ) {
        var header = "";
        var body = "";

        var dubina = structure.maxDubina;

        for( var i = 1; i <= dubina; i++ ){

            var linija = structure.getLine( i );

            header += "<tr>";

            for( var j = 0; j < linija.length; j++ )
            {
                if( linija[j] != null ) {
                    header += "<th colspan=" + linija[j].sirina + " rowspan=" + linija[j].visina + " >";
                        header += "<span style='white-space: nowrap'>";
                            header += linija[j].name;
                        header += "</span>";
                    header += "</th>";
                }
            }      
            
            header += "</tr>"
        }

        for( var i = 0; i < data.length ; i++ ) {
            body += "<tr>";
            body += "<td><span style='white-space: nowrap'>" + (i + 1) + "</span></td>";

            for( var j=0; j < data[i].length ; j++) {

                var fix = isNaN( data[i][j].value ) ? data[i][j].value : data[i][j].value.toFixed(2);

                body += "<td>";
                body += "<span style='white-space: nowrap'>";

                if( data[i][j].edit == "yes" && edit )
                    body += "<input id='data-" + i + "-" + (j+1) + "' type='text' value='" + fix + "' >";
                else if( data[i][j].edit == "function" && edit )
                    body += "<input id='data-" + i + "-" + (j+1) + "' type='text' value='" + fix + "' >";
                else
                    body += fix;
                   
                body += "</span>";
                body += "</td>";
            }
            body += "</tr>";
        }

        return "<table class='table table-bordered tableCentering'>" + 
                  "<thead>" + header + "</thead>" +
                  "<tbody>" + body + "</tbody>" +
               "</table>";
    }

    return { renderEdit : function( divId ) { $('#' + divId ).html( createTable(true) ); },
             renderView : function( divId ) { $('#' + divId ).html( createTable(false)); }
           };
}

*/
