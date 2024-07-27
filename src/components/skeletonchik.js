import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import './AppModule.css'

const Skeletonchik = () => {
    return (
        <>
            <div className={"song-list"}>
                <Skeleton variant="rounded" width={"100%"} height={60} sx={{marginBottom: "10px"}} />
                <Skeleton variant="rounded" width={"100%"} height={60} sx={{marginBottom: "10px"}} />
                <Skeleton variant="rounded" width={"100%"} height={60} sx={{marginBottom: "10px"}} />
                <Skeleton variant="rounded" width={"100%"} height={60} sx={{marginBottom: "10px"}} />
            </div>
        </>
    );
};

export default Skeletonchik;
