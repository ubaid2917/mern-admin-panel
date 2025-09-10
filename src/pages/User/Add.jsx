import { useState } from "react";
import { useNavigate } from "react-router";
import Message from "../../components/Message";
import App from "../../App";
import { addUser } from "../../../src/API/user";
function AddUser() {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [message, setMessage] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    city: "",
    state: "",
    zip: "",
  });

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    console.log("event", value);
    console.log("event name", name);
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const form = event.target;

      if (form.checkValidity() === false) {
      } else {  
         const response = await addUser(formData); 

         console.log('response', response)

        console.log("Form submitted successfully!", formData);
        setMessage("Record Created Successfully");
        navigate("/users/list");
      }

      setValidated(true);
    } catch (error) {
        alert('Something went wrong')
    }
  };

  return (
    <>
      <Message message={message} />
      <div className="d-flex justify-content-center">
        <form
          noValidate
          className={`needs-validation card p-4 ${
            validated ? "was-validated" : ""
          }`}
          style={{ width: "1000px" }}
          onSubmit={handleSubmit}
        >
          <h3 className="mb-4">Add User</h3>

          <div className="row mb-3">
            <div className="form-group col-lg-6">
              <label htmlFor="inputFname1">First Name</label>
              <input
                type="text"
                className="form-control"
                id="inputFname1"
                name="firstName"
                value={formData.firstName}
                onChange={handleOnChange}
                required
              />
              <div className="invalid-feedback">First name is required</div>
            </div>
            <div className="form-group col-lg-6">
              <label htmlFor="inputLname1">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="inputLname1"
                name="lastName"
                value={formData.lastName}
                onChange={handleOnChange}
                required
              />
              <div className="invalid-feedback">Last name is required</div>
            </div>
          </div>

          <div className="row mb-3">
            <div className="form-group col-lg-6">
              <label htmlFor="inputEmail4">Email</label>
              <input
                type="email"
                className="form-control"
                id="inputEmail4"
                name="email"
                value={formData.email}
                onChange={handleOnChange}
                required
              />
              <div className="invalid-feedback">Enter a valid email</div>
            </div>
            <div className="form-group col-lg-6">
              <label htmlFor="inputPassword4">Password</label>
              <input
                type="password"
                className="form-control"
                id="inputPassword4"
                name="password"
                value={formData.password}
                onChange={handleOnChange}
                required
                minLength={3}
              />
              <div className="invalid-feedback">
                Password must be at least 3 characters
              </div>
            </div>
          </div>

          <div className="row mb-3">
            <div className="form-group col-md-6">
              <label htmlFor="inputCity">City</label>
              <input
                type="text"
                className="form-control"
                id="inputCity"
                name="city"
                value={formData.city}
                onChange={handleOnChange}
                required
              />
              <div className="invalid-feedback">City is required</div>
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="inputState">State</label>
              <select
                id="inputState"
                name="state"
                className="form-control"
                value={formData.state}
                onChange={handleOnChange}
                required
              >
                <option value="">Choose...</option>
                <option>Punjab</option>
                <option>Sindh</option>
                <option>KPK</option>
                <option>Balochistan</option>
              </select>
              <div className="invalid-feedback">Please select a state</div>
            </div>
            <div className="form-group col-md-2">
              <label htmlFor="inputZip">Zip</label>
              <input
                type="text"
                className="form-control"
                id="inputZip"
                name="zip"
                value={formData.zip}
                onChange={handleOnChange}
                required
              />
              <div className="invalid-feedback">Zip is required</div>
            </div>
          </div>

          <div>
            <button type="submit" className="btn btn-secondary ">
              Sign in
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddUser;
