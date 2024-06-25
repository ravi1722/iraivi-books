import React from 'react'
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import "bootstrap/dist/css/bootstrap.min.css";

function Footer() {
    return (
        <footer className="bg-1 text-light pt-5">
            <div className="container px-5">
                <div className="row">
                    <div className="col-6 col-lg-4">
                        <h3 className="fw-bold">Iraivi Books</h3>
                        <p className="mb-2">iravi@books.com</p>
                        <p>1234567890</p>
                    </div>
                    <div className="col">
                        <h4>Menu</h4>
                        <ul className="list-unstyled pt-2">
                            <li className="py-1">Home</li>
                            <li className="py-1">All Books</li>
                            <li className="py-1">Authors</li>
                            <li className="py-1">Publishers</li>
                        </ul>
                    </div>
                    <div className="col">
                        <h4>More</h4>
                        <ul className="list-unstyled pt-2">
                            <li className="py-1">Landing Pages</li>
                            <li className="py-1">FAQs</li>
                        </ul>
                    </div>
                    <div className="col">
                        <h4>Categories</h4>
                        <ul className="list-unstyled pt-2">
                            <li className="py-1">Navbars</li>
                            <li className="py-1">Cards</li>
                            <li className="py-1">Buttons</li>
                            <li className="py-1">Carousels</li>
                        </ul>
                    </div>
                    <div className="col-6 col-lg-3 text-lg-end">
                        <h4>Social Media Links</h4>
                        <div className="social-media pt-2">
                            <a href="#" className="text-light fs-2 me-3"><FacebookIcon /></a>
                            <a href="#" className="text-light fs-2 me-3"><InstagramIcon /></a>
                            <a href="#" className="text-light fs-2 me-3"><YouTubeIcon /></a>
                        </div>
                        <form className="d-flex mt-4 subscribe-input">
                            <input className="form-control me-2 w-100 fs-6" placeholder="Enter your mail" aria-label="Enter your mail" />
                            <button className="btn btn-outline-success fs-6" type="submit">Subscribe</button>
                        </form>
                    </div>
                </div>
                <hr />
                <div className="d-sm-flex justify-content-between py-1">
                    <p>2023 © Iraivi Books. All Rights Reserved. </p>
                    <p>
                        <a href="#" className="text-light text-decoration-none pe-4">Terms of use</a>
                        <a href="#" className="text-light text-decoration-none"> Privacy policy</a>
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer