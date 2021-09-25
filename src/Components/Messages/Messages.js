import React, { useEffect, useState } from "react"
import { getCookie } from "../../cookies";
import UserNavbar from "../UserNavbar/UserNavbar"
import './Messages.css'
import ReactLoading from 'react-loading';
function Messages() {
    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState()
    const [userMessages, setUserMessages] = useState([])
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

    }, [])

    const distinctUsers = [...new Set(messages.map(x => x.senderUsername))]


    const users = distinctUsers.map((data, key) => (
        <div className="chat_list" key={key} onClick={() => { setUser(data) }}>
            <div className="chat_people">
                <div className="chat_ib">
                    <h5>{data}</h5>
                </div>
            </div>
        </div>
    ));



    let all = messages.filter(msg => msg.senderUsername === user);

      const sortmsg =  
            all.sort(function(a, b){
                return new Date(a.date) - new Date(b.date);
            });  
    const userMsgs = all.map((msg, key) => (
        <>
            {
                (msg.senderID === getCookie('id')) ?
                    <div className="incoming_msg" key={key}>
                        <div className="outgoing_msg">
                            <div className="sent_msg">
                                <p>{msg.message}</p>
                                <span className="time_date"> {msg.date.slice(11, 16)}    |   {msg.date.slice(5, 10)}</span> </div>
                        </div>
                    </div>
                    :
                    <div className="incoming_msg" key={key}>
                        <div className="received_msg">
                            <div className="received_withd_msg">
                                <p>{msg.message}</p>
                                <span className="time_date"> {msg.date.slice(11, 16)}    |    {msg.date.slice(5, 10)}</span></div>
                        </div>
                    </div>
            }


        </>

    ));



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
                                            <input type="text" className="write_msg" placeholder="Type a message" />
                                            <button className="msg_send_btn" type="button"><i className="fa fa-paper-plane" aria-hidden="true"></i></button>
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