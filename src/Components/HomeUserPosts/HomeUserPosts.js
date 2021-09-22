import React, { useEffect, useState } from "react"
import './HomeUserPosts.css'
import UserNavbar from "../UserNavbar/UserNavbar"
import ImageSlider from "../ImageSlider/ImageSlider"
import UserSearchBar from "../UserSearchBar/UserSearchBar"
import Footer from "../Footer/Footer"
import PostUpload from "../PostUpload/PostUpload"
import PostDetails from '../PostDetails/PostDetails'
import { Redirect } from "react-router"
import { Link } from 'react-router-dom'
import Categories from "../Categories/Categories"

function HomeUserPosts() {
    const [found, setFound] = useState([])
    const [lost, setLost] = useState([])

    useEffect(() => {
        const getFound = async () => {
            await fetch('http://localhost:8000/posts/latest/found', {
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

        const getLost = async () => {
            await fetch('http://localhost:8000/posts/latest/lost', {
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
    }, [])
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

                    <button type="button" className="btn btn-warning btnMore"> <Link to={`/PostDetails/${found._id}`} style={{ textDecoration: 'none', color: 'black' }} > Read more</Link></button>
                </div>
            </div>
        </div>
    ));
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
            {/* <PostUpload></PostUpload> */}
            <UserNavbar></UserNavbar>
            <ImageSlider></ImageSlider>
            {/* <UserSearchBar></UserSearchBar> */}
            <Categories></Categories>

            <div className="container">


                <div className="HrContent"><span><h4>Latest Found Items</h4></span><hr /></div>
                <div className="card-deck row">
                    {foundItems}
                </div>
                <div className="form-group">
                    <button className=" viewMoreBtn btn-lg float-right"
                        type="submit">
                            <Link to="/FoundItems" style={{textDecoration:'none',color:'black'}}>View More</Link>
                        
                        <i className="bi bi-chevron-right moreShevronIcon" style={{ color: 'black' }}></i>
                    </button>
                </div>
                <div>&nbsp;</div>
                <div>&nbsp;</div>
                <div className="HrContent"><span><h4>Latest Lost Items</h4></span><hr /></div>
                <div className="card-deck row">
                    {lostItems}

                </div>
                <div className="form-group">
                    <button className=" viewMoreBtn btn-lg float-right"
                        type="submit">
                            <Link to="/LostItems" style={{textDecoration:'none',color:'black'}}>View More</Link>

                        <i className="bi bi-chevron-right moreShevronIcon" style={{ color: 'black' }}></i>
                    </button>
                </div>
            </div>
            <Footer></Footer>

        </>
    )
}

export default HomeUserPosts

