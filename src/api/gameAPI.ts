import { TypeGuard } from "../utils/typeguards";
import { GamesListType, GameType, OtherTypeList } from "../utils/typeguards/typeGuards";
import { Args, detailsQuery, queryMaker } from ".";

const baseUrl = 'https://api.rawg.io/api/';

function translateStatusToErrorMessage(status: number) {
    switch (status) {
        case 401:
            return 'Please login again.';
        case 403:
            return 'You do not have permission to view the game(s).';
        default:
            return 'There was an error retrieving the game(s). Please try again.';
    }
}

function checkStatus(response: any) {
    if (response.ok) {
        return response;
    } else {
        const httpErrorInfo = {
            status: response.status,
            statusText: response.statusText,
            url: response.url,
        };
        console.log(`log server http error: ${JSON.stringify(httpErrorInfo)}`);

        let errorMessage = translateStatusToErrorMessage(httpErrorInfo.status);
        throw new Error(errorMessage);
    }
}

function parseJSON(response: Response) {
    return response.json();
}

// eslint-disable-next-line
function delay(ms: number) {
    return function (x: any): Promise<any> {
        return new Promise((resolve) => setTimeout(() => resolve(x), ms));
    };
}

function getTypedResource<T>(data: any, typeguard: TypeGuard<T>): T {
    return typeguard(data);
}

const gameAPI = {
    getResources(args: Args) {
        let typeguard: TypeGuard<any>;

        if (args.endpoint === 'games') typeguard = GamesListType;
        else typeguard = OtherTypeList;

        return fetch(`${baseUrl}${queryMaker(args)}`)
            .then(delay(100))
            .then(checkStatus)
            .then(parseJSON)
            .then((data) => getTypedResource(data, typeguard))
            .catch((error: TypeError) => {
                console.log('log client error ' + error);
                throw new Error(
                    'There was an error retrieving the projects. Please try again.'
                );
            });
    },
    find(id: number) {
        return fetch(`${baseUrl}${detailsQuery(id)}`)
            .then(delay(100))
            .then(checkStatus)
            .then(parseJSON)
            .then((data) => getTypedResource(data, GameType));
    },
};

export { gameAPI };