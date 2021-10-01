import axios from "axios"
import React, { useState } from "react"
import { getCookie } from "../../cookies"
import UserNavbar from "../UserNavbar/UserNavbar"
import './UserProfile.css'
import { toast } from "react-toastify"
function UserProfile() {

  const [username, setusername] = useState(getCookie('username'))
  const [email, setEmail] = useState(getCookie('email'))
  const [password, setPassword] = useState("")

  const updateUser = () => {
    const data = {}
    data['username'] = username;
    data['email'] = email;
    data['password'] = password;

    axios.patch(`http://localhost:8000/api/user/${getCookie('id')}`, data)
    .then(res=>toast.success("Profile has been updated", {
      autoClose: 2500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      }))
  }



  return (
    <>
      <UserNavbar></UserNavbar>
      <div className="page-content page-container " id="page-content">
        <div className="padding">
          <div className="row container d-flex justify-content-center">
            <div className="col-xl-6 col-md-12">
              <div className="card user-card-full">
                <div className="row m-l-0 m-r-0">
                  <div className="col-sm-12">
                    <div className="card-block">
                      <h6 className="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
                      <div className="row">
                        <div className="col-sm-6">
                          <p className="m-b-10 f-w-600">Username</p>
                          <input onChange={(e) => { setusername(e.target.value) }} className="form-control" type="text" defaultValue={username} />
                        </div>

                      </div>
                      <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Credentials</h6>
                      <div className="row">
                        <div className="col-sm-6">
                          <p className="m-b-10 f-w-600">Email</p>
                          <input onChange={(e) => { setEmail(e.target.value) }} className="form-control" type="text" defaultValue={email} />
                        </div>
                        <div className="col-sm-6">
                          <p className="m-b-10 f-w-600">Password</p>
                          <input onChange={(e) => { setPassword(e.target.value) }} className="form-control" type="password" />
                        </div>
                      </div>
                      
                        <hr />
                    
                     
                        <div>
                          <button onClick={updateUser} type="submit" className="btn btn-warning pull-right">Update</button>
                          <br />
                          <br />
                        </div>
                     
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserProfile