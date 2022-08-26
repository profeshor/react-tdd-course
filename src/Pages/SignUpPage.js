
import {Component} from "react"

/**
 * Sign up page component
 * @author Pablo Pérez Martínez
 */
class SignUpPage extends Component {
    state = {
        username: "",
        email: "",
        disabled: true,
        password: "",
        passwordConfirm: ""
    }

    /**
     * Updates all state fields instead of having all functions commented below
     * @param {*} event 
     */
    onChangeInput = (event) => {
        const {id, value} = event.target;
        console.log({id, value});
        this.setState({
            [id]: value,
            disabled: this.state.passwordConfirm === this.state.password
        })
    }

    /*
    onChangeUsername = (event) => {
        const currentValue = event.target.value;
        this.setState({
            username: currentValue,
        });
    };

    onChangeEmail = (event) => {
        const currentValue = event.target.value;
        this.setState({
            email: currentValue,
        });
    };
    
    onChangePassword = (event) => {
        const currentValue = event.target.value;
        this.setState({
            password: currentValue,
            disabled: currentValue !== this.state.passwordConfirm
        });
    };

    onChangePasswordConfirm = (event) => {
        const currentValue = event.target.value;
        this.setState({
            passwordConfirm: currentValue,
            disabled: currentValue !== this.state.password
        });
    };
    */


    submit = (event) => {
        event.preventDefault();
        const {username, password, email} = this.state;
        const body = {username, password, email}
        //axios.post("api/1.0/users", body)
        fetch("api/1.0/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify(body)
        });
    }

    /**
     * Renders html elements of class
     * @returns html element
     */
    render() {
        //let disabled = true;
        /* setTimeout(()=>{
            console.log("updating disabled");
            this.setState({disabled: false});
        }, 1000); */
        return(
            <div>
                <form>
                    <h1>Sign Up</h1>
                    <label htmlFor="username">Username</label>
                    <input id="username" onChange={this.onChangeInput}/>
                    <label htmlFor="email">E-mail</label>
                    <input id="email" onChange={this.onChangeInput}/>
                    <label htmlFor="password">Password</label>
                    <input id="password" type={"password"} onChange={this.onChangeInput}/>
                    <label htmlFor="passwordConfirm">Password Confirm</label>
                    <input id="passwordConfirm" type={"password"} onChange={this.onChangeInput}/>
                    <button disabled={this.state.disabled} onClick={this.submit}>Sign Up</button>
                </form>
            </div>
        )
    }
}

export default SignUpPage