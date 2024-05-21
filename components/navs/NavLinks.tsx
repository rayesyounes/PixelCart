"use client";
import {cn} from "@/lib/ts/utils";
import Link from "next/link";
import {links} from "@/lib/ts/links";
import {usePathname} from "next/navigation";
import {useEffect} from "react";

export default function NavLinks() {
    const location = usePathname();

    useEffect(() => {
        console.log(location);
    }, [location]);

    return (
        <div className="hidden md:flex justify-center items-center col-span-6 gap-x-2">
            {links.map((link) => (
                <Link
                    href={link.href}
                    key={link.id}
                    className={cn(location === link.href
                            ? "bg-muted" : "hover:bg-muted hover:bg-opacity-75",
                        "group flex items-center sm px-3 py-2 font-medium rounded-md"
                    )}
                >
                    {link.name}
                </Link>
            ))}
        </div>
    );
}