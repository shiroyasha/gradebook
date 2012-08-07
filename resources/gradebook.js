var util = require('../util/util')
var data = require('../data/gradebook')

module.exports = function(app) {

    app.get('/gradebook/:id', util.checkAuth, function(req, res) { 
        var d = { gradebook: { title: data.getGradebookInfo( parseInt(req.params.id) ).name }, 
                  data_structure: data.getDataStructure( req.session.user, req.params.id, null),
                  students_structure: data.getStudentsStructure( req.session.user, req.params.id, null),
                  data: data.getData( req.session.user, req.params.id, null) 
                };

        res.render('gradebook', d );
    });

    app.get('/gradebook/:id/periods/:period', util.checkAuth, function(req, res) {
        res.json( data.getDataStructure( req.session.user, req.params.id, req.params.period ) );     
    });

    app.get('/gradebook/:id/periods/:period/data', util.checkAuth, function(req, res) {
        res.json( data.getData( req.session.user, req.params.id, req.params.period ) );
    });

    app.get('/gradebook/:id/periods/:period/check', util.checkAuth, function(req, res) {
        var structurePath = req.query.structurePath;
        var value = req.query.value;
        var rez = data.checkValue( req.params.id, 
                                   req.params.period,
                                   structurePath,
                                   value);
        
        res.json( rez );
    });

};
