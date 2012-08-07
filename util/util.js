
exports.checkAuth = function(req, res, next) {
    if (!req.session.user) {
        res.redirect('/login?redirect=' + req.url );
    } else {
        next();
    }
}
