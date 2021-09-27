import React, { useEffect, useState,useContext } from "react"
import axios from 'axios'
import './PostUpload.css'
import { Layout, Container, BoxUpload, ImagePreview } from './index';
import FolderIcon from "./assets/folder.svg";
import CloseIcon from "./assets/CloseIcon.svg";
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import { toast } from "react-toastify";
import UserNavbar from "../UserNavbar/UserNavbar";
import Footer from "../Footer/Footer";
import { getCookie } from "../../cookies";

function PostUpload() {
    const userID = getCookie('id')
    const [radioValue,setRadioValue] = useState("found");
    const [title,setTitle] = useState("");
    const [desc,setDesc] = useState("")
    const [category,setCategory] = useState("")
    const [image, setImage] = useState("");
    const [isUploaded, setIsUploaded] = useState(false);
    const [typeFile, setTypeFile] = useState("");
    const [fileName, setFileName] = useState("");
    const [country, setCountry] = useState('')
    const [region, setRegion] = useState('')
    const [fetchCat,setFetchCat] = useState([])
    var file;
    function handleImageChange(e) {
        if (e.target.files && e.target.files[0]) {
            setTypeFile(e.target.files[0].type);
            let reader = new FileReader();

            reader.onload = function (e) {
                setImage(e.target.result);
                setIsUploaded(true);
            };

            reader.readAsDataURL(e.target.files[0]);
        }
        file = e.target.files[0]
        setFileName(file)
    }



    const changeOnClick = async (e) => {
        e.preventDefault();
        const fData = new FormData();
        fData.append('userID',userID)
        fData.append('title',title) 
        fData.append('description',desc) 
        fData.append('country',country) 
        fData.append('city',region) 
        fData.append("image", fileName);
        fData.append('status','status') 
        fData.append('type',radioValue) 
        fData.append('categoryID',category) 
        
       await fetch('http://localhost:8000/posts', {
            method: "post",
            body: fData,
            headers: {
                'Accept': 'multipart/form-data',
            },
            credentials: 'include'
        })
            .then(res => toast.success("Post has been uploaded"))
    }

    

    const selectCountry = (val) => {
        setCountry(val);
    }
    const selectRegion = (val) => {
        setRegion(val);
    }

    useEffect( ()=>{
         fetch('http://localhost:8000/category', {
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
                if (typeof data[0] === 'object')
                {
                     setFetchCat(data);
                    }
                else {
                    setFetchCat([data]);
                }
            }
        })
            
          
    },[])

    const categories = fetchCat.map((cat,key) => (
        <option value={cat._id}  id={cat._id} key={key}>{cat.name}</option>
    ));
    
    return (
        <>
        <UserNavbar></UserNavbar>
            <form method="POST" onSubmit={changeOnClick} encType="multipart/form-data">
                <div className="container-lg" style={{ marginTop: '120px' }}>
                    <div className="row  gy-5 row-cols-xs-1  row-cols-sm-1  row-cols-md-2" >
                        <div className="col">
                            <div className="item-gallery PostDetailImg" >
                                <Layout>
                                    <Container>
                                        <h2>Upload your image</h2>
                                        <BoxUpload>
                                            <div className="image-upload">
                                                {!isUploaded ? (
                                                    <>
                                                        <label htmlFor="upload-input">
                                                            <img
                                                                src={FolderIcon}
                                                                draggable={"false"}
                                                                alt="placeholder"
                                                                style={{ width: 100, height: 100 }}
                                                            />
                                                            <p style={{ color: "#444", marginTop: 10 }}>Click to upload image</p>
                                                        </label>

                                                        <input
                                                            name="fileImage"
                                                            multiple={false}
                                                            id="upload-input"
                                                            type="file"
                                                            accept=".jpg,.jpeg,.gif,.png,.mov,.mp4"
                                                            onChange={handleImageChange}
                                                        />
                                                    </>
                                                ) : (
                                                    <ImagePreview>
                                                        <img
                                                            className="close-icon"
                                                            src={CloseIcon}
                                                            alt="CloseIcon"
                                                            onClick={() => {
                                                                setIsUploaded(false);
                                                                setImage(null);
                                                            }}
                                                        />
                                                        {typeFile.includes("video") ? (
                                                            <video
                                                                id="uploaded-image"
                                                                src={image}
                                                                draggable={false}
                                                                controls
                                                                autoPlay
                                                                alt="uploaded-img"
                                                            />
                                                        ) : (
                                                            <img
                                                                id="uploaded-image"
                                                                src={image}
                                                                draggable={false}
                                                                alt="uploaded-img"
                                                            />
                                                        )}
                                                    </ImagePreview>
                                                )}
                                            </div>
                                        </BoxUpload>
                                    </Container>
                                </Layout>
                            </div>
                        </div>
                        <div className="col">
                            <article >
                                <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                                    <input type="radio" onClick={()=>setRadioValue("found")} className="btn-check" name="btnradio" id="btnradio1" autoComplete="off" defaultChecked />
                                    <label className="btn btn-outline-warning" htmlFor="btnradio1">I found this item</label>

                                    <input type="radio" onClick={()=>setRadioValue("lost")} className="btn-check" name="btnradio" id="btnradio2" autoComplete="off" />
                                    <label className="btn btn-outline-warning" htmlFor="btnradio2">I Lost this item</label>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="formGroupExampleInput">Title</label>
                                    <input type="text" onChange={(e)=>{setTitle(e.target.value)}} className="form-control" id="formGroupExampleInput" placeholder="Title" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlTextarea1">Description</label>
                                    <textarea onChange={(e)=>{setDesc(e.target.value)}} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                                </div>
                                <div className="mb-3">
                                    <select onChange={(e)=>{setCategory(e.target.value)}} className="form-select" aria-label="Default select example">
                                        <option>Category</option>
                                        {categories}
                                    </select>
                                </div>

                                <div className="input-group" style={{ display: "block" }}>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <label className="input-group-text" htmlFor="inputGroupSelect01">Country</label>
                                        </div>
                                        <CountryDropdown
                                            className="custom-select "
                                            value={country}
                                            onChange={(val) => selectCountry(val)} />
                                    </div>
                                </div>
                                <div className="input-group" style={{ display: "block" }}>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <label className="input-group-text" htmlFor="inputGroupSelect01">Region</label>
                                        </div>
                                        <RegionDropdown
                                            className="input-group-text"
                                            country={country}
                                            value={region}
                                            onChange={(val) => selectRegion(val)} />
                                    </div>
                                </div>


                                <dl className="param param-feature">
                                    <dt><hr /></dt>
                                    <dd><button type="submit" className="btn btn-warning" style={{ float: 'right' }}>
                                        Upload
                                    </button></dd>
                                </dl>
                            </article>
                        </div>

                    </div>

                </div>



            </form>
            {/* 
                <input type="file"  onChange={onChangeFile} />
                <input type="submit" value="send" />
             */}
             <Footer></Footer>
        </>
    )
}

export default PostUpload