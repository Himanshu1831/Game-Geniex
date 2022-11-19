import React, { ReactNode } from 'react'

import {
    Typography,
    Box,
    Card,
    CardContent,
    CardActionArea,
    CardMedia,
    Chip,
    Rating,
    Skeleton
} from '@mui/material'

import { GameType } from '../../features/typeGuards'

type Game = ReturnType<typeof GameType>

type Props = {
    key: React.Key,
    game?: Game | undefined,
    children?: ReactNode,
}

const GameCard = ({ game }: Props) => {

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
                {game ? (<CardMedia 
                component='img'
                image={game?.background_image}
                alt={game?.name} 
                sx={{
                    width: '100%', 
                    height: 180,
                    objectPosition: 'top',
                    objectFit: 'cover'
                }}/>) : 
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
                    {game ? (<Box sx={{
                        width: '100%', 
                        display: 'flex', 
                        alignItems: 'start',
                        flexWrap: 'wrap',
                        gap: 2,
                        flex: 1,
                    }}>
                        <Typography variant='h6' fontSize={16} sx={{ flex: 1}}>{game?.name}</Typography>
                        <span style={{
                            display: 'flex', 
                            justifyContent: 'start',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            gap: 1,
                        }}>
                            <Rating name="game-rating" value={game?.rating} precision={0.5} readOnly />
                            <Typography component='p' fontSize={12}
                            sx={{ display: 'inline', alignSelf: 'self-end'}}>{game?.rating}</Typography>
                        </span>
                    </Box>) : (<Skeleton animation='wave' variant='rectangular' sx={{ width: '100%'}}/>)}
                    {game ? (<Typography fontSize={12}>Released: {game?.released}</Typography>) :
                    (<Skeleton animation='wave' variant='rectangular' sx={{ width: '100%'}}/>) }
                    <Box sx={{
                        width: '100%', 
                        display: 'flex', 
                        justifyContent: 'start',
                        flexWrap: 'wrap',
                        gap: 0.5,
                        padding: 0,
                    }}>
                        {game ? game.genres?.map((genre, index: number) => (
                            <Chip key={index} size='small'
                            label={genre?.name} sx={{ backgroundColor: game.dominant_color }} />
                        )) : (<Skeleton animation='wave' variant='rectangular' sx={{ width: '100%'}}/>)}
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default GameCard