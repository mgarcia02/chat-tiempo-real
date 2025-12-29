# Real-Time Chat App

Este proyecto es una aplicación de mensajería en tiempo real construida con Node.js, Express, TypeScript, Socket.IO y React.

## Estructura del proyecto

```
chat-tiempo-real/
├── backend/                 # API REST + WebSockets
│   ├── src/
│   │   ├── controllers/     # Lógica de rutas
│   │   ├── services/        # Lógica de negocio
│   │   ├── models/          # Modelos de usuario, mensajes, conversaciones
│   │   ├── routes/          # Define las rutas HTTP y las asocia a los controladores
│   │   ├── sockets/         # Eventos Socket.IO
│   │   ├── middlewares/     # Autenticación JWT, validaciones
│   │   ├── utils/           # Utilidades
│   ├── .env                 # Variables de entorno
│
├── frontend/                # Interfaz web con React + Zustand + Tailwind
│   ├── src/
│   │   ├── components/      # Sidebar, ChatWindow...
│   │   ├── services/        # Encapsulan las llamadas a la API
│   │   ├── hooks/           # Custom hooks reutilizables
│   │   ├── router/          # Configuración de React Router
│   │   ├── context/         # SocketContext y AuthContext
│   │   ├── store/           # Zustand: conversaciones, usuario, mensajes
│   │   ├── views/           # SignUp, SignIn, Home
│   │   └── assets/          # Iconos y imágenes
│
├── .gitignore
└── README.md
```

## Tecnologías utilizadas
### Backend
- Node.js  + Express
- TypeScript
- MongoDB + Mongoose
- Socket.IO
- JWT + Cookies HTTP-only
- Zod para validaciones

### Frontend
- React
- TypeScript
- Zustand para estado global
- Socket.IO Client
- Tailwind CSS
- React Router
- React Toastify

## Autenticación
El sistema utiliza JWT almacenado en cookies HTTP-only, lo que garantiza:
- Protección frente a ataques XSS
- Sesiones persistentes
- Validación automática en cada petición protegida

El frontend detecta si el usuario está autenticado y adapta la interfaz en consecuencia.

## Vista general del flujo
1. El usuario inicia sesión
2. El frontend establece conexión con Socket.IO
3. Se cargan conversaciones y contactos
4. Al seleccionar una conversación:
    - Se cargan mensajes
    - Se hace autoscroll al último mensaje
5. Al enviar un mensaje:
    - Se guarda en backend
    - Se emite por Socket.IO
    - Se actualiza el estado global
6. Al recibir un mensaje:
    - Se añade a la conversación correspondiente
    - Se reordena la lista de conversaciones
    - Se actualiza la UI en tiempo real