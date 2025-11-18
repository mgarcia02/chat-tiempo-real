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
        super("Invalid username or password", 401)
    }
}

class UnauthorizedError extends AppError {
    constructor() {
        super("Unauthorized - Token missing or invalid", 401)
    }
}

/* Valiacion */
class ValidationError extends AppError {
    constructor(details) {
        super("Validation failed", 400)
        this.details = details
    }
}

/* Usuarios */
class NotFoundError extends AppError {
    constructor() {
        super(`Not found`, 404)
    }
}

class UserAlreadyExistsError extends AppError {
    constructor() {
        super("User already exists", 409)
    }
}

class UserNotFoundError extends AppError {
    constructor() {
        super("User not found", 404)
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