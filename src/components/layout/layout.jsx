import {Link, useLocation} from "react-router-dom";
import { Outlet  } from "react-router-dom";

export default function Layout() {
    const path = useLocation();
    return (
        <>
            <header className="main-menu">
                {
                    (path.pathname == "/")? (<Link to="/employee-list">View employees list</Link>) : null
                }
                <Link to="/" className="logo"><img src="/logo.jpg" /></Link>
            </header>
            <main>
                <Outlet />
            </main>
        </>
    )
}
