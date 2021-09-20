import React, { useEffect, useState, useContext } from "react"
import './LoginPage.css'
import avatar from '../../Images/avatar.png'
import SessionContext from '../session/SessionContext'
import { Link } from "react-router-dom"
function LoginPage() {
  const {
    actions: { login }
  } = useContext(SessionContext);

  const [state, setValue] = useState({
    email: '',
    password: ''
  });

  const { email, password } = state;

  function setState(nextState) {
    setValue(prevState => ({
      ...prevState,
      ...nextState
    }))
  }

  function handleChange(e) {
    let { name, value } = e.target;
    setState({ [name]: value });
  }

  async function handleSubmit(e) {
    e.nativeEvent.preventDefault();
    login(state);
  }
  return (
    <div className="LoginPageMainDiv">
      <div className=" modal-login" >
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
                <label htmlFor="email">Email</label>
                <input type="text"
                  value={email}
                  onChange={handleChange}
                  className="form-control" name="email" placeholder="Email" required="required" />
              </div>
              <div className="form-group">
                <label htmlFor="password"> Password</label>
                <input type="password"
                  value={password}
                  onChange={handleChange}
                  className="form-control" name="password" placeholder="Password" required="required" />
              </div>
              <div className="form-group">
                <button className="btn" style={{ color: 'black', width: '100%' }} type="submit" onClick={handleSubmit}>Login</button>
                <p style={{ color: "white", float: 'right' }}>Not a user? &nbsp;<Link to="/Register" className="notAUserLoginBtn" style={{ color: "#feab3b" }}>Register</Link> </p>
              </div>

            </form>
          </div>
          <div className="modal-footer">
            <a href="#">Forgot Password?</a>
          </div>
        </div>
      </div>
    </div>


  )
}

export default LoginPage