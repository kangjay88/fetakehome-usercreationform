# React Creation Form by Jay Kang :dog:
Hello! Welcome to a user creation form that was built using React. This form allows users to sign up with their name, email, password, occupation, and state. In this respository you will see the use of basic form validation, sass CSS, and custom hooks for form submission and data fetching.

## Getting Started
**Prerequisites**:
* This project was built using Vite + React + JavaScript:
`$npm create vite@latest`
* Follow the prompts to specify your project name and choose React + JavaScript

**Installation**:
1. Clone the repo `git clone https://github.com/kangjay88/fetakehome-usercreationform.git `
2. Run `npm install` to install the necessary dependencies (listed in Dependencies)
3. Run `npm run dev` to start your development server and view form in selected browser

**Dependencies: Make sure these are installed!**
`npm install <dependency>`
* react
* react-query
* react-select
* validator
* react-axios
* sass

## Usage
**App.jsx**:
The `App` component is designated as our highest component, wrapping the `UserForm` component in a `Query Client Provider` from the `react-query` library.
* Gives access to `react-query` everywhere in our application
* Useful for `useQuery` and `useMutation`

**UserForm.jsx**:
The `UserForm` component is what is used for a user to sign up with their information. Here we use a number of react hooks and libraries, as well as some custom hooks that are explained later on. 
```
const [userData, setUserData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        occupation: "",
        state: "",
      });
const [errors, setErrors] = useState({});
```
* There are a number of state variables that are used within `UserForm`, which use the react hook `{ useState }`    
* This takes an initial state value and a function that updates the state
* Add more fields if more user data is necessary in the future, or use this hook for components you want to respond to changes in data

```
const handleChange = (event) => {
        const { name, value } = event.target;
        setUserData((prevData) => ({ ...prevData, [name]:value }));
    };

    const handleOccupationChange = (option) => {
        setUserData((prevData) => ({ ...prevData, occupation: option.value }))
    }

    const handleStateChange = (option) => {
        setUserData((prevData) => ({ ...prevData, state: option.value }))
    }
```
* `handleChange` updates the `userData` state when the user enters information into the form, using the `name` and `value` properties to update the corresponding field
* `handleOccupationChange` and `handleStateChange` updates the `userData` state when the user selects an occupation or state from the dropdown menu
* Customize the form by modifying these functions to fit your needs

```
const validateData = () => {
        let errors = {};

        if (!validator.isEmail(email)) {
            errors.email = "A valid email is required";
        }
    };
```
* This function validates form data and is called when the form in submitted
* Checks `userData` state for any errors and returns an object if errors found - updates the `errors` state
* `validator` library provides a number of string validations, such as email address, URL, etc.
* Customize the form's error messages and how it checks fields to your liking

```
const handleSubmit = (event) => {
        event.preventDefault();
        const errors = validateData();
        if (Object.keys(errors).length) {
            setErrors(errors);
            //there are errors, do not continue saving
            return;
        };
        setErrors({});
        //console.log(userData);
        submitForm(userData);
    };
```
* This is called when the user submits the form (HTML `<button onClick = {submitForm}>` )
* `event.preventDefault();` prevents the default form submission
* The if statement returns the number of properties in the errors object - if this number is > 0, there is an error - updates errors state
* No errors: `errors` state will be reset to an empty object, calls submitForm function that was imported from `useSubmitForm.jsx`
* Leaves form open to resubmission, don't have to reset everything

## Usage of Custom Hooks
**useSubmitForm**:
The `useSubmitForm` is a custom hook made using `{ useMutation }` from `react-query` library. This handles form submission by sending a POST request to an API with form data as the request body. 
```
export function useSubmitForm ()  {
    function postForm(data) {
        const request = {
            name: `${data.firstname} ${data.lastname}`,
        }
        return axios.post(`https://frontend-take-home.fetchrewards.com/form`, request) 
    }
```
* The `postForm` function sends a POST request to the specified API endpoint
* `request` = an object that contains the form data that is passed to the `useSubmitForm` function when it is called
* Customize to your liking what is in the request body and API used

```
const {mutate: submitForm, ...rest} = useMutation(postForm, {
        onSuccess: (data) => {console.log(data.data, data.status); return data}, 
        onError: (error) => {console.error(data.status); return error}
    })
```
* `useMutation(postForm, {})` returns an object with the `mutate: submitForm` function that can be used to trigger the API request
* This component shows how to handle an `onSucess` or `onError` response

```
    return{
        submitForm, ...rest
    }
```
* returns an object from the submitForm function 
* `...rest` allows desired/additional properties to be included in the returned object along with submitForm

**useGetFetchAPI**:
This is another custom hook made using `{ useQuery }` from `react-query` library. This handles a GET request to an API and retrieve data from the response.
```
export function useGetFetchAPI () {
    return useQuery(["occupations", "states"], async () => {
        const res = await axios.get("https://frontend-take-home.fetchrewards.com/form");
        return res.data;
    });
}
```
* `UserForm` imports this hook to return occupation and state (an array of keys) data from the response
* Customize to your liking what data you would like to retrieve from an API using this hook
* Also can return booleans such as `isLoading` `isError` and an object `error`, if needed

things to improve upon:
react-hook-forms has a library that allows user validation code to be much simpler and compact, (...validator)
right now, the logic and html are sort of all in one place -> this could be handled differently using usecontext hook

## Custom Hooks
These custom hooks are used in the `UserForm` component:
```
const { submitForm } = useSubmitForm();
const { data, isLoading } = useGetFetchAPI();

if (isLoading) {
        return <p>loading data...</p>
};
```
* These are used in similar fashion to the `error` useState hook
* In particular, `useGetFetchAPI()` is called upon later when rendering, using a map function to return the data's value and label

## How could this code be better? 
I believe that this code could be further optimized in the UserForm component. Right now, a lot of the coding "logic" (functions, hooks) and HTML code are all mixed together into one component. Moreover, we have child components that are passed down as props. As the child component becomes deeply nested, this could become messy in the future. `useContext` allows use of an API to provide state of a parent component to its children no matter how deeply nested it becomes. This allows the current "state" to become consistent throughout the entire application. This was not done due to the assignment asking for one user signup form. 

Moreover, user validation could have been coded much simpler and compact. There is a library in `react-hook-form` that handles user validation with `useForm` and `(...register)`. It was not done because I wanted to show a more basic understanding of JavaScript and React. 

## Contact
Jay Kang - (kang.jay.87@gmail.com)
Project Link: (https://github.com/kangjay88/fetakehome-usercreationform.git)

## Acknowledgements
* CSS/SASS was inspired by this amazing code: (https://codepen.io/dasshounak/pen/QWKKYdj?fbclid=IwAR3PSqqSyBmrSbP3fQ5zQClV3bD5Zd-6jVSZLI05in2tdVOyQ8_ydO_h01c)
* README.md file inspired by: (https://github.com/othneildrew/Best-README-Template)
* @WebDevSimplified: (https://www.youtube.com/@WebDevSimplified)
