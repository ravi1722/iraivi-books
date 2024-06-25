import React from 'react'
import Navbar from './Navbar'
import { useEffect, useState } from 'react';
import ShareIcon from '@mui/icons-material/Share';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ReactImageZoom from 'react-image-zoom';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import 'react-multi-carousel/lib/styles.css';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.min.js'
import '../../../css/main.scss';
const baseurl = import.meta.env.BASE_URL;

function Details(props) {
    const [details, setdetails] = useState(null);
    const [images, setimages] = useState([]);
    const [selectedimg, setselectedimg] = useState(1);
    const [quantity, setQuantity] = useState(1);
    const [imgprops, setimgprops] = useState({
        zoomWidth: 500, zoomStyle: 'z-index: 999;height:500px', img: (props.images.length > 0) ? baseurl + props.images[0]?.url : baseurl + "images/no-image.png", transid: props.images[0]?.transid
    });

    async function quan(e, type, val) { }

    useEffect(() => {
        setdetails(props.post);
        setimages(props.images);
    }, []);

    return (
        <>
            <Navbar />
            <div className='container py-6'>
                <Row>
                    <Col xs={4} md={4} sm={4} lg={4}>
                        <Row>
                            <Col xs={12} md={12} sm={12} lg={12}>
                                <ReactImageZoom {...imgprops} />
                                {/* <img className='rounded-3' src={baseurl + details?.url} alt="" /> */}
                            </Col>
                        </Row>
                        <Row className='mt-1' >
                            {images.map((img) => {
                                return (
                                    <Col key={img.transid} xs={3} md={3} sm={3} lg={3} className='p-2'>
                                        <a onClick={() => { setimgprops(prp => ({ ...prp, img: baseurl + img.url, transid: img.transid })) }} ><img src={baseurl + img.url} className={'rounded-3 ' + (imgprops.transid == img.transid) ? "small-img-border" : ''} alt="" /></a>
                                    </Col>
                                )
                            })}
                        </Row>
                    </Col>
                    <Col xs={8} md={8} sm={8} lg={8}>
                        <div className="p-3 allbook-title">
                            <h2 className="mb-0 fs-3">{details?.postname}</h2>
                        </div>
                        <div className='position-relative'>
                            <div className='position-absolute border' style={{ top: "15px", right: "20px" }}>
                                <ShareIcon className='fs-3' />
                            </div>
                            <span className='py-3 d-block'>Author: <a href='#'>{details?.authorname}</a></span>
                            <span className='py-3 d-block'>Publisher: <a href='#'>{details?.publishername}</a></span>
                            <span className="text-dark txt1 fs-3">₹{details?.price}</span>&nbsp;
                            <span className="text-decoration-line-through text-muted fs-6">₹{details?.originalprice}</span>&nbsp;
                            <span className='text-success fs-6'>20% Off</span>
                            {/* <hr /> */}
                            <Row>
                                <Col xs={2} md={2} sm={2} lg={2}>
                                    <div className="input-group text-center py-3">
                                        <input type="button" value="-" className="btn btn-sm form-control border border-secondary" onClick={(event) => quan(event, '-', quantity)} />
                                        <input type="text" className='text-center quantity-val form-control border border-secondary' value={quantity} maxLength={2} readOnly />
                                        <input type="button" value="+" className="btn btn-sm form-control border border-secondary" onClick={(event) => quan(event, '+', quantity)} />
                                    </div>
                                </Col>
                                <Col xs={4} md={4} sm={4} lg={4}>
                                    <a href="#" className="btn btn1 text-light w-50 m-3 p-2 font-medium float-left"><ShoppingCartOutlinedIcon className='fs-5 mr-1' />Add to cart</a>
                                    <FavoriteBorderOutlinedIcon className='my-4 cursor-pointer' />
                                </Col>
                            </Row>
                        </div>
                        <div className='mt-3'>
                            <ul class="nav nav-tabs" id="myTab" role="tablist">
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link active" id="description-tab" data-bs-toggle="tab" data-bs-target="#description" type="button" role="tab" aria-controls="description" aria-selected="true">Description</button>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link" id="details-tab" data-bs-toggle="tab" data-bs-target="#details" type="button" role="tab" aria-controls="details" aria-selected="false">Details</button>
                                </li>
                            </ul>
                            <div class="tab-content" id="myTabContent">
                                <div class="tab-pane fade show active" id="description" role="tabpanel" aria-labelledby="description-tab">
                                    <div className='w-100 h-20 m-3' style={{ overflowWrap: "break-word" }}>
                                        {details?.description}
                                    </div>
                                </div>
                                <div class="tab-pane fade" id="details" role="tabpanel" aria-labelledby="details-tab">
                                    <div className='w-100 h-20 m-3'>
                                        <table class="table table-borderless mb-0">
                                            <tbody>
                                                <tr>
                                                    <td className='fw-bold'>Published Year:</td>
                                                    <td>FBB00255</td>
                                                </tr>
                                                <tr>
                                                    <td className='fw-bold'>Category:</td>
                                                    <td>In Stock</td>
                                                </tr>
                                                <tr>
                                                    <td className='fw-bold'>Book Format:</td>
                                                    <td>Fruits</td>
                                                </tr>
                                                <tr>
                                                    <td className='fw-bold'>Shipping:</td>
                                                    <td>
                                                        <small>
                                                            01 day shipping.
                                                            <span class="text-muted">( Free pickup today)</span>
                                                        </small>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default Details