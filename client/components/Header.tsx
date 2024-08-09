import {CurrentUser} from "@/interfaces/current-user.interface";
import Link from "next/link";

interface HeaderProps {
    currentUser: CurrentUser | null;
}

interface LinkConfig {
    label: string;
    href: string;
}

const Header = ({currentUser}: HeaderProps) => {
    const links: LinkConfig[] = [
        !currentUser && {label: 'Sign Up', href: '/auth/signup'},
        !currentUser && {label: 'Sign In', href: '/auth/signin'},
        currentUser && {label: 'Sign Out', href: '/auth/signout'},
    ].filter((linkConfig): linkConfig is LinkConfig => Boolean(linkConfig));

    return (
        <nav className="navbar navbar-dark bg-dark py-3">
            <div className="container d-flex justify-content-between align-items-center">
                <Link className="navbar-brand fw-bold" href="/">
                    AppTix
                </Link>
                <ul className="navbar-nav d-flex flex-row align-items-center">
                    {links.map(({label, href}, index) => (
                        <li key={index} className="nav-item me-3">
                            <Link
                                className={`btn ${label === "Sign Up" ? "btn-primary" : "btn-outline-light"}`}
                                href={href}
                            >
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default Header;
