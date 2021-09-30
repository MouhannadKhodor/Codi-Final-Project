import React, { useEffect, useState } from "react"
import img1 from '../../Images/88h.jpg'
import './PostDetails.css'
import UserNavbar from "../UserNavbar/UserNavbar"
import msg from "../../Images/send.png"
import Footer from "../Footer/Footer"
import { useParams } from 'react-router-dom';
import ReactLoading from 'react-loading';
import { Link } from 'react-router-dom'
import { getCookie } from '../../cookies'
import Modal from 'react-modal'
import { toast } from "react-toastify"
import axios from "axios"
import { Redirect } from "react-router"

function PostDetails() {

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: '50%',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            border: "1px solid #feab3b"
        }
    };
    const [message, setMessage] = useState('')
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const setModalIsOpenToTrue = () => {
        setModalIsOpen(true)
    }
    const setModalIsOpenToFalse = () => {
        setModalIsOpen(false)
    }
    let user = getCookie('id');
    let id = useParams()
    const [post, setPost] = useState([]);
    const [postData, setPostData] = useState([])
    const [userData, setUserData] = useState([])

    useEffect(() => {
        const request = async () => {

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

    }, [id])
    useEffect(() => {
        if (!post.length) {
            console.log("getting user data");
        } else {
            fetch(`http://localhost:8000/api/user/${post[0].userID}`, {
                method: "get",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            }).then((response) => response.json()) //2
                .then((data) => {
                    if (data) {
                        if (typeof data[0] === 'object') {
                            setUserData(data);
                        }
                        else {
                            setUserData([data]);
                        }
                    }
                })
        }
    }, [post])
    useEffect(() => {
        if (post[0] == undefined) {
            return console.log("it is still undefined")
        }
        else {
            const order = async () => {
                await fetch(`http://localhost:8000/posts/latest/sameArea/${post[0].city}`, {
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
                                setPostData(data);
                            }
                            else {
                                setPostData([data]);
                            }
                        }
                    })
            };
            order()
        }

    }, [post])

    const postArea = postData.map((data, key) => (
        <div className="col-xs-12 col-sm-6 col-md-4 " key={key}>
            <div className="card mb-4 itemHover">
                <div className="view overlay">
                    <img className="card-img-top" height="250" src={'http://localhost:8000/public/' + data.image} alt={data.image} />
                    <div className="mask mx-2 mt-1">
                        {data.date.slice(0, 10) + ' ' + data.date.slice(11, 16)}
                    </div>
                </div>
                <div className="card-body">
                    <h4 className="card-title">{data.title}</h4>
                    <p className="card-text">{data.country + "-" + data.city}</p>

                    <button type="button" className="btn btn-warning btnMore"> <Link to={`/PostDetails/${data._id}`} style={{ textDecoration: 'none', color: 'black' }} > Read more</Link></button>
                </div>
            </div>
        </div>
    ));
    const sendMessage = async () => {

        if (userData[0] === undefined) {
            console.log("still")
        } else {
            if(message === undefined || message ==""){
                return toast.error("message must not be empty")
            }
            else{
                const fdata = {};
            fdata['senderID'] = getCookie('id');
            fdata['receiverID'] = userData[0].id;
            fdata['senderUsername'] = getCookie('username');
            fdata['receiverUsername'] = userData[0].username;
            fdata['message'] = message;

            axios.post("http://localhost:8000/messages", fdata)

            toast.success("message has been sent", {
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setModalIsOpenToFalse();
            
            }
        }
    }
    return (
        <>
            {(post[0] === undefined) ? <center><ReactLoading type="cylon" color="#feab3b" height={667} width={375} /></center> :
                <>
                    <UserNavbar></UserNavbar>
                    <div className="container" style={{ marginTop: '120px' }}>
                        <div className="card" style={{ border: 'none' }}>
                            <div className="row">
                                <div className="col col-sm-5 col-md-6  " >
                                    <div className="item-gallery PostDetailImg" style={{ height: '100%' }}>
                                        <img src={'http://localhost:8000/public/' + post[0].image} width="100%" height="80%" style={{ marginTop: '30px', borderRadius: '30px' }} alt={post[0].image} />
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
                                                <button onClick={setModalIsOpenToTrue} className="btn btn-warning" value="send a message" style={{ float: 'right' }} >
                                                    <div style={{ display: 'inline-block' }}>
                                                        <div className="imgWrapper" style={{ border: '2px dotted white', borderRadius: '50%' }}>
                                                            <img src={msg} width="20px" height="20px" alt="msgIcon" />
                                                        </div>
                                                    </div>
                                                    &nbsp;message
                                                </button>
                                            </dd>
                                        </dl>
                                    </article>
                                </aside>
                            </div>
                        </div>
                    </div>
                    {/* -------------------------------------- items in the same area---------------------------------------------- */}
                    <div className="container">
                        <div className="HrContent"><span><h4>Posts from the same area</h4></span><hr /></div>
                        <div className="card-deck row">
                            {postArea}
                        </div>
                    </div>
                    <Footer></Footer>
                </>
            }

            <Modal style={customStyles} isOpen={modalIsOpen} ariaHideApp={false}>
                <button onClick={setModalIsOpenToFalse}
                    style={{
                        border: '1px solid black',
                        borderRadius: '50%',
                        width: '30px',
                        height: '30px',
                        backgroundColor: 'black',
                        color: 'white'
                    }}
                >x</button>

                <div className="input-group" style={{
                    display: 'inline-block',
                    fontSize: '15px'
                }}>
                    <center>
                        <span>Enter your text message</span>
                        <hr />
                    </center>
                    <div>
                        <textarea onChange={(e) => { setMessage(e.target.value) }} className="form-control" rows="5" aria-label="With textarea"></textarea>
                    </div>
                    <center><button onClick={sendMessage} className="btn btn-warning mt-2">Send message</button></center>
                </div>
            </Modal>
        </>
    )
}
export default PostDetails

