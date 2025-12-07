export interface SignInDTO {
    userName: string
    password: string
}

export interface SignUpDTO {
    userName: string
    email: string
    password: string
}

export interface AuthUser {
    userName: string
    email: string
}

export interface AuthContextType {
    authUser: AuthUser | null
    loading: boolean
    signUp: (obj: SignUpDTO) => Promise<void>
    signIn: (obj: SignInDTO) => Promise<void>
    signOut: () => Promise<void>
}