import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.min.js'
import '../../../css/main.scss';

function HeaderSlider() {
    return (
        <div className='container p-0'>
            <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active" data-bs-interval="3000">
                        <img src="images/imgslider1.jpg" className="d-block w-100 rounded " style={{height:"500px"}} alt="..." />
                    </div>
                    <div className="carousel-item" data-bs-interval="3000">
                        <img src="images/imgslider2.jpg" className="d-block w-100 rounded" style={{height:"500px"}} alt="..." />
                    </div>
                    <div className="carousel-item" data-bs-interval="3000">
                        <img src="images/imgslider3.jpg" className="d-block w-100 rounded" style={{height:"500px"}} alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    )
}

export default HeaderSlider