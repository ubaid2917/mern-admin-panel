import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Message from "../../components/Message";
import App from "../../App";
import { addRecord } from "../../../src/API/doctor";
import { getPatientList } from "../../../src/API/patients";
import { useToast } from "../../components/ToastProvider";
import Select from "react-select";
function AddAppointment() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [validated, setValidated] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("success");
  const [patient, setPatient] = useState([]);
  const [search, setSearch] = useState('');
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    isLiveConsult: "",
    qualification: "",
    dob: "",
    appointmentCharges: "",
    departmentId: "",
    password: "",
    phone: "",
    dailyPatient: "",
  });

  // get department    
  const getPatient = async (searchValue = '') => {
    try {
      const response = await getPatientList(searchValue, 10, 1);  
      if (response.status !== 200) return;
      const options = response?.data?.data?.map((item) => ({
        value: item.id,
        label: item.name,
      }));  

      console.log('option', options)
      setPatient(options);

    } catch (error) {
      showToast(error, "error");
    }
  };

  // search
  useEffect(() => {
    getPatient();
  }, []);

  
  console.log("patient", patient)

const handleSearch = (inputValue) => {
    if (inputValue.length > 0) {
      getPatient(inputValue); // search patients
    }
  };

  // handle form change
  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // ✅ handle dropdown change
  const handlePatientChange = (selectedOption) => {
    setFormData({ ...formData, departmentId: selectedOption?.value || "" });
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
      payload.append("email", formData.email);
      payload.append("phone", formData.phone);
      payload.append("isLiveConsult", formData.isLiveConsult);
      payload.append("dob", formData.dob);
      payload.append("gender", formData.gender);
      payload.append("appointmentCharges", formData.appointmentCharges);
      payload.append("departmentId", formData.departmentId);
      payload.append("password", formData.password);
      payload.append("dailyPatient", formData.dailyPatient);


      const response = await addRecord(payload);

      if (response?.data?.success === true) {
        showToast(response?.data?.message, "success");

        navigate("/doctors/list");
      } else {
        showToast(response?.message || response?.data?.message, "error");
      }
    } catch (error) {
      showToast(error.message, "error");
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center">
        <form
          noValidate
          className={`needs-validation card p-4 ${validated ? "was-validated" : ""
            }`}
          style={{ width: "1000px" }}
          onSubmit={handleSubmit}
        >
          <h3 className="mb-4">Add Appointment</h3>
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
              <label htmlFor="inputFName4">email</label>
              <input
                type="email"
                className="form-control"
                id="inputFName4"
                name="email"
                value={formData.email}
                onChange={handleOnChange}
                required
              />
              <div className="invalid-feedback">Email is required</div>
            </div>
          </div>
          <div className="row mb-3">
            <div className="form-group col-lg-6">
              <label htmlFor="inputFname1">Password</label>
              <input
                type="password"
                className="form-control"
                id="inputFname1"
                name="password"
                value={formData.password}
                onChange={handleOnChange}
                required
              />
              <div className="invalid-feedback">Password is required</div>
            </div>
            <div className="form-group col-lg-6">
              <label htmlFor="inputFName4">Qualification</label>
              <input
                type="text"
                className="form-control"
                id="inputFName4"
                name="qualification"
                value={formData.qualification}
                onChange={handleOnChange}
                required
              />
              <div className="invalid-feedback">Qualification is required</div>
            </div>
          </div>
          <div className="row mb-3">
            <div className="form-group col-lg-6">
              <label htmlFor="inputPassword4">Is Live Consult</label>
              <select
                name="isLiveConsult"
                className="form-control"
                value={formData.isLiveConsult}
                onChange={handleOnChange}
                required
              >
                <option value="" disabled>
                  Select Option
                </option>
                <option value="true">Yes</option>Doctor
                <option value="false">No</option>
              </select>
              <div className="invalid-feedback">isLiveConsult is required</div>
            </div>
            <div className="form-group col-lg-6">
              <label htmlFor="inputFname1">Phone</label>
              <input
                type="text"
                className="form-control"
                id="inputFname1"
                name="phone"
                value={formData.phone}
                onChange={handleOnChange}
                required
              />
              <div className="invalid-feedback">Phone is required</div>
            </div>
          </div>
          <div className="row mb-3">
          <div className="form-group col-lg-6">
            <label>Patient</label>
            <Select
              options={patient}
              onInputChange={handleSearch}   
              onChange={handlePatientChange} 
              placeholder="Select Patient"
              isClearable
            />
            {formData && !formData.departmentId && (
              <div className="invalid-feedback d-block">
                Patient is required
              </div>
            )}
          </div>
            <div className="form-group col-lg-6">
              <label htmlFor="inputFName4">Appointment Charges</label>
              <input
                type="number"
                className="form-control"
                id="inputFName4"
                name="appointmentCharges"
                value={formData.appointmentCharges}
                onChange={handleOnChange}
                required
              />
              <div className="invalid-feedback">Appointment Charges is required</div>

            </div>
          </div>
          <div className="row mb-3">
              <div className="form-group col-lg-6">
              <label htmlFor="inputFName4">Daily Patient Check</label>
              <input
                type="number"
                className="form-control"
                id="inputFName4"
                name="dailyPatient"
                value={formData.dailyPatient}
                onChange={handleOnChange}
                required

              />
                <div className="invalid-feedback">Daily Patient is required</div>
            </div>

            <div className="form-group col-lg-6">
              <label htmlFor="inputFName4">DOB</label>
              <input
                type="date"
                className="form-control"
                id="inputFName4"
                name="dob"
                value={formData.dob}
                onChange={handleOnChange}
              />
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

export default AddAppointment;
