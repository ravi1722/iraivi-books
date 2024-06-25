import AdminLayout from '@/Layouts/AdminLayout'
import React from 'react'
import { Col, Row } from 'react-bootstrap'
import Card from 'react-bootstrap/Card';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import DataThresholdingOutlinedIcon from '@mui/icons-material/DataThresholdingOutlined';
import CreditScoreOutlinedIcon from '@mui/icons-material/CreditScoreOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';

function Dashboard(props) {
    return (
        <AdminLayout>
            <h3>Dashboard</h3>
            <hr />
            <Row>
                <Col xs={2} md={2} sm={2} lg={2}>
                    <Card
                        bg={'Secondary'}
                        className="mb-2 cursor-pointer"
                    >
                        <Card.Header>Total Posts</Card.Header>
                        <Card.Body>
                            <span className='fs-1 float-end'><LibraryBooksIcon className='fs-1 mr-2'/>{props.data.posts}</span>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={2} md={2} sm={2} lg={2}>
                    <Card
                        bg={'Secondary'}
                        className="mb-2 cursor-pointer"
                    >
                        <Card.Header>Total Customers</Card.Header>
                        <Card.Body>
                            <span className='fs-1 float-end'><SupervisorAccountIcon className='fs-1 mr-2'/>0</span>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={2} md={2} sm={2} lg={2}>
                    <Card
                        bg={'Secondary'}
                        className="mb-2 cursor-pointer"
                    >
                        <Card.Header>Total Sessions</Card.Header>
                        <Card.Body>
                            <span className='fs-1 float-end'><ShoppingCartOutlinedIcon className='fs-1 mr-2'/>0</span>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={2} md={2} sm={2} lg={2}>
                    <Card
                        bg={'Secondary'}
                        className="mb-2 cursor-pointer"
                    >
                        <Card.Header>Total Sold</Card.Header>
                        <Card.Body>
                            <span className='fs-1 float-end'><DataThresholdingOutlinedIcon className='fs-1 mr-2'/>0</span>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={2} md={2} sm={2} lg={2}>
                    <Card
                        bg={'Secondary'}
                        className="mb-2 cursor-pointer"
                    >
                        <Card.Header>Total Received</Card.Header>
                        <Card.Body>
                            <span className='fs-1 float-end'><CreditScoreOutlinedIcon className='fs-1 mr-2'/>0</span>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={2} md={2} sm={2} lg={2}>
                    <Card
                        bg={'Secondary'}
                        className="mb-2 cursor-pointer"
                    >
                        <Card.Header>Total Receivable</Card.Header>
                        <Card.Body>
                            <span className='fs-1 float-end'><CreditCardOutlinedIcon className='fs-1 mr-2'/>78</span>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </AdminLayout>
    )
}

export default Dashboard