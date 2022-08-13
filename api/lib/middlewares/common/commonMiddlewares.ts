
// User Validation middleware
export const RequireJsonContent = () => {
    return (req, res, next) => {
        if (req.headers['content-type'] !== 'application/json') {
            res.status(400).send({
                errors: `Server requires application/json: Passing: ${req.headers['content-type']}`
            });
        } else {
            next()
        }
    }
}

