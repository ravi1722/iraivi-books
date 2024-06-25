import React from 'react'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import { useEffect, useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Alert from 'react-bootstrap/Alert';
import { addCart } from '@/slices/cartSlices';
import { useSelector, useDispatch } from 'react-redux'
import "bootstrap/dist/css/bootstrap.min.css";
import '../../../css/main.scss';
import Cart from './Cart';
import ViewCart from '@/Components/ViewCart';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
const baseurl = import.meta.env.BASE_URL;

function Navbar() {
    const [quickCategory, setQuickCategory] = useState('d-none');
    const [allcategories, setallcategories] = useState([]);
    const [searchval, setsearchval] = useState('');
    const [form, setform] = useState('signup');
    const [cart, setCart] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // const [cartLists, setCartLists] = useState([]);
    const dispatch = useDispatch();
    const cartLists = useSelector((state) => state.cart);

    useEffect(() => {
        axios({
            method: "POST",
            url: route("welcome.getall"),
            data: { mode: "getallcategory" },
        }).then(res => {
            const respmsg = res.data;
            setallcategories(respmsg);
        }).catch((error) => {
            alert(error);
        });
    }, []);

    const gotosearch = () => {
        if (searchval != '')
            window.location.href = "/allbooks/search/" + searchval;
        else
            alert("Enter Book titles, authors or publishers..");
    }

    useEffect(() => {
        cartload();
    }, []);

    async function cartload() {
        let waitcart = await ViewCart();
        dispatch(addCart(waitcart))
    }

    return (
        <nav className="navbar navbar-expand-lg p-3" style={{ borderBottom: "1px solid rgb(23 55 66 / 21%)" }}>
            <div className="container">
                <a className="navbar-brand col-md-1"><img src={baseurl + 'images/logo1.jpg'} className='w-20' /></a>
                <div style={{ position: 'relative' }}>
                    <button type="button" className="btn btn2" href={'/allbooks/category/' + btoa(0)} onMouseEnter={() => setQuickCategory('d-block')} onMouseLeave={() => setQuickCategory('d-none')}><WidgetsOutlinedIcon /> All Categories</button>

                    <ul className={"list-group categorylist " + quickCategory} onMouseEnter={() => setQuickCategory('d-block')} onMouseLeave={() => setQuickCategory('d-none')}>
                        {allcategories.map((category) => {
                            return (
                                <li key={category.categoryid} className="list-group-item"><a href={'/allbooks/category/' + btoa(category.categoryid)}>{category.categoryname}</a></li>
                            )
                        })}
                    </ul>
                </div>
                <a href='/'>Home</a>
                <a href={'/allbooks/category/' + btoa(0)}>All Books</a>
                <a href='/authors'>Authors</a>
                <a href='/publishers'>Publishers</a>

                <div className='col-md-6'>
                    <div className="d-flex">
                        <input className="form-control me-2 w-100" type="search" onChange={(event) => setsearchval(btoa(event.target.value))} placeholder="Search by titles, authors, publishers, etc.." aria-label="Search" />
                        <button className="btn btn2 mr-5" onClick={gotosearch}>Search</button>
                        <PersonOutlineOutlinedIcon className='m-2 cursor-pointer' onClick={() => setShow(true)} />
                        <FavoriteBorderOutlinedIcon className='m-2 cursor-pointer' onClick={() => window.location.href = '/wishlist'} />
                        <span className='position-relative'>
                            <LocalMallOutlinedIcon className='m-2 cursor-pointer' onClick={() => setCart(true)} />
                            {cartLists.length > 0 && <span className='position-absolute cart-count'>{cartLists.length}</span>}
                        </span>
                    </div>
                </div>

                <Offcanvas show={cart} placement={'end'} onHide={() => setCart(false)} style={{ width: "35rem" }}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Alert variant={'danger'} className='mx-3'>
                        Congrats! You have got FREE delivery. <b>Checkout now!</b>
                    </Alert>
                    <hr />
                    <Offcanvas.Body>
                        <Cart closeCart={() => setCart(false)} />
                    </Offcanvas.Body>
                </Offcanvas>
                <Modal show={show} onHide={handleClose} className='w-100 loginModal'>
                    <Modal.Header closeButton>
                        <Modal.Title>{(form == 'login') ? 'Login' : (form == 'resetpassword') ? 'Reset Password' : 'Sign up'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form style={{ display: (form == 'login') ? 'block' : 'none' }}>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={4}>
                                    Email<span className='text-danger'>*</span>
                                </Form.Label>
                                <Col sm={8}>
                                    <Form.Control type="email" placeholder="Email" />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={4}>
                                    Password<span className='text-danger'>*</span>
                                </Form.Label>
                                <Col sm={8}>
                                    <Form.Control type="password" placeholder="Password" />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3">
                                <Col sm={{ offset: 4 }}>
                                    <Button type="submit" className='btn btn1 text-light w-50'>Log in</Button>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm={12} className='text-center'>New Customer?&nbsp;<a onClick={() => setform('signup')}>Sign up</a></Form.Label>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={12} className='text-center'>Reset Password?&nbsp;<a onClick={() => setform('resetpassword')}>Click here</a></Form.Label>
                            </Form.Group>
                        </Form>
                        <Form style={{ padding: "10px", display: (form == 'signup') ? 'block' : 'none' }}>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={5}>
                                    Name<span className='text-danger'>*</span>
                                </Form.Label>
                                <Col sm={7}>
                                    <Form.Control type="text" placeholder="Name" />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={5}>
                                    Email<span className='text-danger'>*</span>
                                </Form.Label>
                                <Col sm={7}>
                                    <Form.Control type="email" placeholder="Email" />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={5}>
                                    Mobile<span className='text-danger'>*</span>
                                </Form.Label>
                                <Col sm={7}>
                                    <Form.Control type="text" placeholder="Mobile" />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={5}>
                                    Password<span className='text-danger'>*</span>
                                </Form.Label>
                                <Col sm={7}>
                                    <Form.Control type="password" placeholder="Password" />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={5}>
                                    Confirm Password<span className='text-danger'>*</span>
                                </Form.Label>
                                <Col sm={7}>
                                    <Form.Control type="password" placeholder="Password" />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3">
                                <Col sm={{ offset: 4 }}>
                                    <Button type="submit" className='btn1 w-50 p-2'>Sign up</Button>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={12} className='text-center'>Already have an account?&nbsp;<a onClick={() => setform('login')}>Login</a></Form.Label>
                            </Form.Group>
                        </Form>
                        <Form style={{ display: (form == 'resetpassword') ? 'block' : 'none' }}>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={4}>
                                    Email<span className='text-danger'>*</span>
                                </Form.Label>
                                <Col sm={8}>
                                    <Form.Control type="email" placeholder="Email" />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3">
                                <Col sm={{ offset: 4 }}>
                                    <Button type="submit" className='btn1 w-50'>Reset</Button>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={12} className='text-center'>Back to Login?&nbsp;<a onClick={() => setform('login')}>Click here</a></Form.Label>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        </nav>
    )
}

export default Navbar