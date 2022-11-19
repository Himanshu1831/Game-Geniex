import { useRef, useLayoutEffect, useState, useCallback } from 'react'
import { Container } from '@mui/material'

import { useGetGamesListQuery } from './redux/api/gameAPI'

import GameCards from './components/cards/GameCards'
import GameTable from './components/table/GameTable'

function App() {
    const [pageInfo, setPageInfo] = useState({
        page: 0,
        pageCount: 20,
    })
    const lastElement = useRef<HTMLDivElement>(null)
	const { data, isFetching } = useGetGamesListQuery({page: pageInfo.page + 1, pageCount: pageInfo.pageCount})

    const handleIntersection = useCallback((entries) => {
        if (entries[0].isIntersecting) {
            setPageInfo((prev) => {
                return { 
                    ...prev,
                    page: prev.page + 1,
                }
            });
        }
    }, []);

    useLayoutEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0,
        }
        const observer = new IntersectionObserver(handleIntersection, options)
        if (lastElement.current) {
            observer.observe(lastElement.current)
        }
    }, [])

    return (
        <Container sx={{
            width: '100vw',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
        }} maxWidth={false}>
            <GameCards data={data} isFetching={isFetching} pageInfo={pageInfo}/>
            <div ref={lastElement}></div>
        </Container>
    )
}

export default App
