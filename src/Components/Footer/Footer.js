import React, { useEffect } from "react"
import copy from '../../Images/copyright.png'
import info from '../../Images/information.png'
function Footer() {
    return (
        <>
            <div className=" bg-dark w-100" style={{ display: 'flex',marginTop:'120px' }}>
                <div className="firstPartFooter w-25">
                    <img src={copy} style={{ margin: '7px' }} alt="" width="35px" height="35px" />
                    <span style={{ color: '#feab3b' }}>All right reerved To MOE</span>
                </div>
                <div className="secondPartFooter w-75">
                    <img src={info} className="float-right" style={{ margin: '7px' }} alt="" width="35px" height="35px" />
                </div>
            </div>
        </>
    )
}

export default Footer