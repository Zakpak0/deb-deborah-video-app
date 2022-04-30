import { useRouter } from "next/router"
import { auth } from "../firebase/authentication/refs"
import FireStore from "../firebase/firestore"

export default function account() {
    const router = useRouter()
    const uid = auth?.uid
    const user = uid ? (async () => await FireStore.Authentication.GET.user(uid))() : false
    const { firstName, lastName, email, password } = user
    return (
        !auth ? router.push("/login") :
            <div className="max-w-md mx-auto mt-4 shadow-lg border rounded-md duration-300 hover:shadow-sm">
                <div className="flex items-center mt-2 pt-3 ml-4 mr-2 flex-col">
                    <div className="flex-none w-10 h-10 rounded-full">
                        <img className="w-full h-full rounded-full" />
                    </div>
                    <div className="ml-3">
                        <span className="block text-gray-900"></span>
                        <span className="block text-gray-400 text-sm"></span>
                    </div>
                </div>
                <div className="pt-3 ml-4 mr-2 mb-3">
                    <h3 className="text-xl text-gray-900">

                    </h3>
                    <p className="text-gray-400 text-sm mt-1"></p>
                </div>
            </div>
    )

}