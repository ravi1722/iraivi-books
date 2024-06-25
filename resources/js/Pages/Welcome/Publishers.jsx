import React from 'react'
import Navbar from './Navbar'

function Publishers(props) {
    return (
        <>
            <Navbar />
            <div className='container py-3'>
                <div className='row'>
                    <div className='col-md-12'>
                        <div className="p-3 allbook-title">
                            <h2 className="mb-0 fs-3">Publishers</h2>
                        </div>
                        <div className='p-3'>
                        {props.publishers.map((publisher) => {
                            return (
                                <div key={publisher.publisherid}>
                                    <a href={'/allbooks/publisher/' +btoa(publisher.publisherid)}>{publisher.tamilname}</a>
                                </div>
                            )
                        })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Publishers