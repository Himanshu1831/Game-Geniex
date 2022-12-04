import { useState } from "react"
import { useQuery } from "react-query"
import { gameAPI } from "../../api/gameAPI";

const useGameElements = (endpoint: string) => {
    const [page, setPage] = useState(1)

    const queryInfo = useQuery(
        [{
            endpoint,
            page,
        }],
        () => gameAPI.getResources({
            endpoint,
            page,
        }),
        {
            keepPreviousData: true,
        }
    )
    
    return {
        ...queryInfo,
        page,
        setPage,
    }
}

export default useGameElements