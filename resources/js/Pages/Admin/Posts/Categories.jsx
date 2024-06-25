import React from 'react'
import AdminLayout from '@/Layouts/AdminLayout'
import Container from "react-bootstrap/Container";
import { Head, useForm, router } from '@inertiajs/react';
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';
import { Col, Row } from 'react-bootstrap';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useEffect, useState, useRef } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';

function Categories(props) {

    const [categories, setcategories] = useState([]);
    const [categoryid, setcategoryid] = useState(0);
    const [active, setactive] = useState(0);
    const [posts, setposts] = useState([]);
    const [categoryposts, setcategoryposts] = useState([]);
    const [modalshow, setmodalshow] = useState(false);
    const [newcategoryname, setnewcategoryname] = useState('');
    const [newcategoryposts, setnewcategoryposts] = useState([]);
    const [newactive, setnewactive] = useState(0);

    const handleOptionSelect = (event, newValue) => {
        let arr = [];
        newValue.map(data => {
            arr.push(data.postid);
        });
        setcategoryposts(arr);
    }

    const newcategoryselect = (event, newValue) => {
        let arr = [];
        newValue.map(data => {
            arr.push(data.postid);
        });
        setnewcategoryposts(arr);
    }

    const changeCategory = (newValue) => {
        let categoryid = newValue.categoryid;
        let active = newValue.active;
        setcategoryid(categoryid);
        setactive(active);
        axios({
            method: "POST",
            url: route("admin.getdata"),
            data: {
                mode: "getCategoryPost",
                categoryid: categoryid,
            },
        }).then(res => {
            const respmsg = res.data;
            let arr = [];
            respmsg.map((res) => {
                arr.push(res.postid);
            })
            setcategoryposts(arr);

        }).catch((error) => {
            alert(error);
        });
    }

    const deleteCategory = () => {
        if (confirm("Are you sure to delete this category?")) {
            axios({
                method: "POST",
                url: route("admin.getdata"),
                data: {
                    mode: "deleteCategory",
                    categoryid: categoryid,
                },
            }).then(res => {
                const respmsg = res.data;
                window.location.reload();

            }).catch((error) => {
                alert(error);
            });
        }
    }

    const submitCategory = () => {
        axios({
            method: "POST",
            url: route("admin.getdata"),
            data: {
                mode: "submitCategoryPost",
                categoryid: categoryid,
                active: active,
                categoryposts: categoryposts
            },
        }).then(res => {
            const respmsg = res.data;
            window.location.reload();
        }).catch((error) => {
            alert(error);
        });
    }

    const addCategory = () => {
        if (newcategoryname == '') {
            alert("Enter Category Name...");
            return false;
        } else if (newcategoryposts.length == 0) {
            alert("Select Post...");
            return false;
        }
        axios({
            method: "POST",
            url: route("admin.getdata"),
            data: {
                mode: "addNewCategory",
                newcategoryname: newcategoryname,
                newcategoryposts: newcategoryposts,
                newactive: newactive
            },
        }).then(res => {
            const respmsg = res.data;
            window.location.reload();
        }).catch((error) => {
            alert(error);
        });
    }

    useEffect(() => {
        setcategories(props.categories);
        setposts(props.posts);
    }, []);

    const AntSwitch = styled(Switch)(({ theme }) => ({
        width: 35,
        height: 25,
        padding: 0,
        display: 'flex',
        '&:active': {
            '& .MuiSwitch-thumb': {
                width: 15,
            },
            '& .MuiSwitch-switchBase.Mui-checked': {
                transform: 'translateX(9px)',
            },
        },
        '& .MuiSwitch-switchBase': {
            padding: 2,
            '&.Mui-checked': {
                transform: 'translateX(12px)',
                color: '#fff',
                '& + .MuiSwitch-track': {
                    opacity: 1,
                    backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#173742',
                },
            },
        },
        '& .MuiSwitch-thumb': {
            boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
            width: 20,
            height: 20,
            borderRadius: 6,
            transition: theme.transitions.create(['width'], {
                duration: 200,
            }),
        },
        '& .MuiSwitch-track': {
            borderRadius: 16 / 2,
            opacity: 1,
            backgroundColor:
                theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
            boxSizing: 'border-box',
        },
    }));

    return (
        <AdminLayout>
            <Container fluid>
                <Head title="Categories" />
                <Row>
                    <Col xs={12} lg={12}>
                        <Row>
                            <Col xs={3} lg={3}><h3>Categories&nbsp;<ControlPointRoundedIcon className='cursor-pointer' onClick={() => setmodalshow(true)} /></h3>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <hr />
                <Row className='m-3'>
                    <Col xs={12} lg={12}>
                        <Row>
                            <Col xs={6} lg={6}>
                                <Autocomplete
                                    size="small"
                                    disablePortal
                                    key={categoryid}
                                    value={categories.find((o) => { return categoryid == o.categoryid })}
                                    id="combo-box-demo"
                                    options={categories}
                                    getOptionLabel={(option) => option.categoryname}
                                    onChange={(event, newValue) => changeCategory(newValue)}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Select Category" />
                                    )}
                                />
                            </Col>
                            {categoryid > 0 && <Col xs={6} lg={6} >
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <Typography>Inactive</Typography>
                                    <AntSwitch inputProps={{ 'aria-label': 'ant design' }} onChange={() => setactive(active == 0 ? 1 : 0)} checked={active == 0 ? true : false} />
                                    <Typography>Active</Typography>
                                </Stack>
                            </Col>}
                        </Row>
                    </Col>
                </Row>
                <Row className='m-3'>
                    <Col xs={12} lg={12}>
                        <Row>
                            <Col xs={6} lg={6}>
                                <Autocomplete
                                    multiple
                                    limitTags={15}
                                    id="categoryposts"
                                    value={posts.filter((el) => categoryposts.includes(el.postid))}
                                    options={posts}
                                    onChange={(event, newValue) => handleOptionSelect(event, newValue)}
                                    getOptionLabel={(option) => option.postname}
                                    filterSelectedOptions
                                    size="small"
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            key={params.postid}
                                            label="Posts"
                                            placeholder="Select Post"
                                        />
                                    )}
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>
                {categoryid > 0 && <Row className='m-3'>
                    <Col xs={12} lg={12}>
                        <Row>
                            <Col xs={6} lg={6} className='d-flex'>
                                <Button className='btn1 px-3 fz-1' onClick={submitCategory}>Submit</Button>&nbsp;
                                <Button className='btn btn-danger px-3 fz-1' onClick={deleteCategory}>Delete Category</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>}
            </Container>
            <Modal
                dialogClassName="my-modal"
                show={modalshow}
                onHide={() => setmodalshow(false)}
                backdrop="static"
                keyboard={false}
                size="lg"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add New Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col xs={12} lg={12}>
                            <TextField
                                label="Category Name"
                                className='w-100'
                                id="standard-basic"
                                value={newcategoryname}
                                onChange={(event) => setnewcategoryname(event.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row className='mt-3'>
                        <Col xs={12} lg={12}>
                            <Autocomplete
                                multiple
                                limitTags={15}
                                id="categoryposts"
                                value={posts.filter((el) => newcategoryposts.includes(el.postid))}
                                options={posts}
                                onChange={(event, newValue) => newcategoryselect(event, newValue)}
                                getOptionLabel={(option) => option.postname}
                                filterSelectedOptions
                                size="small"
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        key={params.postid}
                                        label="Posts"
                                        placeholder="Select Post"
                                    />
                                )}
                            />
                        </Col>
                    </Row>
                    <Row className='mt-3'>
                        <Col xs={12} lg={12}>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <Typography>Inactive</Typography>
                                <AntSwitch inputProps={{ 'aria-label': 'ant design' }} onChange={() => setnewactive(newactive == 0 ? 1 : 0)} checked={newactive == 0 ? true : false} />
                                <Typography>Active</Typography>
                            </Stack>
                        </Col>
                    </Row>

                </Modal.Body>
                <Modal.Footer>
                    <Button className='btn1 w-25 p-2 fz-1' onClick={addCategory}>Add Category</Button>
                </Modal.Footer>
            </Modal>
        </AdminLayout>
    )
}

export default Categories