import axios from 'axios';
import { useQuery } from 'react-query';

export function useGetFetchAPI () {
    return useQuery(["occupations", "states"], async () => {
        const res = await axios.get("https://frontend-take-home.fetchrewards.com/form");
        return res.data;
    });
}