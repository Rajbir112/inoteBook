import React ,{ useState,useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import alertContext from '../contex1/notes/alertContext';
const Login = () => {
    let Acontext  = useContext(alertContext)
    let {showAlert} = Acontext;
   const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
            "email": login.email,
            "password": login.password
            })
        });
        
        const data = await response.json();
        console.log(data);
        if(data.success){
            localStorage.setItem('token', data.authtoken);
            showAlert("success" , "user logined")
            navigate('/');  
        }
        else{
            showAlert("warning" , "login using correct curdential");
           
        }
    }

    const [login,setlogin] = useState({email: "" , password: ""})

    const onChange = (e) => {
    setlogin({ ...login, [e.target.name]: e.target.value });
  }
    return (
        <div className="container my-3">
            <form>
                <h2> Login an account on Rajwinder's InoteBook Cloud</h2>
                <div className="form-group my-3">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" name="password" id="password" onChange={onChange}/>
                </div>
                <button type="submit" className="btn btn-primary my-3" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default Login
