import { useState } from "react";
import { useNavigate } from "react-router";
import Message from "../../components/Message";
import { loginUser } from "../../API/auth";
import { useToast } from "../../components/ToastProvider";

function Login({ setToken }) {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [message, setMessage] = useState(false);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const {showToast} = useToast();  



  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      try {
        const response = await loginUser(formData);
        console.log("response", response);

        if (response?.success === false) {
          return setError(response?.message);
        }
        localStorage.setItem("token", response?.data?.token);
        localStorage.setItem("user", JSON.stringify(response?.data?.user));
        setToken(response?.data?.token);
        
        showToast("Login Successfully", "success");   

        if(response?.data.user?.role === "doctor"){
          navigate("/doctor/dashboard");
        }else{

          navigate("/dashboard");
        }

      } catch (error) {
        console.log("error", error);
        setMessage("Something went wrong");
      }
    }

    setValidated(true);
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <Message message={message} />

      <form
        noValidate
        className={`card p-4 shadow needs-validation ${validated ? "was-validated" : ""
          }`}
        style={{ width: "450px" }}
        onSubmit={handleSubmit}
      >
        <div className="mb-3 text-center">

          <h4>Welcome back</h4>
        </div>
        {
          error && (
            <div className="alert alert-danger  text-center text-danger">{error}</div>
          )
        }
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="email"
            value={formData.email}
            onChange={handleOnChange}
            required
          />
          <div className="invalid-feedback">Enter a valid email</div>
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="password"
            value={formData.password}
            onChange={handleOnChange}
            required

          />
          <div className="invalid-feedback">
            Password must be required
          </div>
        </div>

        <button type="submit" className="btn mb-4 btn-secondary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
