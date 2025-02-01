function parseError(err) {
    if (err instanceof Error) {
        //Generic error 
        if (!err.errors) {
            err.errors = [err.message];
        } else {
            // TODO parse Mongoose validation error
            const errror = new Error('Input validation error');
            errror.errors = Object.fromEntries(Object.values(err.errors.map(e => [e.path, e.msg])))

            return errror;
        }

    } else if (Array.isArray(err)) {
        // express-validator error array
        const errror = new Error('Input validation error');
        errror.errors = Object.fromEntries(err.map(e => [e.path, e.msg]))
        return errror;
    }

    return err
}
module.exports = { parseError }