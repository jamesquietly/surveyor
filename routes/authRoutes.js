const passport = require('passport');

module.exports = app => {
    //send user to google and ask for permission
    app.get(
        '/auth/google', 
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );

    //user comes back with a code after permission
    app.get('/auth/google/callback', passport.authenticate('google'));

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.send(req.user);
    });

    app.get('/api/current_user', (req, res) => {
       res.send(req.user); 
    });
}