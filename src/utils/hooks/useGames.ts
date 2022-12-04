import { useState } from "react"
import { useQuery } from "react-query"
import { gameAPI } from "../../api/gameAPI";

export interface Filter {
    id: number;
    name: string;
}

export interface Filters {
    genres: Filter[];
    tags: Filter[];
    developers: Filter[];
    creators: Filter[];
    publishers: Filter[];
    platforms: Filter[];
    stores: Filter[];
}

const makeQuery = (
    endpoint: string, 
    page: number, 
    search: string, 
    filters: Filters | undefined
) => {
    const query = {
        page,
        endpoint,
        search,
    }

    if(filters) {
        Object.keys(filters).map((key: string) => {
            if ((filters[key] as string[]).length > 0) {
                query[key] = (filters[key] as Filter[]).map(filter => filter.id).join(',')
            }
        })
    }

    return query;
}

const useGames = () => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState<Filters>({
        genres: [],
        tags: [],
        developers: [],
        creators: [],
        publishers: [],
        platforms: [],
        stores: [],
    });

    const args = makeQuery('games', page, search, filters);

    const queryInfo = useQuery(
        ['games', args],
        () => gameAPI.getResources(args),
        {
            keepPreviousData: true,
        }
    )
    
    return {
        ...queryInfo,
        page,
        setPage,
        search,
        setSearch,
        filters,
        setFilters
    }
}

export default useGames