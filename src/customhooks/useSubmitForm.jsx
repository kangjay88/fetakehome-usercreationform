import axios from 'axios';
import { useMutation } from 'react-query';

export function useSubmitForm ()  {
    function postForm(data) {
        const request = {
            name: `${data.firstname} ${data.lastname}`,
            email: data.email,
            password: data.password,
            occupation: data.occupation,
            state: data.state,
        }
        return axios.post(`https://frontend-take-home.fetchrewards.com/form`, request) 
    }
    const {mutate: submitForm, ...rest} = useMutation(postForm, {
        onSuccess: (data) => {console.log(data.data, data.status); return data},
        onError: (error) => {console.error(data.status); return error}
    })
    return{
        submitForm, ...rest
    }
}
    

