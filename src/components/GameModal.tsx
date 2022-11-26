import React from 'react'

import { IoMdClose } from 'react-icons/io'

import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Skeleton from '@mui/material/Skeleton'
import Chip from '@mui/material/Chip'
import Rating from '@mui/material/Rating'
import Link from '@mui/material/Link'
import { useTheme } from '@mui/material/styles'

import { useGetGameDetailsQuery } from '../redux/api/gameAPI';
import ImageSlider from './ImageSlider'

const style = {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    top: '50%',
    left: '50%',
    overflow: 'auto',
    height: '90vh',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    gap: 2,
    fontSize: { xs: 14, lg: 18 }
};

const SkeletonModal = React.forwardRef((props, ref) => {
    return (
        <Box sx={style}>
            <Skeleton variant='rectangular' width='100%' height={100} animation='wave' />
            <Skeleton variant='rectangular' width='100%' height={400} animation='wave' />
            <Skeleton variant='rectangular' width='100%' height={200} animation='wave' />
            <Skeleton variant='rectangular' width='100%' height={50} animation='wave' />
            <Skeleton variant='rectangular' width='100%' height={100} animation='wave' />
            <Skeleton variant='rectangular' width='100%' height={150} animation='wave' />
            <Skeleton variant='rectangular' width='100%' height={150} animation='wave' />
            <Skeleton variant='rectangular' width='100%' height={150} animation='wave' />
            <Skeleton variant='rectangular' width='100%' height={150} animation='wave' />
        </Box>
    )
})

const ChipsGroup = ({ name, data }: { name: string, data: any }) => {
    return (
        <>
            <Typography 
            variant='h6' 
            component='h3' 
            sx={{ textTransform: 'capitalize' }}>
                {name}
            </Typography>
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '5px',
                width: '100%',
            }}>
                {data.map((obj: any, index: number) => (
                    <Chip 
                    key={obj.id || `${name}-${index}`} 
                    label={obj.name} 
                    size='small' 
                    sx={{ 
                        textTransform: 'capitalize',
                        fontSize: { xs: 12, lg: 16 },
                        paddingX: 1,
                        paddingY: 2,
                    }} />
                ))}
            </div>
        </>
    )
}

interface Props {
    open: boolean,
    handleClose: () => void;
    id: number;
    images: Array<{ id: number, image: string }>;
}

const GameModal = ({ id, open, handleClose, images }: Props) => {
    const theme = useTheme();

    const { data, isFetching } = useGetGameDetailsQuery(id);

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            {(isFetching || !data) ? (<SkeletonModal />) :
                (<Box sx={style}>
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        width: '100%',
                        alignItems: 'flex-start'
                    }}>
                        <div style={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '5px',
                        }}>
                            <Typography variant='h6'>{data.name}</Typography>
                            <span style={{
                                display: 'flex',
                                justifyContent: 'start',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                                gap: '5px',
                            }}>
                                <Rating name="game-rating" value={data.rating} precision={0.5} readOnly />
                                <Typography component='p' fontSize={12}
                                    sx={{ display: 'inline', alignSelf: 'self-end' }}>{data.rating}</Typography>
                            </span>
                        </div>
                        <IconButton onClick={handleClose}><IoMdClose /></IconButton>
                    </div>

                    <ImageSlider images={images} width='100%' />
                    <Typography 
                    variant='caption' 
                    sx={{
                        fontSize: { xs: 12, lg: 16 },
                    }}>
                        Source: &nbsp;
                        <Link 
                        underline='hover'
                        component='a' 
                        href='https://api.rawg.io/docs/'>
                            RAWG Game Database
                        </Link>
                    </Typography>

                    <div
                        id='modal-description'
                        style={{
                            fontFamily: theme.typography.fontFamily,
                            lineHeight: 1.5,
                            margin: '10px 0px',
                        }}
                        dangerouslySetInnerHTML={{ __html: data?.description }} />

                    <Typography variant='h6' component='h3'>Ofiicial Website</Typography>
                    <Link 
                    component='a' 
                    underline='hover' 
                    href={data.website} 
                    rel="noreferrer"
                    target='_blank'
                    sx={{ fontFamily: theme.typography.fontFamily }}>
                        {data.website}
                    </Link>

                    <Typography variant='h6' component='h3'>Released</Typography>
                    <Typography 
                    variant='body2' 
                    component='p' 
                    sx={{
                        fontSize: { xs: 12, lg: 16 },
                    }}>{data.released}</Typography>

                    <ChipsGroup name='genres' data={data.genres} />
                    <ChipsGroup name='tags' data={data.tags} />
                    <ChipsGroup name='developers' data={data.developers} />
                    <ChipsGroup name='publishers' data={data.publishers} />

                    <Typography variant='h6' component='h3'>Sold at</Typography>
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '5px',
                        width: '100%'
                    }}>
                        {data.stores.map(({ id, store }: any) => (
                            <Chip
                                label={store.name}
                                component="a"
                                href={`http://${store.domain}`}
                                clickable
                                key={id}
                                rel="noreferrer"
                                target='_blank'
                                sx={{ 
                                    textTransform: 'capitalize',
                                    fontSize: { xs: 12, lg: 16 },
                                    paddingX: 1,
                                    paddingY: 2,
                                 }}/>
                        ))}
                    </div>
                </Box>)}
        </Modal>
    )
}

export default GameModal