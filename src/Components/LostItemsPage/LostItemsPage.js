import React, { useEffect } from "react"
import UserNavbar from "../UserNavbar/UserNavbar"
import UserSearchBar from "../UserSearchBar/UserSearchBar"

function LostItemsPage() {
    return (
        <>
            <UserNavbar></UserNavbar>
            <div style={{ marginTop: '100px' }}>
                <UserSearchBar></UserSearchBar>
            </div>
            <div className="container">

            </div>

        </>
    )
}

export default LostItemsPage