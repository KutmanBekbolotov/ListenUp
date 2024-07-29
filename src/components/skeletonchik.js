import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import './AppModule.css'
import SongSearch from "./MusicSearcher";

const Skeletonchik = () => {
    return (
        <>
            <div className={"song-list"}>
                <SongSearch/>
                <Skeleton variant="rounded" width={"100%"} height={60} sx={{marginBottom: "10px"}} />
                <Skeleton variant="rounded" width={"100%"} height={60} sx={{marginBottom: "10px"}} />
                <Skeleton variant="rounded" width={"100%"} height={60} sx={{marginBottom: "10px"}} />
                <Skeleton variant="rounded" width={"100%"} height={60} sx={{marginBottom: "10px"}} />
                <Skeleton variant="rounded" width={"100%"} height={60} sx={{marginBottom: "10px"}} />
                <Skeleton variant="rounded" width={"100%"} height={60} sx={{marginBottom: "10px"}} />
                <Skeleton variant="rounded" width={"100%"} height={60} sx={{marginBottom: "10px"}} />
                <Skeleton variant="rounded" width={"100%"} height={60} sx={{marginBottom: "10px"}} />
                <Skeleton variant="rounded" width={"100%"} height={60} sx={{marginBottom: "10px"}} />
                <Skeleton variant="rounded" width={"100%"} height={60} sx={{marginBottom: "10px"}} />
                <Skeleton variant="rounded" width={"100%"} height={60} sx={{marginBottom: "10px"}} />
                <Skeleton variant="rounded" width={"100%"} height={60} sx={{marginBottom: "10px"}} />
                <Skeleton variant="rounded" width={"100%"} height={60} sx={{marginBottom: "10px"}} />
                <Skeleton variant="rounded" width={"100%"} height={60} sx={{marginBottom: "10px"}} />
                <Skeleton variant="rounded" width={"100%"} height={60} sx={{marginBottom: "10px"}} />
                <Skeleton variant="rounded" width={"100%"} height={60} sx={{marginBottom: "10px"}} />
            </div>
        </>
    );
};

export default Skeletonchik;
