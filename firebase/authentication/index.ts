import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { authentication } from "../index";

export default class Authentication {
    static async create({ email, password }: {
        email: string
        password: string
    }) {
        return createUserWithEmailAndPassword(authentication, email, password)
    }
    static async login({ email, password }: {
        email: string
        password: string
    }) {
        return signInWithEmailAndPassword(authentication, email, password)
    }
    static async logout() {
        return signOut(authentication)
    }
}