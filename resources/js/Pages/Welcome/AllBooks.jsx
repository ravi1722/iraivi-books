import React from 'react'
import { styled } from '@mui/material/styles';
import Slider, { SliderThumb } from '@mui/material/Slider';
import { useEffect, useState } from 'react';
import Navbar from './Navbar'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import "bootstrap/dist/css/bootstrap.min.css";
import '../../../css/main.scss';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Pagination } from "@mui/material";
import AddToCart from '@/Components/AddToCart';
import { addCart, emptyCart, updateCart, removeCart } from '@/slices/cartSlices';
import { useSelector, useDispatch } from 'react-redux'
import Footer from './Footer';
const baseurl = import.meta.env.BASE_URL;

function AllBooks(props) {

    const [pricerange, setpricerange] = useState([]);
    const [categories, setcategories] = useState([]);
    const [type, settype] = useState(props.type);
    const [value, setvalue] = useState('');
    const [posts, setposts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(1);
    const [nval, setnval] = useState([props.data.minPrice, props.data.maxPrice]);

    const dispatch = useDispatch();
    const cartLdddists = useSelector((state) => {
        return state.items;
    });

    useEffect(() => {
        setcategories(props.data.categories);
        setvalue(props.value);
        // setposts(props.data.posts);
    }, []);

    useEffect(() => {
        if (value != '') getposts();
    }, [currentPage, value]);

    function getposts() {
        axios({
            method: "POST",
            url: route("welcome.getall"),
            data: { mode: "getposts", value: value, type: type, price: nval, page: ((currentPage - 1) * 12) },
        }).then(res => {
            const respmsg = res.data;
            setposts(respmsg.page);
            const pcount = respmsg.count;
            let div = Math.ceil(pcount / 12);
            setPageCount(div);
        }).catch((error) => {
            alert(error);
        });
    }

    const handleChange = (event, value) => {
        setCurrentPage(value);
    }

    const handleOnChange = (event, newValue) => {
        setnval(newValue);
    };

    const AddCartss = async (id) => {
        let waitcart = await AddToCart(id, 1);
        dispatch(emptyCart())
        dispatch(addCart(waitcart))
    }

    const detail = (postid) => {
        window.location.href = "/books/details/" + btoa(postid);
    }

    return (
        <>
            <Navbar />
            <div className='container py-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <h5 className="fs-6 fw-bold">Price Range</h5>
                        <Slider
                            value={nval}
                            onChange={handleOnChange}
                            onChangeCommitted={getposts}
                            min={props.data.minPrice}
                            color="custom"
                            max={props.data.maxPrice}
                            className='txt1'
                            valueLabelDisplay="auto"
                        />
                        <p>Price: Rs: {nval[0]} to Rs: {nval[1]}</p>
                        <div className='py-3'>
                            <h5 className="fs-6 fw-bold">Categories</h5>
                            <ul className="list-group">
                                <li key="0" className="list-group-item cursor-pointer" onClick={() => setvalue(btoa(0))}>All Categories</li>
                                {categories.map((category) => {
                                    return (
                                        <li key={category.categoryid} className="list-group-item cursor-pointer" onClick={() => setvalue(btoa(category.categoryid))}>{category.categoryname}</li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                    <div className='col-md-9'>
                        <div className="p-3 allbook-title">
                            <h2 className="mb-0 fs-3">All Books</h2>
                        </div>
                        <div className='py-3 w-100'>
                            <Row>
                                {posts.map((post) => {
                                    console.log(post.url)
                                    return (
                                        <Col key={post.postid} xs={6} md={3} sm={6} className='mb-4'>
                                            <div className="card card-main" style={{ position: "relative" }}>
                                                <FavoriteBorderOutlinedIcon className='wish-position' />
                                                <img src={(post.url != '') ? baseurl + post.url :  baseurl +'images/no-image.png'} className="card-img-top" alt="" onClick={() => detail(post.postid)}/>
                                                <div className="card-body">
                                                    <h5 className="card-title fs-6">{post.postname}</h5>
                                                    <h6>{post.authorname}</h6>
                                                    <div className='row'>
                                                        <div className='col-md-7'>
                                                            <span className="text-dark txt1 fs-6">₹{post.price}</span>&nbsp;
                                                            <span className="text-decoration-line-through text-muted fs-6">₹{post.originalprice}</span>
                                                            <span className='text-success d-block'>{Math.round(post.originalprice / post.price)}% Off</span>
                                                        </div>
                                                        <div className='col-md-5'>
                                                            <a className="btn btn1 w-15 mt-2 font-medium float-right" onClick={() =>
                                                                AddCartss(post.postid)
                                                                // AddToCart(post.postid, 1)
                                                            }><AddOutlinedIcon className='fs-5' />Add</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                    )
                                })}
                            </Row>
                        </div>
                        {pageCount > 1 && <Pagination count={pageCount} page={currentPage} onChange={handleChange} />}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default AllBooks