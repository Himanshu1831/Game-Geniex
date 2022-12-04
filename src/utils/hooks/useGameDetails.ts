import { useQuery } from "react-query";
import { gameAPI } from "../../api/gameAPI";

const useGameDetails = (id: number) => {
    return useQuery(
        [id],
        () => gameAPI.find(id),
        {
            keepPreviousData: true,
        }
    )
}

export default useGameDetails