import React, {Component, useState, useEffect, useRef} from "react";


export default function RegistrationComponent () {
    const [email, setEmail] = useState(false);
    const [password, setPassword] = useState(false);
    const [data, setData] = useState("No");




    useEffect(() => {
        let bodyFormData = new FormData();
        bodyFormData.append('email', email);
        bodyFormData.append('password', password);
        setData(bodyFormData)
    }, [email, password])

    const sendForm = () => {
        if (email && password) {
            console.log(data)

            // articlesService.createArticle(data)

        }

    }

    return(
        <div>
            <form >
                <label>Email</label><br/>
                <input className="form-control" type="text"  onChange={(event) => setEmail(event.target.value)}/><br/><br/>
                <label>Password</label><br/>
                <input className="form-control" type="text"  onChange={(event) => setPassword(event.target.value)}/><br/><br/>


                <button onClick={sendForm}>Send</button>
            </form>
        </div>
    )
}
