import React from 'react';

import '../newPage/HomepageTwo.css'; 
import Sidebar from '../SubComponents/Sidebar/sidebar';


const MusicPlayerPlatform = () => {


    return (
        <div className="homepage">
            <Sidebar />
            <header className='redheader'>
                <div className='text-header' id='music'>Music</div>
                <div className='text-header' id='music'>Podcast</div>
                <div className='text-header' id='music'>Live</div>
                <div className='text-header' id='music'>Radio</div>
            </header>

            <section className='section-platform'>
                <div className='text'>Discover</div>
                <div className='cover'>
                    <img alt=''></img>
                    <div className='text-cover'>Trending New Hits</div>
                    <div className='text-cover'>
                        <div className='text-cover'>John Murphy</div>
                        <div className='podtext'>40 Million plays</div>
                    </div>
                    <div className='like'>
                        <button id='btn'></button>
                        <button id='like-btn'></button>
                    </div>
                </div>
                <div className='cover-two'>
                    <div className='text-header-cover'>
                        <div className='text-cover'>Global Top 50</div> 
                        <div className='podtext'>See all</div>
                </div>
                <div className='your-music'>
                    <div className='img'></div>
                    
                </div>
                </div>

            </section>


        </div>
    );
};

export default MusicPlayerPlatform;
