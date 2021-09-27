import React, { useEffect, useState } from "react"
import { getCookie } from "../../cookies";
import UserNavbar from "../UserNavbar/UserNavbar"
import './Messages.css'
import ReactLoading from 'react-loading';
import { toast } from "react-toastify";
import axios from "axios";


function Messages() {
    let id = getCookie('id');
    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState()
    const [userMsg, setUserMsg] = useState();
    var userID;

    const handleSendMsg = async () => {
        document.getElementById("myForm").reset();
        if (userMsg === undefined) {
            return toast.error("message must not be empty", {
                autoClose: 2500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }
        const fdata = {};
        fdata['senderID'] = id;
        fdata['receiverID'] = userID;
        fdata['senderUsername'] = getCookie('username');
        fdata['receiverUsername'] = user;
        fdata['message'] = userMsg
        console.log(fdata)

        axios.post("http://localhost:8000/messages", fdata)
            .then(res => console.log(res.data))
    }

    useEffect(() => {
        const getMsg = async () => {
            await fetch(`http://localhost:8000/messages/all/${getCookie('id')}`, {
                method: "GET",
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
                            setMessages(data);
                        }
                        else {
                            setMessages([data]);
                        }
                    }
                })
        };
        getMsg()

    }, [handleSendMsg])


    console.log(messages)


    let chats = {};
    messages.forEach(m => {
        if (m.receiverID !== id) chats[m.receiverID] = m.receiverUsername;
        if (m.senderID !== id) chats[m.senderID] = m.senderUsername;
    });

    // console.log({ chats });


    // const users = distinctUsers.map((data, key) => (
    //     <div className="chat_list" key={key} onClick={() => { setUser(data) }}>
    //         <div className="chat_people">
    //             <div className="chat_ib">
    //                 <h5>{data}</h5>
    //             </div>
    //         </div>
    //     </div>
    // ));

    const users = Object.keys(chats).map(key => {
        let username = chats[key];
        return (
            <div className="chat_list" key={key}  onClick={() => { setUser(username); }}>
                <div className="chat_people">
                    <div className="chat_ib">
                        <h5>{username}</h5>
                    </div>
                </div>
            </div>
        )
    })

    var filter1 = {
        senderUsername: user,
        receiverUsername: getCookie('username')
      };

    var filter2 = {
        senderUsername: getCookie('username'),
        receiverUsername: user
    };


    const receivedMsgs= messages.filter(function(item) {
        for (var key in filter1) {
          if (item[key] === undefined || item[key] !== filter1[key])
            return false;
        }
        return true;
    });
      
      console.log(receivedMsgs)

    const sentMsgs= messages.filter(function(item) {
        for (var key in filter2) {
          if (item[key] === undefined || item[key] !== filter2[key])
            return false;
        }
        return true;
    });
      
      console.log(sentMsgs)

    console.log(Array.prototype.concat(receivedMsgs,sentMsgs));
    let all = Array.prototype.concat(receivedMsgs,sentMsgs)

    const sortmsg =
        all.sort(function (a, b) {
            return new Date(a.date) - new Date(b.date);
        });

    if (!sortmsg.length) {
        console.log("not loaded yet");
    } else {
        if (id === sortmsg[0].receiverID) {
            userID = sortmsg[0].senderID;
        }
        else {
            userID = sortmsg[0].receiverID;
        }
    }

    const userMsgs = sortmsg.map((msg, key) => (
        <div key={key}>
            {
                (msg.senderID === getCookie('id')) ?
                    <div className="incoming_msg"  >
                        <div className="outgoing_msg">
                            <div className="sent_msg">
                                <p>{msg.message}</p>
                                <span className="time_date"> {msg.date.slice(11, 16)}    |   {msg.date.slice(5, 10)}</span> </div>
                        </div>
                    </div>
                    :
                    <div className="incoming_msg" >
                        <div className="received_msg">
                            <div className="received_withd_msg">
                                <p>{msg.message}</p>
                                <span className="time_date"> {msg.date.slice(11, 16)}    |    {msg.date.slice(5, 10)}</span></div>
                        </div>
                    </div>
            }
        </div>

    ));


    

    //



    return (
        <>
            <UserNavbar />
            {(!messages.length) ? <center><ReactLoading type="cylon" color="#feab3b" height={667} width={375} /></center> :
                <div className="container chatContainer" style={{ marginTop: '70px' }} >
                    <div className="messaging">
                        <div className="inbox_msg">
                            <div className="inbox_people">
                                <div className="headind_srch">
                                    <div className="recent_heading">
                                        <h4>Recent</h4>
                                    </div>
                                </div>
                                <div className="inbox_chat scroll">
                                    {users}
                                </div>
                            </div>
                            <div className="mesgs">
                                <div className="msg_history">
                                    {userMsgs}
                                </div>
                                <div className="type_msg">
                                    <div className="input_msg_write">
                                        <form id="myForm">
                                            <input type="text" onChange={(e) => { setUserMsg(e.target.value) }} className="write_msg" placeholder="Type a message" required />
                                            <button className="msg_send_btn" type="submit" onClick={handleSendMsg} type="button"><i className="fa fa-paper-plane" aria-hidden="true"></i></button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }

        </>
    )
}
export default Messages