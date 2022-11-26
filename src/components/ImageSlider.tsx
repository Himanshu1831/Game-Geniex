import React, { useState, useRef, useCallback, startTransition, useEffect } from 'react'

import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Slide from '@mui/material/Slide';
import IconButton from '@mui/material/IconButton';

import LoadedImage from './LoadedImage';

interface Props {
  images: Array<{ id: number, image: string }>;
  width: string | number | undefined;
}

const ImageSlider = ({ images, width }: Props) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [image, setImage] = useState(0);

    const handleNextImage = useCallback(() => {
        if (image < images.length - 1) {
            console.log(image)
            setImage(image => image + 1)
        }
    }, [image])

    const handlePreviousImage = useCallback(() => {
        if (image > 0) {
            setImage(image => image - 1)
        }
    }, [image])
    
    return (
        <Box
            sx={{
                width: width,
                position: 'relative',
            }}
            component={Paper}
            elevation={3}
            ref={containerRef}
        >
            <Slide direction="right" in={true} mountOnEnter unmountOnExit>
                <div>
                    <LoadedImage height='100%' src={images[image].image} />
                </div>
            </Slide>
            <div style={{
                position: 'absolute' as 'absolute',
                inset: 0,
                width: '100%',
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
            }}>
                <FaChevronLeft
                    filter='invert(1)'
                    style={{
                        fontSize: '2rem',
                        alignSelf: 'center',
                        cursor: 'pointer'
                    }}
                    onClick={handlePreviousImage} />
                <FaChevronRight
                    filter='invert(1)'
                    style={{
                        fontSize: '2rem',
                        justifySelf: 'end',
                        alignSelf: 'center',
                        cursor: 'pointer'
                    }}
                    onClick={handleNextImage} />
            </div>
        </Box>
    )
}

export default ImageSlider