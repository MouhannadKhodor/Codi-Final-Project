import React, { useEffect } from "react"
import './UserSearchBar.css'
function UserSearchBar() {
  return (
    <div className="container mt-5"  >
      <center >
        <div style={{ display: 'flex', justifyContent: 'center' }} >
          <div className="searchDiv" style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="col-rt-3 equal-height" style={{ width: '300px' }}>
              <div className="sb-example-3">
                <div className="search__container">
                  <input className="search__input" type="text" placeholder="Search" />
                </div>
              </div>
            </div>
            <button className="btn  text-light advancedBtn shadow-none"> <span className="rotate">ADVANCED</span></button>
          </div>
        </div>
      </center>
    </div>
  )
}

export default UserSearchBar