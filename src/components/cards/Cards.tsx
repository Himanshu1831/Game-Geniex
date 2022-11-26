import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';

import { TypeGuard } from '../../features';
import { ItemsPerPage } from '../pagination';
import GameModal from '../GameModal';

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
                {!isFetching && results?.map((obj: any) => (
                    <Element key={obj.id} info={obj} handleSelect={handleSelect} images={obj?.short_screenshots} />
                ))}
            </Box>
            {selected.id > 0 && (<GameModal open={modalOpen} handleClose={handleModalToggle} id={selected.id} images={selected.images} />)}
        </Box>
    )
}

export default Cards