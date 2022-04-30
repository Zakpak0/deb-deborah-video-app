import { ref } from "firebase/database"
import { firestore } from "../index"
import Ultis from "../../utils"

export const databaseRef = (collection?: string, path?: string) => {
    if (path) {
        return ref(firestore, collection + path)
    } else if (collection) {
        return ref(firestore, collection)
    } else {
        return ref(firestore, Ultis.collections[0])
    }
}