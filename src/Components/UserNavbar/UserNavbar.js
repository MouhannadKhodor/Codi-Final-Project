import React, { useEffect, useContext  } from "react"
import './UserNavbar.css'
import avatar from '../../Images/avatar.png'
import SessionContext from '../session/SessionContext';
import { Link } from 'react-router-dom';
function UserNavbar() {
    const {
        actions: { logout },
        session: { user: { access_token, role } }
      } = useContext(SessionContext);
    return (
        <>
            <nav className="navbar navbar-expand-lg userNavbar fixed-top">
                <a className="navbar-brand" href="#"><img src={avatar} className="navAvatar" alt="Avatar" width="40px" height="40px" /></a>
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
                            <a className="nav-link " href="#">Contact Us</a>
                        </li>
                        <li className="nav-item">
                            <button className="btn navPostBtn"><i className="bi bi-plus-circle-dotted"></i>&nbsp;<Link to="/PostUpload" style={{textDecoration:'none',color:'white'}}>POST</Link></button>
                        </li>
                    </ul>
                    <li className="nav-item lastNavItem">
                            <Link className="nav-link " style={{display:"inline-block"}} to="/login" onClick={logout}><i className="fas fa-power-off"></i></Link>
                    </li>
                </div>
            </nav>
        </>
    )
}

export default UserNavbar