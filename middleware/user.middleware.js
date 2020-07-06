module.exports.postCreate = function (req, res, next) {
    errors = [];
    if (!req.body.name) {
        errors.push("Name is required");
    }
    if (!req.body.phone) {
        errors.push("phone is required");
    }

    if (errors.length) {
        res.render('users/create', {
            errors, old: req.body
        })
        return;
    }
    res.locals.isError = "false";
    next(); 
}