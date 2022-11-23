import React, {ReactNode} from 'react'

import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Skeleton from '@mui/material/Skeleton'
import Paper from '@mui/material/Paper'

import { OtherType } from '../../features/typeGuards'
import LoadedImage from '../LoadedImage'

type Info = ReturnType<typeof OtherType>

type Props = {
    key: React.Key,
    info?: Info | undefined,
    children?: ReactNode,
}

const InfoCard = ({ info }: Props) => {
    return (
        <Card component={Paper} sx={{ 
            width: '100%',  
            padding: 0,
        }} elevation={3}
        >
            <CardActionArea sx={{ 
                width: '100%', 
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'start',
                alignItems: 'start',
                position: 'relative',
            }}>
                {info ? (<LoadedImage height={200} src={info.image_background} name={info.name} />) : 
                (<Skeleton animation='wave' variant='rectangular' sx={{ width: '100%', height: 200 }}/>)}

                <CardContent sx={{
                    display: 'flex',
                    gap: 1,
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: '100%', 
                }}>
                    {info ? (
                        <Typography variant='subtitle2' 
                        sx={{ 
                            color: 'yellow'
                        }}
                        fontSize={{ xs: 18, sm: 20 }}
                        >
                            {info.name}
                        </Typography>
                    ) : 
                    (<Skeleton animation='wave' variant='rectangular' sx={{ width: '100%' }}/>)}
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default InfoCard