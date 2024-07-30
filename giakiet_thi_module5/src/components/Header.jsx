import React from "react";
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <header>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg bg-body">
                <div className="container-fluid">
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-mdb-target="#navbarExample01"
                        aria-controls="navbarExample01"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <i className="fas fa-bars"></i>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarExample01">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item active">
                                <Link to="/product" className="nav-link" aria-current="page">
                                    Product
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    to="/product/create"
                                    className="nav-link"
                                    aria-current="page"
                                >
                                    Create Product
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/test" className="nav-link" aria-current="page">
                                    Test
                                </Link>
                            </li>
                            <li className="nav-item">
                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                <a className="nav-link" href="#">
                                    About
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            {/* Navbar */}

            {/* Jumbotron */}
            <div className="p-5 text-center bg-body-tertiary">
                <h1 className="mb-3">Heading</h1>
                <h4 className="mb-3">Subheading</h4>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a
                    className="btn btn-primary"
                    href=""
                    role="button"
                >
                    Call to action
                </a>
            </div>
            {/* Jumbotron */}
        </header>
    );
};

export default Header;
