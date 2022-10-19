export interface UserToken {
    access_token: string 
    refresh_token: string
}

export interface User {
    id: string 
    email: string
    first_name: string 
    last_name: string
    tokens?: UserToken
}

export interface UserState {
    isLoggedIn: boolean
    user: User | null
}
