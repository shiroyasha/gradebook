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

    tableView.renderView("#gradebookTable");


    $('.gradebookControlLink').click( function() {

        console.log( $(this).parent() );
        var isActive = $(this).parent().hasClass('active');

        if( isActive ) return;
        
        $('.active .gradebookControlLink').parent().removeClass('active');
        $(this).parent().addClass('active');

        if( $(this).attr('rel') == 'view' ) {
            tableView.renderView("#gradebookTable");
        } else if( $(this).attr('rel') == 'edit' ) {
            tableView.renderEdit("#gradebookTable");
        } else {
            tableView.renderStructure("#gradebookTable");
        }
    });

});
