export interface CreateUser {
    username: string;
    password: string;
    description?: string;
    phone?: string;
}

export interface UserLogin {
    username: string;
    password: string;
}

export interface UserProfile {
    username: string;
    password: string;
    description?: string;
    role: string;
    phone?: string;
}

export interface AuthPayload {
    _id: string;
    username: string;
    password: string;
    role: string;
}