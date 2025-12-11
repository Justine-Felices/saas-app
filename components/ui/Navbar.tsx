import React from 'react';
import Link from "next/link";
import Image from "next/image";
import NavItems from "@/components/ui/NavItems";
import {SignedIn, SignedOut, SignInButton, UserButton} from "@clerk/nextjs";

function Navbar() {
    return (
        <nav className="navbar">
            <Link href="/">
                <div className=" flex items-center gap-x-2.5 cursor-pointer">
                    <Image
                        src="/images/Kaulay Logo.PNG"
                        alt="logo"
                        width={96}
                        height={96}
                    >
                    </Image>
                </div>
            </Link>

            <div className="flex items-center gap-8">
                <NavItems/>
                <div className="flex items-center gap-4">
                    <SignedOut>
                        <SignInButton>
                            <button className="btn-signin">Sign in</button>
                        </SignInButton>
                    </SignedOut>
                    <SignedIn>
                        <UserButton/>
                    </SignedIn>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
