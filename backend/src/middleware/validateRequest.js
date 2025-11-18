import { ValidationError } from "../errors/errors.js";

const validate = (schema) => (req, _res, next) => {
    try {
        if(schema.body) {
            const parseResult = schema.body.safeParse(req.body)
            console.log(parseResult)
            if (!parseResult.success) throw new ValidationError(parseResult.error.issues[0].message)
        }
        if(schema.params) {
            const parseResult = schema.params.safeParse(req.params)
            console.log(parseResult)
            if (!parseResult.success) throw new ValidationError(parseResult.error.issues[0].message)
        }

        next()
    } catch (error) {
        next(error)
    }
}

export default validate