import React, { useEffect,useState } from "react"
import UserNavbar from "../UserNavbar/UserNavbar"
import UserSearchBar from "../UserSearchBar/UserSearchBar"
import { Link } from "react-router-dom"
function LostItemsPage() {
    const [lost, setLost] = useState([])
    useEffect(()=>{
        const getLost = async () => {
            await fetch(`http://localhost:8000/posts/latest/all/lost`, {
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
                            setLost(data);
                        }
                        else {
                            setLost([data]);
                        }
                    }
                })
        }; getLost();
    },[])
    const lostItems = lost.map((lost, key) => (
        <div className="col-xs-12 col-sm-6 col-md-4" key={key}>
            <div className="card mb-4 itemHover">
                <div className="view overlay">
                    <img className="card-img-top" height="250" src={'http://localhost:8000/public/' + lost.image} alt={lost.image} />
                    <div className="mask rgba-white-slight mx-2 mt-1">
                        {lost.date.slice(0, 10) + ' ' + lost.date.slice(11, 16)}
                    </div>

                </div>
                <div className="card-body">
                    <h4 className="card-title">{lost.title}</h4>
                    <p className="card-text">{lost.country + "-" + lost.city}</p>

                    <button type="button" className="btn btn-warning btnMore"><Link to={`/PostDetails/${lost._id}`} style={{ textDecoration: 'none', color: 'black' }} > Read more</Link></button>
                </div>
            </div>
        </div>
    ));
    return (
        <>
            <UserNavbar></UserNavbar>
            <div style={{ marginTop: '100px' }}>
                <UserSearchBar></UserSearchBar>
            </div>
            <div className="container">
            <div className="card-deck row">
                    {lostItems}

                </div>
            </div>

        </>
    )
}

export default LostItemsPage