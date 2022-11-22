import { Box } from '@mui/material';
import { TypeGuard } from '../../features';

interface Props {
    readonly data: ReturnType<TypeGuard<any>> | undefined;
    readonly isFetching: boolean;
    readonly rowsPerPage: number;
    readonly element: (props: any) => JSX.Element;
}

const Cards = ({ data, isFetching, rowsPerPage, element: Element }: Props) => {
    return (
        <Box sx={{ width: '100%', display: 'grid'}}>
            <Box sx={{
                width: '100%',
                display: 'grid',
                gridTemplateColumns: { sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)', xl: 'repeat(5, 1fr)' },
                gap: 2,
                padding: 2,
            }}>
                {isFetching && Array.from(Array(rowsPerPage).keys()).map((index: number) => (
                    <Element key={index} />
                ))} 
                {!isFetching && data && data.results.map((obj: any) => (
                    <Element key={obj.id} info={obj} />
                ))}
            </Box>
        </Box>
    )
}

export default Cards