import { Link, Head } from '@inertiajs/react';
import HeaderSlider from './Welcome/HeaderSlider';
import Categories from './Welcome/Categories';
import { useEffect, useState } from 'react';
import Navbar from './Welcome/Navbar';
import Footer from './Welcome/Footer';
import { Height } from '@mui/icons-material';

export default function Welcome(props) {

    const [allcategories, setallcategories] = useState([]);

    useEffect(() => {
        setallcategories(props.categories);
    }, []);

    return (
        <>
            <Navbar />
            <div className='container'>
                <HeaderSlider />
                {allcategories.map((category) => {
                    return (
                        <Categories key={category.categoryid} category={category} />
                    )
                })}
            </div>
            <Footer />
        </>
    );
}
