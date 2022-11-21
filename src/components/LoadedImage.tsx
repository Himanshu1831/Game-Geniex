import React, { HTMLAttributes, useState, useEffect } from 'react'

import CardMedia from '@mui/material/CardMedia'
import { Skeleton } from '@mui/material';

interface Props extends HTMLAttributes<HTMLImageElement> {
    height?: number | string;
    src: string;
    name: string;
}

enum Status {
    Pending,
    Success,
    Failure
} 

const LoadedImage = (props: Props) => {
    const { height, src, name, ...htmlAttributes } = props;
    const [status, setStatus] = useState<Status>(Status.Pending);
    const [image, setImage] = useState<HTMLImageElement>();
    
    useEffect(() => {
        const image = new Image();
        image.onload = () => setStatus(Status.Success)
        image.onerror = () => setStatus(Status.Failure)
        image.src = src;
        setImage(image)
    }, [])
    

    return (
        <>
            {status === Status.Success ? (
                <CardMedia 
                component='img'
                image={image?.src}
                alt={name} 
                {...htmlAttributes}
                sx={{
                    width: '100%', 
                    height: height,
                    objectPosition: 'top',
                    objectFit: 'cover'
                }} />
            ) : (
                <Skeleton variant='rectangular' 
                width='100%' height={height} animation='wave' />
            )}
        </>
    )
}

export default LoadedImage