export interface UserDetailsReturned {
    _id: string;
    email: string;
    name: string;
    exp: number;
    iat: number;
}

export interface UserDetailsSignUp {
    email: string;
    firstName: string;
    LastName: string;
    password: string;
}

export interface UserDetailsLogIn {
    email: string;
    firstName: string;
    LastName: string;
    password: string;
}

export interface TokenResponse {
    token: string;
}

export interface TokenPayload {
    email: string;
    password: string;
    name?: string;
}