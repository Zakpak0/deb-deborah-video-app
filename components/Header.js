import Image from "next/image";
import HeaderItem from "./HeaderItem";
import {
    BadgeCheckIcon,
    CollectionIcon,
    HomeIcon,
    LightningBoltIcon,
    SearchIcon,
    UserIcon,
    UploadIcon
} from "@heroicons/react/outline"
import { useRouter } from "next/router";
import { authentication } from "../firebase/index";

export default function Header() {
    const router = useRouter();
    const auth = authentication?.currentUser
    const routes = [
        { name: "HOME", icon: HomeIcon, auth: false }, { name: "TRENDING", icon: LightningBoltIcon, auth: false },
        { name: "VERIFIED", icon: BadgeCheckIcon, auth: false }, { name: "COLLECTIONS", icon: CollectionIcon, auth: false },
        { name: "SEARCH", icon: SearchIcon, auth: false }, { name: auth ? "ACCOUNT" : "LOGIN", icon: UserIcon, auth: false },
        { name: "UPLOAD", icon: UploadIcon, auth: true }
    ]
    return (
        <header className="flex flex-col sm:flex-row m-5 justify-end
    items-center h-auto mt-10">
            <div className="flex flex-grow justify-evenly max-w-2xl">
                {routes.map(({ name, icon, auth: required }) => {
                    const route = "/" + (name == "HOME" ? "" : name.toLowerCase())
                    const path = router.pathname.replace("/", " ").toUpperCase().trim()
                    if (name == path) {
                        return
                    } else if (required) {
                        if (!auth) return
                        return <HeaderItem title={name} onClick={() => router.push(route)} key={name} Icon={icon} />
                    } else {
                        return <HeaderItem title={name} onClick={() => router.push(route)} key={name} Icon={icon} />
                    }
                })}
            </div>
        </header>
    )
}
