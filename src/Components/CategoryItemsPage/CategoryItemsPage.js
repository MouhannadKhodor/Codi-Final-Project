import React, { useEffect, useState } from "react"
import { useParams } from "react-router"
import Categories from "../Categories/Categories"
import UserNavbar from "../UserNavbar/UserNavbar"
import ReactLoading from 'react-loading';
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {useHistory} from "react-router-dom";
function CateegoryItemsPage() {
  let id = useParams()
  const [catPosts, setCatPosts] = useState([])
  const history = useHistory();
  useEffect(() => {
      const postByCat = async () => {
        await fetch(`http://localhost:8000/posts/catItems/${id.data}`, {
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
                setCatPosts(data);
              }
              else {
                setCatPosts([data]);
              }
            }
          })
      };
      postByCat()
      
     
  }, [id])

  
  const catItems = catPosts.map((post, key) => (
    <div className="col-xs-12 col-sm-6 col-md-4 w3-animate-zoom" key={key}>
      <div className="card mb-4 itemHover">
        <div className="view overlay">
          <img className="card-img-top" height="250" src={'http://localhost:8000/public/' + post.image} alt={post.image} />
          <div className="mask mx-2 mt-1">
            {post.date.slice(0, 10) + ' ' + post.date.slice(11, 16)}
          </div>

        </div>
        <div className="card-body">
          <h4 className="card-title">{post.title}</h4>
          <p className="card-text">{post.country + "-" + post.city}</p>

          <button type="button" className="btn btn-warning btnMore"> <Link to={`/PostDetails/${post._id}`} style={{ textDecoration: 'none', color: 'black' }} > Read more</Link></button>
        </div>
      </div>
    </div>
  ));
  



  return (
    <>
    <UserNavbar></UserNavbar>
    {(catPosts[0] == undefined) ? <center><ReactLoading type="balls" color="#feab3b" height={667} width={375} /></center> :
      
      <div style={{ marginTop: '50px' }}>
        <Categories ></Categories>
        <div className="container">
          <div className="card-deck row">
            {catItems}
          </div>
        </div>

      </div>}
    </>
  )
}

export default CateegoryItemsPage