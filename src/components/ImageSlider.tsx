import { useState, useRef, useCallback } from 'react'

import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Slide from '@mui/material/Slide';
import Typography from '@mui/material/Typography';

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
                <div style={{
                    position: 'relative',
                }}>
                    <LoadedImage height='100%' src={images[image].image} />
                    {images.length > 1 && (
                        <Typography 
                        component='p' 
                        variant='h3' 
                        sx={{ 
                            position: 'absolute', 
                            fontWeight: 700,
                            top: '0.2em', 
                            left: '0.2em',
                            fontStyle: 'italic',
                            textShadow: '0px -1px #ddd',
                            filter: 'invert(1)'
                        }}>
                            {image + 1}
                        </Typography>
                    )}
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
                    data-testid='previousBtn'
                    style={{
                        fontSize: '2rem',
                        alignSelf: 'center',
                        cursor: 'pointer'
                    }}
                    onClick={handlePreviousImage} />
                <FaChevronRight
                    filter='invert(1)'
                    data-testid='nextBtn'
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