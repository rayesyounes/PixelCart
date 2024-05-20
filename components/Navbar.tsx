import Link from "next/link";
import NavLinks from "./NavLinks";
import {Button} from "@/components/ui/button";
import {MobileMenu} from "@/components/MobileMenu";

export default async function Navbar() {

    return (
        <nav className="relative max-w-7xl w-full flex md:grid md:grid-cols-12 items-center px-4 md:px-8 mx-auto py-7">
            <div className="md:col-span-3">
                <Link href="/public">
                    <h1 className="text-2xl font-semibold ">
                        Pixel<span className="font-bold text-primary">Cart</span>
                    </h1>
                </Link>
            </div>

            <NavLinks/>

            <div className="flex items-center gap-x-2 ms-auto md:col-span-3">
                <Button>
                    Sign In
                </Button>
                <Button variant="secondary">
                    Sign Up
                </Button>

                <div className="md:hidden">
                    <MobileMenu/>
                </div>
            </div>
        </nav>
    );
}