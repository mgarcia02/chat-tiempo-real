export interface SignInDTO {
    userName: string
    password: string
}

export interface SignUpDTO {
    fullName: string
    userName: string
    password: string
    confirmPassword: string
    gender: string
}

export interface AuthUser {
    _id: string
    userName: string
    fullName?: string
    profilePic?: string
}


export interface AuthContextType {
    authUser: AuthUser | null
    loading: boolean
    signUp: (obj: SignUpDTO) => Promise<void>
    signIn: (obj: SignInDTO) => Promise<void>
    signOut: () => Promise<void>
}