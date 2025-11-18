class AppError extends Error {
    constructor(message, statusCode) {
        super(message)
        this.statusCode = statusCode
        Object.setPrototypeOf(this, new.target.prototype)
    }
}

/* Autenticacion & Autorizacion */
class InvalidCredentialsError extends AppError {
    constructor() {
        super("Nombre de usuario o contraseña incorrectos", 401)
    }
}

class UnauthorizedError extends AppError {
    constructor() {
        super("No autorizado - el token no se encuentra o es inválido", 401)
    }
}

/* Valiacion */
class ValidationError extends AppError {
    constructor(details) {
        super(details, 400)
    }
}

/* Usuarios */
class NotFoundError extends AppError {
    constructor() {
        super("El recurso solicitado no existe", 404)
    }
}

class UserAlreadyExistsError extends AppError {
    constructor() {
        super("El usuario ya existe", 409)
    }
}

class UserNotFoundError extends AppError {
    constructor() {
        super("Usuario no encontrado", 404)
    }
}

/* Base de datos */
class DBError extends AppError {
    constructor() {
        super("Error de base de datos", 500)
    }
}

class DBConnectionError extends AppError {
    constructor() {
        super("Error de conexión con la base de datos", 503)
    }
}

export { 
    AppError, 
    // Autenticacion & Autorizacion
    InvalidCredentialsError, UnauthorizedError, 
    // Validacion
    ValidationError, 
    // URLs & Usuarios
    NotFoundError, UserAlreadyExistsError, UserNotFoundError, 
    // Base de datos
    DBError, DBConnectionError
}