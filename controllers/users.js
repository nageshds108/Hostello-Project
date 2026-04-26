const User = require("../Models/user.js");

module.exports.renderSignup = (req, res) => {
    res.render('users/signup');
}

module.exports.signupUser = async(req, res,next) => {
    let { username,email, password } = req.body;
    try {
        const user = new User({ username,email });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err){
                 return next(err);
            }else{
                 req.flash('success', 'Welcome to Hotello!');
                 res.redirect('/listings');
                 }
        });
       
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/signup');
    }}

module.exports.renderLogin = (req, res) => {
    res.render('users/login');
}
module.exports.Login = (req, res) => {
    req.flash('success', 'Welcome Back!');
    res.redirect(res.locals.redirectURL || '/listings');
}

module.exports.logoutUser = (req, res,next) => {
    req.logout((err)=>{
        if(err){
            next(err);
        }else{
            req.flash('success', 'Logged Out Successfully!');
            res.redirect('/listings');
        };
    });
}