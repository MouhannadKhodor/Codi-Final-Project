import React, { useState, useEffect } from 'react';
import SessionContext from './SessionContext';
import { setCookie, getCookie, removeCookie } from '../../cookies';
import { toast } from 'react-toastify';

export default function SessionProvider({ children }) {

    const [session, setValue] = useState({
        user: {
            access_token: getCookie('access_token'),
            role: getCookie('role')
        }
    });

    useEffect(() => {
        function initializeSession() {
            let id = getCookie('id');
            let access_token = getCookie('access_token');
            if (access_token) fetch(`http://localhost:8000/api/user/${id}`, {
                headers: {
                    'access_token': access_token
                }
            }).then(res => res.json()).then(res => {
                let user = { ...res.data, access_token };
                updateSession({ user });
            });
        }
        initializeSession();
    }, []);

    function updateSession(nextSession) {
        let value = typeof nextSession === "function" ?
            nextSession : prevSession => ({ ...prevSession, ...nextSession });
        setValue(value);
    }

    async function login({ email, password }) {

        // try to login
        let { error,data,access_token } = await fetch('http://localhost:8000/api/user/login', {
            method: "post",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        }).then(res => res.json());

        // return from the function if you have an error
        if (error || !access_token) return toast.error(error);

        // get the data of the loggedin user
        // let result = await fetch(`https://reqres.in/api/users/${id}`, {
        //     headers: {
        //         'access_token': access_token
        //     }
        // }).then(res => res.json());

        let user = {...data, access_token };

        setCookie('id', data.id);
        setCookie('access_token', access_token);
        setCookie('role',data.role)
        setCookie('username',data.username)
        updateSession({ user });
        toast(`Welcome ${data.username}!`);
        console.log(session)
        
    }

    function logout() {
        updateSession({ user: { access_token: null } });
        removeCookie('id');
        removeCookie('access_token');
    }

    const context = {
        session,
        actions: {
            login,
            logout
        }
    }

    return (
        <SessionContext.Provider value={context}>
            {children}
        </SessionContext.Provider>
    )
}