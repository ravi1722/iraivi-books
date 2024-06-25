import React from 'react'
import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { useSelector, useDispatch } from 'react-redux'
import ViewCart from '@/Components/ViewCart';
import "bootstrap/dist/css/bootstrap.min.css";
import '../../../css/main.scss';
import UpdateToCart from '@/Components/UpdateToCart';
import { addCart, emptyCart, updateCart, removeCart } from '@/slices/cartSlices';
const baseurl = import.meta.env.BASE_URL;

function Cart({ closeCart }) {
    const dispatch = useDispatch();
    const cartLists = useSelector((state) => state.cart);
    console.log(cartLists)

    let Total = 0;
    return (
        <ListGroup as="ol" numbered>
            <Container>
                {cartLists.map((cart) => {
                    const [quantity, setQuantity] = useState(cart.quantity);
                    let waitcart = [];
                    async function quan(e, type, val) {
                        if (type == '-') {
                            if (val == 1) {
                                waitcart = await UpdateToCart(cart.postid, 0);
                                dispatch(emptyCart())
                                dispatch(addCart(waitcart))
                                // dispatch(updateCart(waitcart));
                                return;
                            }
                            val--;
                            setQuantity(val);
                        } else {
                            val++;
                            setQuantity(val);
                        }
                        waitcart = await UpdateToCart(cart.postid, val);
                        dispatch(emptyCart())
                        dispatch(addCart(waitcart))
                        // dispatch(updateCart(waitcart));
                    }

                    Total += quantity * cart.price;
                    return (
                        <ListGroup.Item as="li" key={cart.postid} className="justify-content-between align-items-start">
                            <div className="ms-2 me-auto">
                                <Row>
                                    <Col xs={7} lg={7} md={7} sm={7}>
                                        <Row>
                                            <Col xs={4} lg={4} md={4} sm={4}>
                                                <img src={baseurl + 'images/sample.jpg'} className='w-20' />
                                            </Col>
                                            <Col xs={8} lg={8} md={8} sm={8}>
                                                <a href='#' className='d-block'><span>{cart.posttamilname}</span></a>
                                                <a href='#' className='fs-9 d-block'>{cart.authorname}</a>
                                                <a className='fs-8 text-danger' onClick={(event) => quan(event, '-', 1)}><DeleteOutlineOutlinedIcon className='fs-8' />Remove</a>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs={5} lg={5} md={5} sm={5}>
                                        <Row>
                                            <Col xs={7} lg={7} md={7} sm={7} className='p-0'>
                                                <div className="input-group text-center py-3">
                                                    <input type="button" value="-" className="btn btn-sm form-control border border-secondary" onClick={(event) => quan(event, '-', quantity)} />
                                                    <input type="text" className='text-center quantity-val form-control border border-secondary' value={quantity} maxLength={2} readOnly />
                                                    <input type="button" value="+" className="btn btn-sm form-control border border-secondary" onClick={(event) => quan(event, '+', quantity)} />
                                                </div>
                                            </Col>
                                            <Col xs={5} lg={5} md={5} sm={5} className='text-center py-4'><span className='fw-bold'>₹{quantity * cart.price}</span></Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </div>
                        </ListGroup.Item>
                    )
                })}
                {cartLists.length == 0 && <span>Your Cart is Empty!</span>}
                {cartLists.length > 0 && <div className="ms-2 me-auto">
                    <Row className='p-4'>
                        <Col xs={7} lg={7} md={7} sm={7}>Total</Col>
                        <Col xs={5} lg={5} md={5} sm={5} className='text-right fw-bold'>₹{Total}</Col>
                    </Row>
                </div>}
                <div className='d-flex flex-row-reverse my-3'>
                    {cartLists.length > 0 && <button className="btn btn4 fw-bold"><ArrowCircleRightOutlinedIcon />&nbsp;Check Out</button>}
                    <button className="btn btn3 mr-5" onClick={closeCart}><KeyboardBackspaceIcon />&nbsp;Continue Shopping</button>
                </div>

            </Container>
        </ListGroup>
    )
}

export default Cart