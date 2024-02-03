import { useState } from "react";

function SignUpForm({ setToken }) {

    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const [error, setError ] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();

        if(password.length < 7) {
            setError("Password must be 7 characters")
        }

        try {
            //API_URL = "https://fsa-jwt-practice.herokuapp.com/signup";
            const response = await fetch("https://fsa-jwt-practice.herokuapp.com/signup", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })
                //credentials: 'include',
            });
            const result = await response.json();
            console.log(result);
            setToken(result.token);
        } catch (error) {
            console.error(setError);
        }

        setUsername("");
        setPassword("");
    }

    return(
    <>
        <h2>Sign up Form</h2>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
        <label>
            Username: {""} <input value={username} onChange={(e) => {setUsername(e.target.value);}} />
        </label>
        <label>
            Password: {""} <input type="password" value={password} onChange={(e) => {setPassword(e.target.value);}}/>
        </label>
        <button type="submit">Submit</button>
    </form>
    </>
    );
}

export default SignUpForm;