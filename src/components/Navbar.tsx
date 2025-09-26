import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg sticky-top" aria-label="Main navigation">
      <div className="container py-2">
        <Link className="navbar-brand fw-bold" href="/">
          <span className="text-primary">happy</span> crumbs
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
          aria-controls="mainNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item"><a className="nav-link" href="#menu">Menu</a></li>
            <li className="nav-item"><a className="nav-link" href="#contact">Contact</a></li>
          </ul>
          <div className="ms-lg-3">
            <a className="btn btn-primary btn-sm" href="#order">Order Now</a>
          </div>
        </div>
      </div>
    </nav>
  );
}


