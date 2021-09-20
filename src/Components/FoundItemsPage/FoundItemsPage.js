import React, { useEffect } from "react"
import UserNavbar from "../UserNavbar/UserNavbar"
import UserSearchBar from "../UserSearchBar/UserSearchBar"

function FoundItemsPage() {
    return (
        <>
            <UserNavbar></UserNavbar>
            <div style={{ marginTop: '100px' }}>
                <UserSearchBar></UserSearchBar>
            </div>
        </>
    )
}

export default FoundItemsPage