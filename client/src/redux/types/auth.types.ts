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

export interface UserObject {
    first_name: string 
    last_name: string
    weight: number
    height: number
}

export interface UserState {
    isLoggedIn: boolean
    user:  UserObject | null
}
