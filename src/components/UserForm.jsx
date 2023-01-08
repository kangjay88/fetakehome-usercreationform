import { useState } from "react"; 
import validator from "validator";
import Select from "react-select";
import { useSubmitForm } from "../customhooks/useSubmitForm";
import { useGetFetchAPI } from "../customhooks/useGetFetchAPI"

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
    const {submitForm} = useSubmitForm();

    const { data, isLoading } = useGetFetchAPI();

    if (isLoading) {
        return <p>loading data...</p>
    }

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
        console.log(userData, option)
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
        console.log(userData);
        submitForm(userData);
    };
    

    return (
        <div>
            <div>
                <p>First Name</p>
                <input name="firstname" value={firstname} onChange={handleChange} />
                <div style ={{ color: "red" }}>{errors.firstname}</div>
            </div>

            <div>
                <p>Last Name</p>
                <input name="lastname" value={lastname} onChange={handleChange}/>
                <div style = {{ color: "red" }}>{errors.lastname}</div>
            </div>

            <div>
                <p>Email</p>
                <input name="email" value={email} onChange={handleChange}/>
                <div style ={{ color: "red" }}>{errors.email}</div>
            </div>

            <div>
                <p>Password</p>
                <input type="password" name="password" value={password} 
                onChange={(event) => setUserData({ ...userData, password: event.target.value })} />
                <div style ={{ color: "red" }}>{errors.password}</div>
            </div>

            <div>
                <p>Confirm Password</p>
                <input type="password" name = "confirmPassword" value={confirmPassword} 
                onChange={(event) => setUserData({ ...userData, confirmPassword: event.target.value })} />
                <div style = {{ color: "red" }}>{errors.confirmPassword}</div>
            </div>

            <div>
                <p>Occupation</p>
                <Select
                    name="occupation"
                    options = {data.occupations.map((occupation) => ({ value: occupation, label: occupation }))}
                    onChange={handleOccupationChange}
                />
                <div style ={{ color: "red" }}>{errors.occupation}</div>
            </div>

            <div>
                <p>State of Residence</p>
                <Select
                    name="state"
                    options = {data.states.map((states) => ({ value: states.name, label: states.abbreviation }))}
                    onChange={handleStateChange}
                />
                <div style ={{ color: "red" }}>{errors.state}</div>
            </div>

            <div style={{ marginTop: "12px" }}>
                <button onClick={handleSubmit}>Sign Up</button>
            </div>
        </div>
    );
};

export default UserForm;