import { useState } from "react";
import { useNavigate } from "react-router";
import Message from "../../components/Message";
import App from "../../App";
import { addPatient } from "../../../src/API/patients";  

import { useToast } from "../../components/ToastProvider";
function AddPatient() {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("success");
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    gender: "",
    phone: "",
    bloodGroup: "",
    martialStatus: "",
    dob: "",
    email: "",
    address: "",
  }); 
  const { showToast } = useToast();

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // handle submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const form = event.target;

      if (form.checkValidity() === false) {
        setValidated(true);
        return;
      }

      const payload = new FormData();

      payload.append("name", formData.name);
      payload.append("fatherName", formData.fatherName);
      payload.append("gender", formData.gender);
      payload.append("phone", formData.phone);
      payload.append("bloodGroup", formData.bloodGroup);
      payload.append("martialStatus", formData.martialStatus);
      payload.append("dob", formData.dob);
      payload.append("email", formData.email);

      const response = await addPatient(payload);

      console.log("response", response);

      if (response?.data?.success === true) {
       showToast(response?.data?.message, "success");
       navigate("/patients/list");
      } else {
       showToast(response?.message || response?.data?.message,  "error");
      }
    } catch (error) {
      console.error(error);
      showToast("Something Went Wrong",  "error");
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center">
        <form
          noValidate
          className={`needs-validation card p-4 ${
            validated ? "was-validated" : ""
          }`}
          style={{ width: "1000px" }}
          onSubmit={handleSubmit}
          form-type="multipart/form-data"
        >
          <h3 className="mb-4">Add Patient</h3>
          {message && (
            <div className={`alert alert-${variant} h6`} role="alert">
              {message}
            </div>
          )}
          <div className="row mb-3">
            <div className="form-group col-lg-6">
              <label htmlFor="inputFname1">Name</label>
              <input
                type="text"
                className="form-control"
                id="inputFname1"
                name="name"
                value={formData.name}
                onChange={handleOnChange}
                required
              />
              <div className="invalid-feedback">Name is required</div>
            </div>
            <div className="form-group col-lg-6">
              <label htmlFor="inputFName4">Father Name</label>
              <input
                type="text"
                className="form-control"
                id="inputFName4"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleOnChange}
                required
              />
              <div className="invalid-feedback">Father Name is required</div>
            </div>
          </div>

          <div className="row mb-3">
            <div className="form-group col-lg-6">
              <label htmlFor="inputEmail4">Phone</label>
              <input
                type="number"
                className="form-control"
                id="inputPhone4"
                name="phone"
                value={formData.phone}
                onChange={handleOnChange}
                required
                min={11}
              />
              <div className="invalid-feedback">Phone is required</div>
            </div>
            <div className="form-group col-lg-6">
              <label htmlFor="inputPassword4">Gender</label>
              <select
                name="gender"
                className="form-control"
                value={formData.gender}
                onChange={handleOnChange}
                required
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <div className="invalid-feedback">Gender is required</div>
            </div>
          </div>

          <div className="row mb-3">
            <div className="form-group col-lg-6">
              <label htmlFor="inputState">Blood Group</label>
              <select
                id="inputState"
                name="bloodGroup"
                className="form-control"
                value={formData.bloodGroup}
                onChange={handleOnChange}
                required
              >
                <option value="" selected disabled></option>
                <option value={"A+"}> A+</option>
                <option value={"A-"}> A-</option>
                <option value={"B+"}> B+</option>
                <option value={"B-"}> B-</option>
                <option value={"O+"}> O+</option>
                <option value={"O-"}> O-</option>
                <option value={"AB+"}> AB+</option>
                <option value={"AB-"}> AB-</option>
              </select>
              <div className="invalid-feedback">
                Please select a Blood Group
              </div>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputCity">Date of Birth</label>
              <input
                type="date"
                className="form-control"
                id="inputCity"
                name="dob"
                value={formData.dob}
                onChange={handleOnChange}
                required
              />
              <div className="invalid-feedback">Date of Birth is required</div>
            </div>
          </div>

          <div className="row mb-3">
            <div className="form-group col-lg-6">
              <label htmlFor="inputPassword4">Martial Status</label>
              <select
                name="martialStatus"
                className="form-control"
                value={formData.martialStatus}
                onChange={handleOnChange}
                required
              >
                <option value="" disabled>
                  Select Status
                </option>
                <option value="married">Married</option>
                <option value="single">Single</option>
              </select>
              <div className="invalid-feedback">Martial Status is required</div>
            </div>

            <div className="form-group col-md-6">
              <label htmlFor="inputPic">Email</label>
              <input
                type="email"
                className="form-control"
                id="inputPic"
                name="email"
                onChange={handleOnChange}
                required
              />
              <div className="invalid-feedback">Email is required</div>
            </div>
          </div>
          <div className="row mb-3">
            <div className="form-group col-lg-12">
              <label htmlFor="inputPassword4">Address</label>
              <textarea
                name="address"
                className="form-control"
                value={formData.address}
                onChange={handleOnChange}
              ></textarea>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="btn float-end"
              style={{ background: "#212529", color: "#fff" }}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddPatient;
