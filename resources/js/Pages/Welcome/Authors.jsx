import React from 'react'
import Navbar from './Navbar'

function Authors(props) {
    return (
        <>
            <Navbar />
            <div className='container py-3'>
                <div className='row'>
                    <div className='col-md-12'>
                        <div className="p-3 allbook-title">
                            <h2 className="mb-0 fs-3">Authors</h2>
                        </div>
                        <div className='p-3'>
                        {props.authors.map((author) => {
                            return (
                                <div key={author.authorid}>
                                    <a href={'/allbooks/author/' +btoa(author.authorid)}>{author.tamilname}</a>
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

export default Authors