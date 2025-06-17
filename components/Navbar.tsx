import React from 'react';
import Link from "next/link";
import Image from "next/image";
import NavItems from "@/components/ui/NavItems";

function Navbar() {
    return (
        <nav className="navbar">
            <Link href="/">
                <div className=" flex items-center gap-x-2.5 cursor-pointer">
                    <Image
                        src="/images/logo.svg"
                        alt="logo"
                        width={46}
                        height={46}
                    >
                    </Image>
                </div>
            </Link>

            <div className="flex items-center gap-8">
                <NavItems/>
            </div>
        </nav>
    );
}

export default Navbar;