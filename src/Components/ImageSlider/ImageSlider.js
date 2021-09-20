import React, { useEffect } from "react"
import './ImageSlider.css'
import img1 from '../../Images/resizeimage.jpg'
import img2 from '../../Images/road220058.jpg'
import img3 from '../../Images/88h.jpg'
function ImageSlider() {
    return (
        <div className="container-fluid " style={{marginTop:'80px'}}>
            <div id="carouselExampleCaptions" className="carousel slide carousel-fade" data-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-target="#carouselExampleCaptions" data-slide-to="0" className="active"></li>
                    <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
                    <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
                </ol>
                <div className="carousel-inner">
                    <div className="carousel-item active" data-interval="3000">
                        <img src={img1} className="d-block w-100" alt="..." />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>SEARCH</h5>
                            <p>Being Able to find your item has never been easier</p>
                        </div>
                    </div>
                    <div className="carousel-item" data-interval="3000">
                        <img src={img2} className="d-block w-100" alt="..." />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>POST</h5>
                            <p>Boost your morals by posting the items you have found</p>
                        </div>
                    </div>
                    <div className="carousel-item" data-interval="3000">
                        <img src={img3} className="d-block w-100" alt="..." />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>UNITE</h5>
                            <p>Help people find their belongings </p>
                        </div>
                    </div>
                </div>
                <a className="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
                    <i className="fas fa-chevron-left"></i>
                </a>
                <a className="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
                    <i className="fas fa-chevron-right"></i>
                </a>
            </div>
        </div>
    )
}

export default ImageSlider