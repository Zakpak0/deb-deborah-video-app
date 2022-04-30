import { get, update } from "firebase/database";
import { databaseRef } from "./refs";

export default class FireStore {
    static Videos = class {
        static GET = class {
            static async meta({ collection, title, path }: {
                title?: string;
                collection?: string;
                path?: string;
            }) {
                if (path) {
                    const query = (await get(databaseRef(path))).val()
                    return query

                } else if (title) {
                    const query = (await get(databaseRef(title))).val()
                    return query

                } else if (collection) {
                    const query = (await get(databaseRef(collection))).val()
                    return query
                } else {
                    const query = (await get(databaseRef())).val()
                    return query
                }

            }
        }
        static POST = class {
            static async meta(meta: {
                title: string;
                category: string;
                image: HTMLImageElement;
                path: string
            }) {
                const { path, category } = meta
                const query = await update(databaseRef(category, path), meta).catch((error) => console.log(error))
                return query
            }
        }
    }
    static Authentication = class {
        static GET = class {
            static async user(uid: string) {
                const path = "/" + uid
                const query = await get(databaseRef("user", path))
                return query
            }
        }
        static POST = class {
            static async user(user: {
                firstName: string,
                lastName: string,
                uid: string,
                email: string,
                password: string
            }) {
                const path = `/${user.uid}`
                const query = await update(databaseRef("user", path), user)
                return query
            }

        }
    }
}