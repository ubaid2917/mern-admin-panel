import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Message from "../../components/Message";
import App from "../../App";
import { addRecord } from "../../../src/API/doctor";
import { getDepartmentList } from "../../../src/API/Department";
import { useToast } from "../../components/ToastProvider";
function AddDoctor() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [validated, setValidated] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("success");
  const [department, setDepartment] = useState([]);
  const [search, setSearch] = useState();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    qualification: "",
    dob: "",
    appointmentCharges: "",
    departmentId: "",
    password: "",
    phone: "",
  });

  // get department 

  const getDepartment = async () => {
    try {
      const response = await getDepartmentList();

      console.log('response', response)
      if (response.status !== 200) return;
      setDepartment(response?.data?.data);

    } catch (error) {
      showToast(error, "error");
    }
  };

  // search
  useEffect(() => {
    getDepartment();
  }, []);



  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
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
      payload.append("qualification", formData.qualification);
      payload.append("dob", formData.dob);
      payload.append("gender", formData.gender);
      payload.append("appointmentCharges", formData.appointmentCharges);
      payload.append("departmentId", formData.departmentId);
      payload.append("password", formData.password);


      const response = await addRecord(payload);

      if (response?.data?.success === true) {
        showToast(response?.data?.message, "success");

        navigate("/departments/list");
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
          <h3 className="mb-4">Add Doctor</h3>
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
              <div className="invalid-feedback">Phone is required</div>
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
              <label htmlFor="inputPassword4">Department</label>
              <select
                name="departmentId"
                className="form-control"
                value={formData.departmentId}
                onChange={handleOnChange}
                required
              >
                <option value="" disabled>
                  Select Department
                </option>
                {
                  department.map((item) => {
                    return (
                      <option value={item.id}>{item.name} - {item.description}</option>
                    )
                  })
                }

              </select>
              <div className="invalid-feedback">Department is required</div>
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

export default AddDoctor;
