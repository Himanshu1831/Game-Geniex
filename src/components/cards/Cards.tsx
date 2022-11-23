import { Box } from '@mui/material';
import { TypeGuard } from '../../features';
import { ItemsPerPage } from '../pagination';

interface Props {
    results: Array<ReturnType<TypeGuard<any>>> | undefined;
    isFetching: boolean;
    element: (props: any) => JSX.Element;
}

const Cards = ({ results, isFetching, element: Element }: Props) => {
    return (
        <Box sx={{ width: '100%', display: 'grid', flex: 1 }}>
            <Box sx={{
                width: '100%',
                display: 'grid',
                gridTemplateColumns: { sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)', xl: 'repeat(5, 1fr)' },
                gap: 2,
                padding: 2,
            }}>
                {isFetching && Array.from(Array(ItemsPerPage).keys()).map((index: number) => (
                    <Element key={index} />
                ))} 
                {!isFetching && results?.map((obj: any) => (
                    <Element key={obj.id} info={obj} />
                ))}
            </Box>
        </Box>
    )
}

export default Cards