import { useState } from "react"; 
import validator from "validator";
import Select from "react-select";
import { useSubmitForm } from "../customhooks/useSubmitForm";
import { useGetFetchAPI } from "../customhooks/useGetFetchAPI";
import './UserForm.scss';

const UserForm = () => {
    const [userData, setUserData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        occupation: "",
        state: "",
      });
    const [errors, setErrors] = useState({});
    const { submitForm } = useSubmitForm();

    const { data, isLoading } = useGetFetchAPI();

    if (isLoading) {
        return <p>loading data...</p>
    };

    const { firstname, lastname, email, password, confirmPassword, occupation, state } = userData;

    const validateData = () => {
        let errors = {};

        if (!firstname) {
            errors.firstname = "First Name is required";
        }
        if (!lastname) {
            errors.lastname = "Last Name is required";
        }
        if (!validator.isEmail(email)) {
            errors.email = "A valid email is required";
        }
        if (!password) {
            errors.password = "A password is required";
        }
        if (password !== confirmPassword) {
            errors.confirmPassword = "Passwords do not match";
        }
        if (!occupation) {
            errors.occupation = "Please select an occupation";
        }
        if (!state) {
            errors.state = "Please select your residing state";
        }

        return errors;
    };

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
    

    return (
        <div className="container">
            <h1>Fetch Sign Up Form</h1>
            <div>
                <div style = {{ color: "red" }}>{ errors.firstname }</div>
                <input name = "firstname" placeholder = "First Name" value = { firstname } onChange = {handleChange} />
            </div>

            <div>
                <div style = {{ color: "red" }}>{ errors.lastname }</div>
                <input name = "lastname" placeholder = "Last Name" value = { lastname } onChange = {handleChange}/>
            </div>

            <div>
                <div style = {{ color: "red" }}>{ errors.email }</div>
                <input name = "email" placeholder = "Email Address" value = { email } onChange = {handleChange}/>
            </div>

            <div>
                <div style = {{ color: "red" }}>{ errors.password }</div>
                <input type = "password" placeholder = "Password" name = "password" value = {password} 
                onChange={(event) => setUserData({ ...userData, password: event.target.value })} />
            </div>

            <div>
                <div style = {{ color: "red" }}>{ errors.confirmPassword }</div>
                <input type ="password" placeholder = "Confirm Password" name = "confirmPassword" value = {confirmPassword} 
                onChange={(event) => setUserData({ ...userData, confirmPassword: event.target.value })} />
            </div>

            <div>
                <div style = {{ color: "red" }}>{ errors.occupation }</div>
                <Select
                    name = "occupation"
                    className = "select"
                    classNamePrefix = "select-inner"
                    placeholder = "Choose your Occupation"
                    options = { data.occupations.map((occupation) => ({ value: occupation, label: occupation }))}
                    onChange = {handleOccupationChange}
                    unstyled = "true"
                />
            </div>

            <div>
                <div style = {{ color: "red" }}>{ errors.state }</div>
                <Select
                    name ="state"
                    className = "select"
                    classNamePrefix = "select-inner"
                    placeholder = "State of Residence"
                    options = { data.states.map((states) => ({ value: states.name, label: states.abbreviation }))}
                    onChange = {handleStateChange}
                    unstyled = "true"
                />
            </div>

            <div style = {{ marginTop: "12px" }}>
                <button onClick = {handleSubmit}>Sign Up</button>
            </div>

            <div className = "drops">
                <div className = "drop drop-1"></div>
                <div className = "drop drop-2"></div>
                <div className = "drop drop-3"></div>
                <div className = "drop drop-4"></div>
                <div className = "drop drop-5"></div>
            </div>
        </div>
    );
};

export default UserForm;