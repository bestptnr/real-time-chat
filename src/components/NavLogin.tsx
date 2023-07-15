import React from "react";
import {
    Navbar,
    MobileNav,
    Typography,
    Button,
    IconButton,
    Collapse,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import Cookies from "universal-cookie";
import { signOut } from "firebase/auth";
const cookies = new Cookies()
export default function NavLogin() {
    const [openNav, setOpenNav] = React.useState(false);
    const auth = getAuth();
    const [user, setUser] = React.useState<any>({});

    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false)
        );
    }, []);
    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);

        });
        return () => {
            unsubscribe();
        };
    }, []);

    const navList = (
        <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <a href="#" className="flex items-center">
                    About
                </a>
            </Typography>

        </ul>
    );

    return (
        <React.Fragment>
            <Navbar className="sticky top z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4">
                <div className="flex items-center justify-between text-blue-gray-900">
                    <Typography
                        as="a"
                        href="/"
                        className="mr-4 cursor-pointer py-1.5 font-medium font-bold"
                    >
                        ComChat
                    </Typography>
                    <div className="flex items-center gap-4">
                        <div className="mr-4 hidden lg:block">{navList}</div>

                        <Button
                            variant="gradient"
                            size="sm"
                            className="hidden lg:inline-block"
                        >
                            <span>{user.displayName}</span>
                        </Button>

                        <Button
                            variant="gradient"
                            size="sm"
                            className="hidden lg:inline-block"
                            onClick={async () => {
                                await signOut(auth)
                                cookies.remove("auth");
                                window.location.href = '/'

                            }}
                        >
                            <span>SignOut</span>
                        </Button>
                        <IconButton
                            variant="text"
                            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                            ripple={false}
                            onClick={() => setOpenNav(!openNav)}
                        >
                            {openNav ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    className="h-6 w-6"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            )}
                        </IconButton>
                    </div>
                </div>

                <Collapse open={openNav}>
                    {navList}

                    <Button variant="gradient" size="sm" fullWidth className="mb-2">
                        <span>{user.displayName}</span>
                    </Button>

                    <Button variant="gradient" size="sm" fullWidth className="mb-2" onClick={async () => {
                        await signOut(auth)
                        cookies.remove("auth");
                        window.location.href = '/'

                    }}>
                        <span>SignOut</span>
                    </Button>
                 
                </Collapse>


            </Navbar>

        </React.Fragment>
    );
}