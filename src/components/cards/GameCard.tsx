import React, { ReactNode } from 'react'

import {
    Typography,
    Box,
    Card,
    CardContent,
    CardActionArea,
    Chip,
    Rating,
    Skeleton
} from '@mui/material'

import { GameType } from '../../features/typeGuards'
import LoadedImage from '../LoadedImage'

type Game = ReturnType<typeof GameType>

type Props = {
    key: React.Key,
    info?: Game | undefined,
    children?: ReactNode,
}

const GameCard = ({ info }: Props) => {

    return (
        <Card sx={{ 
            width: '100%', 
            height: '100%', 
            padding: 0,
        }}
        >
            <CardActionArea sx={{ 
                width: '100%', 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'start',
                alignItems: 'start'
            }}>
                {info ? (<LoadedImage height={180} src={info.background_image} name={info.name} />) : 
                (<Skeleton animation='wave' variant='rectangular' sx={{ width: '100%', height: 180 }}/>)
                }

                <CardContent sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    position: 'relative',
                    flex: 1,
                    width: '100%', 
                }}>
                    {info ? (<Box sx={{
                        width: '100%', 
                        display: 'flex', 
                        flexDirection: 'column',
                        alignItems: 'start',
                        flexWrap: 'wrap',
                        flex: 1,
                    }}>
                        <Typography variant='h6' fontSize={16} sx={{ flex: 1 }}>{info?.name}</Typography>
                        <span style={{
                            display: 'flex', 
                            justifyContent: 'start',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            gap: 1,
                        }}>
                            <Rating name="game-rating" value={info?.rating} precision={0.5} readOnly />
                            <Typography component='p' fontSize={12}
                            sx={{ display: 'inline', alignSelf: 'self-end'}}>{info?.rating}</Typography>
                        </span>
                    </Box>) : 
                    (<Skeleton animation='wave' variant='rectangular' sx={{ width: '100%', height: 50}}/>)}

                    {info ? (<Typography fontSize={12}>Released: {info?.released}</Typography>) :
                    (<Skeleton animation='wave' variant='rectangular' sx={{ width: '100%'}}/>) }

                    <Box sx={{
                        width: '100%', 
                        display: 'flex', 
                        justifyContent: 'start',
                        flexWrap: 'wrap',
                        gap: 0.5,
                        padding: 0,
                    }}>
                        {info ? (<>
                        {info.genres?.filter((_, index) => index < 2)
                        .map((genre, index: number) => (
                            <Chip key={index} size='small'
                            label={genre?.name} sx={{ backgroundColor: info.dominant_color }} />
                        ))}
                        {info.genres?.length > 2 && (<Chip key={'ellipsis'} size='small'
                            label='...' sx={{ backgroundColor: info.dominant_color }} />)}
                        </>): (<Skeleton animation='wave' variant='rectangular' sx={{ width: '100%'}}/>)}
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default GameCard