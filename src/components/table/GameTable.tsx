import React, { useState } from 'react'

import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Skeleton from '@mui/material/Skeleton'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'

import visuallyHidden from '@mui/utils/visuallyHidden'

import { GameType } from '../../features/typeGuards'
import { GamesProps } from '../Games'
import LoadedImage from '../LoadedImage'

type Game = ReturnType<typeof GameType>

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

type Order = 'asc' | 'desc';

function getComparator<T>(
    order: Order,
    orderBy: keyof T,
): <K extends T>(a: K, b: K) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
    id: keyof Game;
    label: string;
    align: 'left' | 'center' | 'right';
    allowSort: boolean;
}

const headCells: readonly HeadCell[] = [
    {
        id: 'id',
        align: 'left',
        label: 'ID',
        allowSort: true,
    },
    {
        id: 'background_image',
        align: 'center',
        label: 'Game Cover',
        allowSort: false,
    },
    {
        id: 'name',
        align: 'left',
        label: 'Name',
        allowSort: true,
    },
    {
        id: 'genres',
        align: 'center',
        label: 'Genres',
        allowSort: false,
    },
    {
        id: 'released',
        align: 'left',
        label: 'Released',
        allowSort: true,
    },
    {
        id: 'rating',
        align: 'left',
        label: 'Rating',
        allowSort: true,
    },
];

interface EnhancedTableProps {
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Game) => void;
    order: Order;
    orderBy: string;
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property: keyof Game) => 
        (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.align}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        {headCell.allowSort ? (
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.id)}
                            >
                                <Typography variant='subtitle1'>{headCell.label}</Typography>
                                <Box component='span' sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            </TableSortLabel>) : (<Typography variant='subtitle1'>{headCell.label}</Typography>)}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}
const GameTable = ({ data, isFetching, rowsPerPage }: GamesProps) => {
    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<keyof Game>('name');

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof Game,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    return (
        <Box sx={{ width: '100%' }} component={Paper}>
            <TableContainer sx={{ width: '100%', overflow: 'auto'}}>
                <Table sx={{ width: '100%' }} aria-label='table of video games'>
                    <EnhancedTableHead
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                    />
                    <TableBody>
                        {isFetching && (
                            Array.from(Array(rowsPerPage).keys()).map(index => (
                                <TableRow key={index} sx={{ width: '100%' }}>
                                    <TableCell align='left'>
                                        <Skeleton variant='rectangular'
                                            sx={{ height: { xs: 40, lg: 100 } }} animation='wave' />
                                    </TableCell>
                                    <TableCell align='center' sx={{ width: 200 }}>
                                        <Skeleton variant='rectangular'
                                            sx={{ height: { xs: 40, lg: 100 } }} animation='wave' />
                                    </TableCell>
                                    <TableCell align='left'>
                                        <Skeleton variant='rectangular'
                                            sx={{ height: { xs: 40, lg: 100 } }} animation='wave' />
                                    </TableCell>
                                    <TableCell align='center'>
                                        <Skeleton variant='rectangular'
                                            sx={{ height: { xs: 40, lg: 100 } }} animation='wave' />
                                    </TableCell>
                                    <TableCell align='left'>
                                        <Skeleton variant='rectangular'
                                            sx={{ height: { xs: 40, lg: 100 } }} animation='wave' />
                                    </TableCell>
                                    <TableCell align='left'>
                                        <Skeleton variant='rectangular'
                                            sx={{ height: { xs: 40, lg: 100 } }} animation='wave' />
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                        {!isFetching && data && stableSort<Game>(data.results, getComparator<Game>(order, orderBy))
                            .map((game) => (
                                <TableRow
                                    key={game.id}
                                    sx={{
                                        width: '100%',
                                        backgroundColor: `${game.dominant_color}`
                                    }}
                                >
                                    <TableCell align='left'>{game.id}</TableCell>
                                    <TableCell align='center' sx={{ width: 150 }}>
                                        <Card>
                                            <LoadedImage height={100} src={game?.background_image}
                                            name={game?.name} />
                                        </Card>
                                    </TableCell>
                                    <TableCell align='left'>{game.name}</TableCell>
                                    <TableCell align='center'>
                                        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', justifyContent: 'center' }}>
                                            {game.genres.map(genre => (
                                                <Button variant='contained' color='secondary' key={genre.name} sx={{
                                                    maxWidth: { xs: 50, lg: 100 },
                                                    fontSize: { xs: 8, lg: 12 },
                                                }}>{genre.name}</Button>
                                            ))}
                                        </Box>
                                    </TableCell>
                                    <TableCell align='left'>{game.released}</TableCell>
                                    <TableCell align='left'>{game.rating}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
        
    )
}

export default GameTable