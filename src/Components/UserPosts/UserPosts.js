import React, { useEffect, useState } from "react"
import UserNavbar from "../UserNavbar/UserNavbar"
import { Link } from "react-router-dom";
import {toast} from 'react-toastify'
import { getCookie } from "../../cookies";

function UserPosts() {

    const userID = getCookie('id')
    const [found, setFound] = useState([])
    const [del,setDel] = useState()

   
    const handleDelete = (id) =>{
        setDel(id)
        deletePost()
        
    }
    const deletePost = async () => {
        await fetch(`http://localhost:8000/posts/${del}`, {
                method: "delete"
            })
            toast.success("Post has been deleted", {
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
    }
    useEffect(() => {
        const getFound = async () => {
            await fetch(`http://localhost:8000/posts/user/${userID}`, {
                method: "get",

                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })
                .then((response) => response.json()) //2
                .then((data) => {
                    if (data) {
                        if (typeof data[0] === 'object') {
                            setFound(data);
                        }
                        else {
                            setFound([data]);
                        }
                    }
                })
        }; getFound();
    },[deletePost])
    const foundItems = found.map((found, key) => (
        <div className="col-xs-12 col-sm-6 col-md-4 " key={key}>
            <div className="card mb-4 itemHover">
                <div className="view overlay">
                    <img className="card-img-top" height="250" src={'http://localhost:8000/public/' + found.image} alt={found.image} />
                    <div className="mask mx-2 mt-1">
                        {found.date.slice(0, 10) + ' ' + found.date.slice(11, 16)}
                    </div>


                </div>
                <div className="card-body">
                    <h4 className="card-title">{found.title}</h4>
                    <p className="card-text">{found.country + "-" + found.city}</p>

                    <button type="button" className="btn btn-warning btnMore"> <Link to={`/PostEdit/${found._id}`} style={{ textDecoration: 'none', color: 'black' }} > Edit</Link></button>
                    <button type="button" id={found._id} className="btn btn-warning btnMore mx-3"onMouseOver={(e)=>{setDel(e.target.id)}} onClick={(e)=>{handleDelete(e.target.id)}} > Delete </button>
                </div>  
            </div>
        </div>
    ));
    
    return (
        <>
            <UserNavbar></UserNavbar>
            <div className="container" style={{marginTop:'120px'}}>
                <div className="card-deck row">
                    {foundItems}
                </div>
            </div>

        </>
    )
}

export default UserPosts