var util = require('../util/util')

module.exports = function(app) {

    app.get('/', util.checkAuth, function(req, res) {
        res.render('index', { title : 'Express'} ) 
    });

};
