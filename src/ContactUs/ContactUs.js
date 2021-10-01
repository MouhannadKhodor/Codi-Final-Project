import React from "react";
import UserNavbar from "../Components/UserNavbar/UserNavbar";
import './ContactUs.css'
import './index.js'
import emailjs from 'emailjs-com'
import {toast} from 'react-toastify'
const ContactUs = () => {

    const sendEmail = (e) => {
      e.preventDefault();
  
      emailjs.sendForm('service_8e756pv', 'template_n85w9yf', e.target, 'user_t5dyEIbyxhSrvDb0PfeOG')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
        toast.success("message has been sent", {
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            color:"blue",
        });
        e.target.reset()
    };
    return (
        <>
            <UserNavbar />
            <div className="container " style={{ marginTop: "100px" }}>
                <div>
                    <div className="row ">
                        <div className="  col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">
                            <h2>Contact Us</h2>
                        </div>
                    </div>
                    <div className="row ">
                        <div className="mt-5 " style={{ width: '50%', marginLeft: '27%' }}>
                            <form id="contact-form" onSubmit={sendEmail} className="form">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="name">Your Name</label>
                                    <input type="text" className="form-control fct" id="name" name="name" placeholder="Your name" tabIndex="1" required />
                                </div>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="email">Your Email</label>
                                    <input type="email" className="form-control fct" id="email" name="email" placeholder="Your Email" tabIndex="2" required />
                                </div>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="subject">Subject</label>
                                    <input type="text" className="form-control fct" id="subject" name="subject" placeholder="Subject" tabIndex="3" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="message">Message</label>
                                    <textarea rows="5" cols="50" name="message" className="form-control fct fcttarea" id="message" placeholder="Message..." tabIndex="4" required></textarea>
                                </div>
                                <div className="text-center">
                                    <button type="submit" className="btn btn-warning btn-ctus">Send Message</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContactUs;