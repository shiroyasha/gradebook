
/**
 * Module dependencies.
 */

var express = require('express')
  , gradebook = require('./data/gradebook');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session( {secret: 'my ultra super secret key'} ));
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));

});

app.dynamicHelpers(
    {
        navigation: function(req, res) {

            var predmeti = gradebook.predmeti( req.session.user );
            


            return {
                brand: 'The Gradebook',
                links: [ { name: 'Home', path:'/',
                           active: (/^\/$/).test(req.url) },
                         { name: 'News', path:'/news', 
                           active: (/^\/news\//).test(req.url) },
                         { name: 'Tutorial', path:'/tutorial', 
                           active: (/^\/tutorial\//).test(req.url) } 
                       ],

                profile: { username: 'admin', 
                           active: (/^\/profile\//).test(req.url) },

                gradebooks: { name: 'Gradebooks',
                              active: (/^\/gradebook\//).test(req.url),
                              links: predmeti
                            },
                logout: { name: 'Logout' }
            }
        },
        title : function(req, res) { return 'The Gradebook' },
        session: function(req, res) {
            return req.session
        },

        flash: function(req, res) {
            return req.flash()
        }
    }    
);


app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});


require('./resources/index')(app)
require('./resources/login')(app)
require('./resources/gradebook')(app)
//app.get('/admin', checkAuth, routes.admin);
//app.get('/gradebook', checkAuth, routes.gradebook );





app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
