import { useEffect, useState } from "react"
import validator from 'validator';
import { api } from "./api/api";
import { User } from "./api/configuration/models/users";
export const SignUp = (props: any) => {

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [role, setRole] = useState<string>();
  const [errorEmail, setErrorEmail] = useState<string>("");
  const [errorAge, setErrorAge] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>('')
  const [user, setUser] = useState<User | undefined>(undefined)

  const handleFirstNameChange = (event: any) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event: any) => {
    setLastName(event.target.value);
  };

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
  };

  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
    const errorMsg = !validator.isEmail(event.target.value) ? "Please enter a valid email address" : "";
    setErrorEmail(errorMsg);
  };

  const handleGenderChange = (event: any) => {
    setGender(event.target.value);
  };

  const handleRoleChange = (event: any) => {
    setRole(event.target.value);
  };

  const handleAgeChange = (event: any) => {
    setAge(event.target.value);
    const errorMsg = !validator.isNumeric(event.target.value) ? "Age must be a number" : "";
    setErrorAge(errorMsg)
  };

  const isFormValid = () => {
    return (
      !validator.isEmpty(firstName)
      && !validator.isEmpty(lastName) &&
      !validator.isEmpty(password) &&
      validator.isEmail(email) &&
      !validator.isEmpty(gender)
      && validator.isNumeric(age));
  };


  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const userToCreate: User = {
      role_id: Number(role),
      first_name: firstName,
      last_name: lastName,
      email,
      password,
      age,
      gender
    }
    try {
      console.log(userToCreate);
      const user = await api.createUser(userToCreate);
      setUser(user);
      setErrorMsg("SUCESS!!")
      console.log(user);
    } catch (err) {
      setErrorMsg("Sorry, something went wrong! please try later :)")
    }
  };

  return (
    <div id='team' className='text-center'>
      <div className='container'>
        <div className='col-md-8 col-md-offset-2 section-title'>
          <h2>Sign Up</h2>
          <p>
            For using our platform, you should first sign up
          </p>
          <h5 style={{ color: "red" }}>{errorMsg}</h5>
          <div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>First name</label>
                <input type="first-name" className="form-control" placeholder="First name" value={firstName} onChange={handleFirstNameChange} />
              </div>

              <div className="form-group">
                <label>Last name</label>
                <input type="last-name" className="form-control" placeholder="Last name" value={lastName} onChange={handleLastNameChange} />
              </div>

              <div className="form-group">
                <label>Email address</label>
                <input type="email" className="form-control" placeholder="Enter email" value={email} onChange={handleEmailChange} />
                <div className="error-msg">{errorEmail}</div>
              </div>

              <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" placeholder="Enter password" value={password} onChange={handlePasswordChange} />
              </div>
              <div className="form-group">
                <label>Gender</label>
                <select value={gender} onChange={handleGenderChange} className="form-control">
                  <option value="" disabled selected>Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="form-group">
                <label>Role</label>
                <select value={role} onChange={handleRoleChange} className="form-control">
                  <option value="" disabled selected>Select Role</option>
                  <option value="1">User</option>
                  <option value="2">Professional</option>
                </select>
              </div>
              <div className="form-group">
                <label>Age</label>
                <input type="age" className="form-control" placeholder="Enter age" value={age} onChange={handleAgeChange} />
                <div className="error-msg">{errorAge}</div>
              </div>
              <button type="submit" disabled={!isFormValid()} className="btn btn-primary btn-block">Sign Up</button>
              <br></br>
              <p>
                Already registered <a href="/signin">sign in?</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}