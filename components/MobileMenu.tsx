"use client";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import {Menu} from "lucide-react";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {links} from "@/lib/links";
import {usePathname} from "next/navigation";
import {useEffect} from "react";


export function MobileMenu() {
    const location = usePathname();

    useEffect(() => {
        console.log(location);
    }, [location]);

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                    <Menu className="w-4 h-4"/>
                </Button>
            </SheetTrigger>
            <SheetContent>
                <div className="mt-5 flex px-2 space-y-1 flex-col">
                    {links.map((link) => (
                        <Link
                            href={link.href}
                            key={link.id}
                            className={cn(
                                location === link.href
                                    ? "bg-muted"
                                    : "hover:bg-muted hover:bg-opacity-75",
                                "group flex items-center px-2 py-2 font-medium rounded-md"
                            )}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
            </SheetContent>
        </Sheet>
    );
}