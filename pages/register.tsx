import { useRouter } from "next/router"
import { useRef, useState } from "react"
import { authentication } from "../firebase/index"
import Authentication from "../firebase/authentication"
import FireStore from "../firebase/firestore"
import { auth } from "../firebase/authentication/refs"

export default function register() {
    const router = useRouter()
    const [email, setEmail] = useState(false)
    const [password, setPassword] = useState(false)
    const [firstName, setFirstName] = useState(false)
    const [lastName, setLastName] = useState(false)
    const firstNameRef = useRef(null)
    const lastNameRef = useRef(null)
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const signup = (event: Event) => {
        event.preventDefault()
        //@ts-expect-error
        const firstName = firstNameRef.current.value
        //@ts-expect-error
        const lastName = lastNameRef.current.value
        //@ts-expect-error
        const email = emailRef.current.value
        //@ts-expect-error
        const password = passwordRef.current.value
        Authentication.create({ email, password }).then(({ user: { uid } }) => {
            console.log(uid)
            FireStore.Authentication.POST.user({
                firstName,
                lastName,
                email,
                password,
                uid
            }).then(() => {
                setEmail(false)
                setFirstName(false)
                setLastName(false)
                setPassword(false)
                //@ts-expect-error
                firstNameRef.current.value = null
                //@ts-expect-error
                lastNameRef.current.value = null
                //@ts-expect-error
                emailRef.current.value = null
                //@ts-expect-error
                passwordRef.current.value = null
            }).catch((error) => {
                console.log(error)
            })
        }).catch((error) => {
            console.log(error)
        })
    }
    const safe = ![firstName, lastName, email, password].includes(false as any)
    authentication.onAuthStateChanged((user) => {
        router.push('/home')
    })
    return (
        auth ? router.push("/account") : <div className="flex justify-center items-center w-1/3 ml-auto mr-auto h-screen flex-col">
            <label>Register</label>
            <div className="block mb-20 p-6 rounded-lg shadow-lg bg-white w-2/3">
                <form
                    //@ts-expect-error
                    onSubmit={safe ? signup : (e) => {
                        console.log(safe)
                        e.preventDefault()
                    }}
                >
                    <div className="grid grid-cols-2 gap-4">
                        <div className="form-group mb-6">
                            {/* @ts-expect-error */}
                            <input onChange={setFirstName} ref={firstNameRef} type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput123"
                                aria-describedby="emailHelp123" placeholder="First name" />
                        </div>
                        <div className="form-group mb-6">
                            {/* @ts-expect-error */}
                            <input onChange={setLastName} ref={lastNameRef} type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput124"
                                aria-describedby="emailHelp124" placeholder="Last name" />
                        </div>
                    </div>
                    <div className="form-group mb-6">
                        {/* @ts-expect-error */}
                        <input onChange={setEmail} ref={emailRef} type="email" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput125"
                            placeholder="Email address" />
                    </div>
                    <div className="form-group mb-6">
                        {/* @ts-expect-error */}
                        <input onChange={setPassword} ref={passwordRef} type="password" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput126"
                            placeholder="Password" />
                    </div>
                    <div className="form-group form-check text-center mb-6">
                    </div>
                    <button type="submit" className=" w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Sign up</button>
                </form>
            </div>
        </div>
    )
}