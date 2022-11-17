import React, { useState } from 'react'
import { 
    Box,
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    TablePagination,
    Toolbar,
    Paper,
    TableSortLabel,
    Typography,
    Skeleton,
    Button,
} from '@mui/material'
import { visuallyHidden } from '@mui/utils'

import { Game } from '../../features/types'
import { useGetGamesListQuery } from '../../redux/api/gameAPI'

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

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
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
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            </TableSortLabel>) : (<Typography variant='subtitle1'>{headCell.label}</Typography>)}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

function TableToolbar() {
    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 }
            }}
        >
            <Typography
                sx={{ flex: '1 1 100%' }}
                variant="h6"
                id="tableTitle"
                component="div"
            >
                Video Games
            </Typography>
        </Toolbar>
    );
}

const GameTable = () => {
    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<keyof Game>('name');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10)
	const { data, isFetching, error} = useGetGamesListQuery({page: page + 1, pageCount: rowsPerPage});

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof Game,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    if (error) return <div>Something went wrong!</div>

    console.log(data)
    return (
        <Box sx={{ width: '100%'}}>
            <Paper sx={{ width: '100%'}}>
                <TableToolbar />
                <TableContainer>
                    <Table sx={{width: '100%'}} aria-label='table of video games'>
                        <EnhancedTableHead
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                        />
                        <TableBody>
                            {isFetching && (
                                Array.from(Array(rowsPerPage).keys()).map(index => (
                                    <TableRow key={index} sx={{width: '100%'}}>
                                        <TableCell align='left'>
                                            <Skeleton variant='rectangular' sx={{ height: { xs: 40, lg: 100} }} animation='wave' />
                                        </TableCell>
                                        <TableCell align='center' sx={{width: 200}}>
                                            <Skeleton variant='rectangular' sx={{ height: { xs: 40, lg: 100} }} animation='wave' />
                                        </TableCell>
                                        <TableCell align='left'>
                                            <Skeleton variant='rectangular' sx={{ height: { xs: 40, lg: 100} }} animation='wave' />
                                        </TableCell>
                                        <TableCell align='center'>
                                            <Skeleton variant='rectangular' sx={{ height: { xs: 40, lg: 100} }} animation='wave' />
                                        </TableCell>
                                        <TableCell align='left'>
                                            <Skeleton variant='rectangular' sx={{ height: { xs: 40, lg: 100} }} animation='wave' />
                                        </TableCell>
                                        <TableCell align='left'>
                                            <Skeleton variant='rectangular' sx={{ height: { xs: 40, lg: 100} }} animation='wave' />
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                            {!isFetching && data && stableSort(data.results, getComparator(order, orderBy))
                            .map((game) => (
                                <TableRow
                                key={game.id}
                                sx={{
                                    width: '100%',
                                    backgroundColor: `${game.dominant_color}`    
                                }}
                                >
                                    <TableCell align='left'>{game.id}</TableCell>
                                    <TableCell align='center' sx={{width: 200}}>
                                        <Paper sx={{ width: '100%' }} elevation={3}>
                                            <img src={game.background_image as string} alt={game.name as string} />
                                        </Paper>
                                    </TableCell>
                                    <TableCell align='left'>{game.name}</TableCell>
                                    <TableCell align='center'>
                                        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                                        {Array.isArray(game.genres) && game.genres.map(genre => (
                                            <Button variant='contained' color='secondary' sx={{
                                                mr: 1,
                                                maxWidth: {xs: 50, lg: 100},
                                                fontSize: {xs: 8, lg: 12},
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
            </Paper>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                component="div"
                count={-1}
                rowsPerPage={rowsPerPage}
                page={page}//0-based
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Box>
        
    )
}

export default GameTable