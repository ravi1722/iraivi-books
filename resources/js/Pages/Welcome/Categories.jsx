import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import 'react-multi-carousel/lib/styles.css';
import "bootstrap/dist/css/bootstrap.min.css";
import '../../../css/main.scss';
const baseurl = import.meta.env.BASE_URL;

function Categories({ category }) {

    const [posts, setposts] = useState([]);

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 6
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 6
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    useEffect(() => {
        axios({
            method: "POST",
            url: route("welcome.getall"),
            data: { mode: "getpostsbycategory", id: category.categoryid },
        }).then(res => {
            const respmsg = res.data;
            console.log(respmsg)
            setposts(respmsg);
        }).catch((error) => {
            alert(error);
        });
    }, []);

    return (
        <div className='mt-3'>
            <p className="fw-bold">{category.categoryname}</p>
            <hr />
            <Carousel responsive={responsive}>
                {posts.map((post) => {
                    return (
                        <div key={post.postid}>
                            <div className="card card-main mb-4" style={{ position: "relative" }}>
                                <FavoriteBorderOutlinedIcon className='wish-position' />
                                <img src={(post.url != '') ? baseurl + post.url :  baseurl +'images/no-image.png'} className="card-img-top" alt="" />
                                <div className="card-body">
                                    <h5 className="card-title fs-6">{post.postname}</h5>
                                    <h6>{post.postname}</h6>
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <span className="text-dark txt1">₹{post.price}</span>&nbsp;
                                            <span className="text-decoration-line-through text-muted">₹{post.originalprice}</span>
                                            <span className='text-success d-block'>20% Off</span>
                                        </div>
                                        <div className='col-md-6'>
                                            <a href="#" className="btn btn1 w-15 mt-2 font-medium float-right"><AddOutlinedIcon className='fs-5' />Add</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </Carousel>
        </div>
    )
}

export default Categories