import React, { useEffect,useState } from "react"
import img1 from '../../Images/88h.jpg'
import './PostDetails.css'
import UserNavbar from "../UserNavbar/UserNavbar"
import msg from "../../Images/send.png"
import Footer from "../Footer/Footer"
import { useParams } from 'react-router-dom';
import ReactLoading from 'react-loading';
function PostDetails() {

    let id = useParams()
    const [post, setPost] = useState([]);
    
    
    useEffect(() => {
        const request = async () => {
            console.log("i am here");
            await fetch(`http://localhost:8000/posts/${id.id}`, {
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
                            setPost(data);
                        }
                        else {
                            setPost([data]);
                        }
                    }
                })
         }
        request();

        
    },[])
    
    // console.log(id)
    console.log(post[0])
    
    return (
        <>
            { (post[0]==undefined) ?<center><ReactLoading type="balls" color="#feab3b" height={667} width={375} /></center>  : 
            
            <>
            <UserNavbar></UserNavbar>
            <div className="container" style={{ marginTop: '120px' }}>
                <div className="card"  style={{ border: 'none' }}>
                    <div className="row">
                        <div className="col col-sm-5 col-md-6 w-50 " >
                            <div className="item-gallery PostDetailImg" style={{ height: '100%' }}>
                                <img src={ 'http://localhost:8000/public/' + post[0].image} width="100%" height="70%" style={{ marginTop: '30px' }} alt={post[0].image} />
                            </div>
                        </div>
                        <aside className="col-sm-7 col-md-6">
                            <article className="card-body p-5">
                                <h3 className="title mb-3 text-warning">{post[0].title}</h3>

                                <dl className="item-property">
                                    <dt>Description</dt>
                                    <dd><p>{post[0].description}</p></dd>
                                </dl>
                                <dl className="param param-feature">
                                    <dt>Type</dt>
                                    <dd>{post[0].type}</dd>
                                </dl>
                                <dl className="param param-feature">
                                    <dt>Color</dt>
                                    <dd>Black and white</dd>
                                </dl>
                                <dl className="param param-feature">
                                    <dt>Location</dt>
                                    <dd>{post[0].country}, {post[0].city}</dd>
                                </dl>
                                <dl className="param param-feature">
                                    <hr />
                                    <dd>
                                    <button className="btn btn-warning" value="send a message" style={{ float: 'right' }} >
                                            <div style={{ display: 'inline-block' }}>
                                                <div className="imgWrapper" style={{ border: '2px dotted white', borderRadius: '50%' }}>
                                                    <img src={msg} width="20px" height="20px" />
                                                </div>
                                            </div>
                                            &nbsp;message
                                        </button>
                                        <button className="btn btn-warning" value="send a message" style={{ float: 'right',marginRight:"10px" }} >
                                            <div style={{ display: 'inline-block' }}>
                                                <div className="imgWrapper" style={{ border: '2px dotted white', borderRadius: '50%' }}>
                                                    <i className="bi bi-star" style={{color:'white'}}></i>
                                                </div>
                                            </div>
                                            &nbsp;add to favorites
                                        </button>
                                    </dd>
                                </dl>


                            </article>
                        </aside>
                    </div>
                </div>
            </div>

            {/* --------------------------------------3 items in the same area---------------------------------------------- */}
            <div className="container">


                <div className="HrContent"><span>Items in the same area</span><hr /></div>
                <div className="card-deck row">
                    <div className="col-xs-12 col-sm-6 col-md-4">
                        <div className="card mb-4">
                            <div className="view overlay">
                                <img className="card-img-top" src="https://mdbootstrap.com/img/Photos/Others/images/15.jpg" alt="Card image cap" />
                                <a href="#!">
                                    <div className="mask rgba-white-slight"></div>
                                </a>
                            </div>
                            <div className="card-body">
                                <h4 className="card-title">7 Card title</h4>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <button type="button" className="btn btn-light-blue btn-md">Read more</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-6 col-md-4">
                        <div className="card mb-4">
                            <div className="view overlay">
                                <img className="card-img-top" src="https://mdbootstrap.com/img/Photos/Others/images/15.jpg" alt="Card image cap" />
                                <a href="#!">
                                    <div className="mask rgba-white-slight"></div>
                                </a>
                            </div>
                            <div className="card-body">
                                <h4 className="card-title">7 Card title</h4>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <button type="button" className="btn btn-light-blue btn-md">Read more</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-6 col-md-4">
                        <div className="card mb-4">
                            <div className="view overlay">
                                <img className="card-img-top" src="https://mdbootstrap.com/img/Photos/Others/images/15.jpg" alt="Card image cap" />
                                <a href="#!">
                                    <div className="mask rgba-white-slight"></div>
                                </a>
                            </div>
                            <div className="card-body">
                                <h4 className="card-title">7 Card title</h4>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <button type="button" className="btn btn-light-blue btn-md">Read more</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-6 col-md-4">
                        <div className="card mb-4">
                            <div className="view overlay">
                                <img className="card-img-top" src="https://mdbootstrap.com/img/Photos/Others/images/15.jpg" alt="Card image cap" />
                                <a href="#!">
                                    <div className="mask rgba-white-slight"></div>
                                </a>
                            </div>
                            <div className="card-body">
                                <h4 className="card-title">7 Card title</h4>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <button type="button" className="btn btn-light-blue btn-md">Read more</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-6 col-md-4">
                        <div className="card mb-4">
                            <div className="view overlay">
                                <img className="card-img-top" src="https://mdbootstrap.com/img/Photos/Others/images/15.jpg" alt="Card image cap" />
                                <a href="#!">
                                    <div className="mask rgba-white-slight"></div>
                                </a>
                            </div>
                            <div className="card-body">
                                <h4 className="card-title">7 Card title</h4>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <button type="button" className="btn btn-light-blue btn-md">Read more</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-6 col-md-4">
                        <div className="card mb-4">
                            <div className="view overlay">
                                <img className="card-img-top" src="https://mdbootstrap.com/img/Photos/Others/images/15.jpg" alt="Card image cap" />
                                <a href="#!">
                                    <div className="mask rgba-white-slight"></div>
                                </a>
                            </div>
                            <div className="card-body">
                                <h4 className="card-title">7 Card title</h4>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <button type="button" className="btn btn-light-blue btn-md">Read more</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </>}
        </>
    )
}

export default PostDetails