import { ref } from "firebase/storage"
import { storage } from "../index"


export const storageRef = (collection: string, path?: string) => {
    if (path) {
        return ref(storage, collection + path)
    } else {
        return ref(storage, collection)
    }
}