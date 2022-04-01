import React from 'react';
import measurePhoto from '../images/Measure twice picture.jpg'

const Home = () => {
    return (
        <div>
            <h1>First Line of Da Fence</h1>
            <img style={{width: 400}} src={measurePhoto} alt="measure twice, cut once"/>
        </div>

    )
};

export default Home;