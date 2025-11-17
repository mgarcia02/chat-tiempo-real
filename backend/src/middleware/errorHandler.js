import { AppError } from "../errors/errors.js"

const errorHandler = (e, _req, res, _next) => {
    if(e instanceof AppError) {
        return res.status(e.statusCode).json({ error: e.constructor.name, message: e.message })
    }

    return res.status(500).json({ error: { type: "InternalServerError", message: "Something went wrong" } })
}

export default errorHandler