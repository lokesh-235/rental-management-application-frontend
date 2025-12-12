import './navbar.css';

export default function NavBar(){
    return (
        <nav className="navbar">
        <div className="container">
          <div className="logo">RentalMgmt</div>
          <div className="nav-links">
            <a href="#">Home</a>
            <a href="#">About</a>
            <a href="/login">Login</a>
            <a href="/register">Signup</a>
          </div>
        </div>
      </nav>
    );
}