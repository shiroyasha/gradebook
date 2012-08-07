var util = require('../util/util')

module.exports = function( app ) {
    
    app.get('/login', function(req, res) {
        res.render('login', { layout: null,
                              title: 'Login',
                              redir : req.query.redirect || '/' })         
    });

    app.get('/logout', util.checkAuth, function(req, res) {
        delete req.session.user;
        res.redirect('/login');
    });

    app.post('/login', function(req, res) {
        var post = req.body;
    
        if (post.username == 'admin' && post.password == 'admin') {
            req.session.user = 'admins id';
            res.redirect(req.body.redir || '/');
        } else {
            req.flash('warn', 'Username or password are invalid')
            res.redirect('/login');
        }
    });

};
