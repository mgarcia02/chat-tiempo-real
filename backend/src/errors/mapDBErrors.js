import { UserAlreadyExistsError, ValidationError } from "./errors.js";

const mapDBErrors = (e) => {
    if (e.name === "ValidationError") return new ValidationError("Datos inválidos")
    if (e.name === "CastError") return new ValidationError(`Formato inválido para el campo ${err.path}`)
    if (e.code === 11000) return new UserAlreadyExistsError()
        
    return new DBError("Error de base de datos", 500)
}

export default mapDBErrors