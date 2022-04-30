import { useRouter } from "next/router"
import { useRef, useState } from "react"
import { authentication } from "../firebase/index"
import Authentication from "../firebase/authentication"
import { auth } from "../firebase/authentication/refs"

export default function login() {
    const router = useRouter()
    const [email, setEmail] = useState(false)
    const [password, setPassword] = useState(false)
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const signin = (event: Event) => {
        event.preventDefault()
        //@ts-expect-error
        const email = emailRef.current.value
        //@ts-expect-error
        const password = passwordRef.current.value
        Authentication.login({ email, password }).then(() => {
            //@ts-expect-error
            emailRef.current.value = null
            //@ts-expect-error
            passwordRef.current.value = null
        }).catch((error) => {
            console.log(error)
        })
    }
    const safe = ![email, password].includes(false as any)
    authentication.onAuthStateChanged((user) => {
        router.push('/home')
    })
    return (
        auth ? router.push("/account") : <div className="flex justify-center items-center w-1/3 ml-auto mr-auto h-screen flex-col">
            <label>Login</label>
            <div className="block mb-20 p-6 rounded-lg shadow-lg bg-white w-2/3">
                <form
                    //@ts-expect-error
                    onSubmit={safe ? signin : (e) => e.preventDefault()}
                >
                    <div className="form-group mb-6">
                        <label htmlFor="exampleInputEmail2" className="form-label inline-block mb-2 text-gray-700">Email address</label>
                        {/* @ts-expect-error */}
                        <input onChange={setEmail} ref={emailRef} type="email" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInputEmail2"
                            aria-describedby="emailHelp" placeholder="Enter email" />
                    </div>
                    <div className="form-group mb-6">
                        <label htmlFor="exampleInputPassword2" className="form-label inline-block mb-2 text-gray-700">Password</label>
                        {/* @ts-expect-error */}
                        <input onChange={setPassword} ref={passwordRef} type="password" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInputPassword2"
                            placeholder="Password" />
                    </div>
                    <div className="flex justify-between items-center mb-6">
                        <div className="form-group form-check">
                            <input type="checkbox"
                                className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                id="exampleCheck2" />
                            <label className="form-check-label inline-block text-gray-800" htmlFor="exampleCheck2">Remember me</label>
                        </div>
                        <a href="#!"
                            className="text-blue-600 hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out">Forgot
                            password?</a>
                    </div>
                    <button type="submit" className=" w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Sign in</button>
                    <p className="text-gray-800 mt-6 text-center">Not a member? <a onClick={() => router.push("/register")}
                        className="text-blue-600 cursor-pointer hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out">Register</a>
                    </p>
                </form>
            </div>
        </div>
    )
}