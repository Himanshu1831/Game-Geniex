export interface PaginationProps {
    page: number, 
    setPage: React.Dispatch<React.SetStateAction<number>>,
    totalCount?: number | undefined,
}

export const ItemsPerPage = 10;