import React, { useEffect, useState } from "react"
import './RegisterPage.css'
import axios from 'axios'
import avatar from '../../Images/avatar.png'
import { Link } from "react-router-dom"
import { Redirect } from "react-router";
function RegisterPage() {
  const [username,setUsername] = useState();
  const [email,setEmail] = useState();
  const [password,setPasword] = useState();
  const [role,setRole] = useState(1)
  const register =async  (e) => {
        e.preventDefault();
        await fetch('http://localhost:8000/api/user/register', {
          method: "post",
          body: JSON.stringify({ username, email, password,role}),
          headers: { 'Content-Type': 'application/json' },

      })
    
}
  return (
    <div className="LoginPageMainDiv">
        <div className=" modal-login" style={{marginTop:'120px'}} >
          <div className="modal-content" >
            <div className="modal-header" >
              <div className="avatar">
                <img src={avatar} alt="Avatar" />
              </div>
              <h4 className="modal-title">Get Started</h4>
            </div>
            <div className="modal-body">
              <form method="post">
                <div className="form-group">
                  <label htmlFor="username"> Username</label>
                  <input onChange={(e)=>{setUsername(e.target.value)}} type="text" className="form-control" name="username" placeholder="Username" required="required" />
                </div>
                <div className="form-group">
                  <label htmlFor="email"> Email</label>
                  <input  onChange={(e)=>{setEmail(e.target.value)}} type="text" className="form-control" name="email" placeholder="Email" required="required" />
                </div>
                <div className="form-group">
                <label htmlFor="password"> Password</label>
                  <input onChange={(e)=>{setPasword(e.target.value)}} type="password" className="form-control" name="password" placeholder="Password" required="required" />
                </div>
                <div className="form-group">
                    <button  className="btn" onClick={register} style={{color:'black',width:'100%'}}><Link to="/login" style={{textDecoration:'none',color:"black"}}>Register</Link></button>
                </div>
              </form>
            </div>
            
          </div>
        </div>
      </div>

    
  )
}

export default RegisterPage