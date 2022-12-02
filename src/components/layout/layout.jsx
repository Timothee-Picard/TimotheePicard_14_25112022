import {Link, useLocation} from "react-router-dom";
import { Outlet  } from "react-router-dom";

export default function Layout() {
    const path = useLocation();
    return (
        <>
            <header className="main-menu">
                <img src="/logo.jpg" alt="logo entreprise"/>
                {
                    (path.pathname == "/")? (<Link to="/employee-list">View employees list</Link>)
                        : <Link to="/" className="logo">Home</Link>
                }
            </header>
            <main>
                <Outlet />
            </main>
        </>
    )
}
