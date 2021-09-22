import React, { useEffect, useState } from "react"
import { Redirect } from "react-router"
import { Link } from "react-router-dom"
import './Categories.css'
function Categories() {
    const [param, setParam] = useState()
    const [icon, setIcon] = useState('fa-shapes')
    const [cat, setCat] = useState([])
    console.log(param)

    useEffect(() => {
        const cats = async () => {
            await fetch(`http://localhost:8000/category`, {
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
                            setCat(data);
                        }
                        else {
                            setCat([data]);
                        }
                    }
                })
        };
        cats()


    }, [])

    const cats = cat.map((cat, key) => (
        <Link to={`/catItems/${cat._id}`} key={key} className="text-decoration-none">
            <button className="btn  btn-circle btn-circle-xl m-3" >
                <i onMouseOver={() => { setParam(`${cat.name}`) }} className={`fas ${cat.image} fIcon`}></i>{cat.name}
            </button>
        </Link>
    ));
    return (
        <>
            <section>
                <div className="container-fluid p-5 text-center">

                    <div className="row align-items-stretch">
                        <h3>Search by Category</h3>
                        <div className="col-lg-12 mb-4">
                            <div className="bg-white p-4  h-75" >
                               {cats}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default Categories