import Link from "next/link";
import UserNav from "@/components/UserNav";
import NavLinks from "@/components/NavLinks";
import {Button} from "@/components/ui/button";
import {MobileMenu} from "./MobileMenu";
import {LoginLink, RegisterLink} from "@kinde-oss/kinde-auth-nextjs/components";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";

export default async function NavBar() {
    const {getUser} = getKindeServerSession();
    const user = await getUser();
    return (
        <nav className="relative max-w-7xl w-full flex md:grid md:grid-cols-12 items-center px-4 md:px-8 mx-auto py-7">
            <div className="md:col-span-3">
                <Link href="/">
                    <h1 className="text-2xl font-semibold ">
                        Pixel<span className="text-primary">Cart</span>
                    </h1>
                </Link>
            </div>

            <NavLinks/>

            <div className="flex items-center gap-x-2 ms-auto md:col-span-3">
                {user ? (
                    <UserNav
                        email={user.email as string}
                        name={user.given_name as string}
                        userImage={
                            user.picture ?? `https://avatar.vercel.sh/${user.given_name}`
                        }
                    />
                ) : (
                    <div className="flex items-center gap-x-2">
                        <Button asChild>
                            <LoginLink>Login</LoginLink>
                        </Button>
                        <Button variant="secondary" asChild>
                            <RegisterLink>Register</RegisterLink>
                        </Button>
                    </div>
                )}

                <div className="md:hidden">
                    <MobileMenu/>
                </div>
            </div>
        </nav>
    );
}