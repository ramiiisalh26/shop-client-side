import { Role } from "../../services/role/role";

export interface login {
    email: String | null,
    password: String| null,
    role: Role | null,
    access_token: String | null,
    refresh_token: String | null
}