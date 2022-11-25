import React, {ReactNode, useCallback, useState} from 'react'

import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Skeleton from '@mui/material/Skeleton'
import Paper from '@mui/material/Paper'

import { OtherType } from '../../features/typeGuards'
import LoadedImage from '../LoadedImage'
import { BsFillCheckCircleFill } from 'react-icons/bs'

type Info = ReturnType<typeof OtherType>

type Props = {
    key: React.Key,
    info?: Info | undefined,
    children?: ReactNode,
}

const InfoCard = ({ info }: Props) => {
    const [selected, setSelected] = useState(false);

    const handleClick = useCallback((e) => {
        setSelected(prev => !prev);
    }, [])
    
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
            }}
            onClick={handleClick}>
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
                {selected && (
                    <BsFillCheckCircleFill style={{
                        position: 'absolute', 
                        top: 4, 
                        right: 4,
                        padding: 0,
                        zIndex: 20,
                        fontSize: 24,
                        color: 'yellow'
                     }} />
                )}
            </CardActionArea>
        </Card>
    )
}

export default InfoCard