import React, { useEffect, useContext } from "react"
import './UserNavbar.css'
import avatar from '../../Images/avatar.png'
import SessionContext from '../session/SessionContext';
import { Link } from 'react-router-dom';

function UserNavbar() {
    const {
        actions: { logout },

    } = useContext(SessionContext);
    return (
        <>
            <nav className="navbar navbar-expand-lg userNavbar fixed-top">
                <div style={{ display: 'flex' }}>
                    <Link className="navbar-brand" to="/Profile"><img src={avatar} className="navAvatar" alt="Avatar" width="40px" height="40px" /></Link>
                    <div className="dropdown show mt-2" style={{ marginLeft: '-10px' }}>
                        <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ backgroundColor: 'black',border:'none' }}>
                        </a>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                            <Link className="dropdown-item" to="/Profile">Profile</Link>
                            <Link className="dropdown-item" to="/Posts">Posts</Link>
                            <Link className="dropdown-item" to="/Messages">Messages</Link>
                                <hr />
                            <Link className="dropdown-item" to="#"><i className="fas fa-sign-out-alt" style={{ color: "#feab3b",fontSize:'20px' }} onClick={logout}></i></Link>
                        </div>
                    </div>
                </div>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="  collapse navbar-collapse " id="navbarNav">
                    <ul className="nav navbar-nav  mx-auto userNavarListItems">
                        <li className="nav-item active">
                            <Link className="nav-link " to="/HomeUser"><i className="fas fa-home"></i> </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/LostItems">Lost items</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/FoundItems">Found items</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link " to="/contactUs">Contact Us</Link>
                        </li>
                        <li className="nav-item mt-1">
                            <button className="btn navPostBtn"><i className="bi bi-plus-circle-dotted"></i>&nbsp;<Link to="/PostUpload" style={{ textDecoration: 'none', color: 'white' }}>POST</Link></button>
                        </li>
                    </ul>
                    <li className="nav-item lastNavItem">
                        <Link className="nav-link " style={{ display: "inline-block" }} to="/" onClick={logout}><i className="fas fa-power-off"></i></Link>
                    </li>
                </div>
            </nav>
        </>
    )
}

export default UserNavbar