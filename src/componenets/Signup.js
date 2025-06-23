import React, { useState,useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import alertContext from '../contex1/notes/alertContext';

const Signup = () => {
  let Acontext = useContext(alertContext)
  let { showAlert } = Acontext;
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
   
    e.preventDefault();
     if (signup.password !== signup.cpassword) {
    showAlert("warning", "Passwords do not match");
    return; // Stop form submission
  }
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "name": signup.name,
        "email": signup.email,
        "password": signup.password
      })
    });

    const data = await response.json();
    console.log(data);
    if (data.success) {
      localStorage.setItem('token', data.authtoken);
      navigate('/');
      showAlert("success" , "user created");
    }
    else {
      if(data.error){
        showAlert("warning",`${data.error}`);
      }
      else{
        showAlert("warning",`${data.errors[0].msg}`)
      }
    
  }
  }

  const [signup, setsignup] = useState({ name: "", email: "", password: "", cpassword: "" })

  const onChange = (e) => {
    setsignup({ ...signup, [e.target.name]: e.target.value });
  }
  return (
    <div className='container my-3'>
      <form onSubmit={handleSubmit}>
        <h2> Create an account on Rajwinder's InoteBook Cloud</h2>
        <div className="form-group">
          <label htmlFor="name">User Name</label>
          <input type="text" className="form-control" id="name" name="name" onChange={onChange} placeholder="user name" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" placeholder="Enter email" />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" id="password" onChange={onChange} name="password" placeholder="Password" minLength={5} required />
        </div>
        <div className="form-group">
          <label htmlFor="cpassword">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" onChange={onChange} name="cpassword" placeholder="confirm Password" minLength={5} required />
        </div>
        <button type="submit" className="btn btn-primary my-3">Submit</button>
      </form>
    </div>
  )
}

export default Signup
