import React from 'react'
import AdminLayout from '@/Layouts/AdminLayout'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Button as ButtonB, Grid, IconButton } from '@mui/material';
import { useEffect } from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';

function AddPost({editdata}) {
    const [validated, setValidated] = useState(false);
    const [images, setImages] = useState([]);
    const [ufiles, setufiles] = useState([]);
    const { data, setData, post, processing, setFocus } = useForm({
        name: '', author: '', publisher: '', description: '', isbn: '', originalprice: 0,
        price: 0, pages: 0, publishedyear: 0, freeshipping: '', instock: 0,
        uploadedImages: []
    });

    useEffect(() => {
        if(editdata != null){
            let post = editdata.post;
            setData(data => ({ ...data, ...post }))

            if(editdata.images.length > 0){
                setImages(editdata.images)
            }
        } 
    },[]);

    useEffect(() => {
        setData(data => ({ ...data, ['uploadedImages']: ufiles }))
    }, [ufiles]);

    const handleImageChange = (event) => {

        const files = event.target.files;
        if ((images.length + files.length) > 4) {
            alert("You can upload a maximum of 4 images.");
            return;
        }
        const newImages = [];
        setufiles(ufiles => [ ...ufiles, ...files ])
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();
            reader.onloadend = () => {
                newImages.push({ id: i, src: reader.result });
                if (newImages.length === files.length) {
                    setImages(images => [...images, ...newImages]);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = (id) => {
        setImages(images.filter((image) => image.id !== id));
    };

    const uploadFun = () => {
        document.querySelector('#image-upload').click();
    };

    const handleValueChange = (event) => {
        setData(data => ({ ...data, [event.target.id]: event.target.value }))
    }

    const handleSubmit = (event) => {
        // const form = event.currentTarget;
        // if (form.checkValidity() === false) {
        //     event.preventDefault();
        //     event.stopPropagation();
        // }

        // setValidated(true);
        event.preventDefault();
        router.post('/admin/savesinglepost', data)
    };
    return (
        <AdminLayout>
            <h3>Add Post<HighlightOffIcon className='float-right cursor-pointer' onClick={() => window.location.href = "/admin/posts"} /></h3>
            <hr />
            <Form noValidate validated={validated} onSubmit={handleSubmit} encType="multipart/form-data">
                <Row className="mb-3">
                    <Form.Group as={Col} md="4">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Name"
                            id="name"
                            value={data.name}
                            onChange={handleValueChange}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter name.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4">
                        <Form.Label>Author</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            id="author"
                            placeholder="Author"
                            value={data.author}
                            onChange={handleValueChange}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter author.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4">
                        <Form.Label>Publisher</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            id="publisher"
                            placeholder="Publisher"
                            value={data.publisher}
                            onChange={handleValueChange}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter publisher.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="4">
                        <Form.Label>Orginal Price</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Orginal Price"
                            id="originalprice"
                            value={data.originalprice}
                            onChange={handleValueChange}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter Orginal Price.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Price"
                            id="price"
                            value={data.price}
                            onChange={handleValueChange}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter price.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4">
                        <Form.Label>Pages</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            id="pages"
                            placeholder="Pages"
                            value={data.pages}
                            onChange={handleValueChange}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter Pages.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="4">
                        <Form.Label>Published Year</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            id="publishedyear"
                            placeholder="Published Year"
                            value={data.publishedyear}
                            onChange={handleValueChange}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter Published Year.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4">
                        <Form.Label>In Stock</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            id="instock"
                            placeholder="In Stock"
                            value={data.instock}
                            onChange={handleValueChange}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter In Stock.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4">
                        <Form.Label>ISBN</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            id="isbn"
                            placeholder="ISBN"
                            value={data.isbn}
                            onChange={handleValueChange}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter ISBN.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="12">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} id="description" 
                            value={data.description} onChange={handleValueChange} />
                        <Form.Control.Feedback type="invalid">
                            Please enter Description.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Form.Group className="mb-3">
                    <Form.Check
                        label="Free shipping"
                        feedbackType="invalid"
                        id="freeshipping"
                        checked={data.freeshipping}
                        onChange={handleValueChange}
                    />

                </Form.Group>
                <Row className="mb-3">
                    <Col xs={12} sm={12} md={3} lg={3} as={Col}>
                        <input
                            accept="image/*"
                            id="image-upload"
                            multiple
                            type="file"
                            style={{ display: 'none' }}
                            onChange={(event) => handleImageChange(event)}
                        />
                        <ButtonB onClick={uploadFun} style={{ float: "left" }}>
                            Upload Images
                        </ButtonB>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col xs={12} sm={12} md={6} lg={6}>
                        <Row>
                            {images.map((image, i) => (
                                <Col xs={6} sm={6} md={3} lg={3} key={image.id} style={{ position: 'relative' }}>
                                    <img
                                        src={image.src}
                                        alt={`Upload Preview ${image.id}`}
                                        style={{ width: '100%', height: 'auto' }}
                                    />
                                    <IconButton
                                        style={{
                                            position: 'absolute',
                                            top: '5px',
                                            right: '15px',
                                            height: '30px',
                                            background: 'rgba(255, 255, 255, 0.7)',
                                        }}
                                        onClick={() => handleRemoveImage(image.id)}
                                    >
                                        &times;
                                    </IconButton>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>
                <Button type="submit">Submit</Button>
            </Form>
        </AdminLayout>
    )
}

export default AddPost