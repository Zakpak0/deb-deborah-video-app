import { storage } from "../index";
import { storageRef } from "./refs";
import { uploadBytes, uploadBytesResumable, UploadTask, getBytes, listAll, ListResult } from "firebase/storage";
import FireStore from "../firestore";

export default class Storage {
    static upload(file: File, meta: {
        title: string;
        category: string;
        image: HTMLImageElement;
    }) {
        const { title, category, image } = meta
        const path = "/" + title.trim().replaceAll(" ", "-").toLowerCase()
        const uploadTask: UploadTask = uploadBytesResumable(storageRef(category, path), file)
        return uploadTask
    }
    static download(collection: string, name: string) {
        const video: Promise<ArrayBuffer> = getBytes(storageRef(collection, name))
        return video
    }
    static list(index: "development") {
        const collection = storageRef(index)
        const list: Promise<ListResult> = listAll(collection)
        return list
    }
}