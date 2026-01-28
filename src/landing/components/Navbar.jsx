import { Link } from "react-router";

export default function Navbar() {
  return (
    <>
      <header className="flex px-10 items-center">
        <div className="flex px-10 py-2 items-center gap-4">
            <div className="w-10 rounded-md bg-slate-300">
                <img src="/DS_new.png" alt="Dhanya Sethu Logo" />
            </div>
            <div className="text-4xl font-medium ">
                Dhanya Sethu
            </div>
        </div>
        <div>
            <nav className="flex list-none gap-8">
                

                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
                
            </nav>
        </div>
      </header>
    </>
  );
}
