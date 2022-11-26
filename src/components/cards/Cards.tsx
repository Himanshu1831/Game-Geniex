import { useState, useCallback, ReactNode } from 'react';

import Box from '@mui/material/Box';
import Grow from '@mui/material/Grow'

import { TypeGuard } from '../../features';
import { ItemsPerPage } from '../pagination';
import GameModal from '../GameModal';

const GrowElement = ({ children }: { children: ReactNode }) => (
    <Grow
        in={true}
        timeout={1000}
        style={{ transformOrigin: '0 0 0' }}>
        <div>
            {children}
        </div>
    </Grow>
)

interface Props {
    results: Array<ReturnType<TypeGuard<any>>> | undefined;
    isFetching: boolean;
    element: (props: any) => JSX.Element;
}

const Cards = ({ results, isFetching, element: Element }: Props) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selected, setSelected] = useState<{
        id: number,
        images: Array<{ id: number, image: string }>
    }>({
        id: -1,
        images: [],
    });

    const handleModalToggle = useCallback(() => {
        setModalOpen(prev => !prev);
    }, []);

    const handleSelect = useCallback((id: number | undefined, images: Array<{ id: number, image: string }>) => {
        if (id) {
            setSelected({
                id,
                images,
            });
            handleModalToggle();
        }
    }, []);

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
                {!isFetching && results?.map((obj: any, index: number ) => (
                    <GrowElement
                    key={obj.id}>
                        <Element 
                            info={obj} 
                            handleSelect={handleSelect} 
                            images={obj?.short_screenshots} />
                    </GrowElement>
                ))}
            </Box>
            {selected.id > 0 && (<GameModal open={modalOpen} handleClose={handleModalToggle} id={selected.id} images={selected.images} />)}
        </Box>
    )
}

export default Cards