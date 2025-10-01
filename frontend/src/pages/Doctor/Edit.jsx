import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { getOneRec, updateOneRec } from "../../API/doctor";
import { useToast } from "../../components/ToastProvider";
import { getDepartmentList } from "../../../src/API/Department";

function EditDoctor() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { showToast } = useToast();

  const [validated, setValidated] = useState(false);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("success");
  const [data, setData] = useState({});
  const [originalData, setOriginalData] = useState({});
  const [department, setDepartment] = useState([]);

  useEffect(() => {
    getUser();
  }, []);

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


  const getUser = async () => {
    try {
      const response = await getOneRec(id);
      setData(response?.data?.data || {});
      setOriginalData(response?.data?.data || {});
      // setDepartment(response?.data?.data.department.id || {});

    } catch (error) {
      showToast("Something Went Wrong", "error");
    }
  };

  // shallow comparison 
  const isEqual = (obj1, obj2) => {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }



  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
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

      // handle if no change
      if (isEqual(data, originalData)) {
        setMessage("You have not made any changes");
        setVariant("warning");
        return
      }

      const payload = new FormData();
      payload.append("name", data.name || "");
      payload.append("email", data.email || "");
      payload.append("phone", data.phone || "");
      payload.append("appointmentCharges", data.appointmentCharges || "");
      payload.append("dob", data.dob || "");
      payload.append("qualification", data.qualification || "");
      payload.append("departmentId", data.department?.id || "");


      const response = await updateOneRec(id, payload);

      if (response?.data?.success === true) {
        showToast(response?.data?.message, "success");
        navigate("/doctors/list");
      } else {
        showToast(response?.message || response?.data?.message, "error");
      }
    } catch (error) {
      console.error(error);
      showToast("Something Went Wrong", "error");
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <form
        noValidate
        className={`needs-validation card p-4 ${validated ? "was-validated" : ""
          }`}
        style={{ width: "1000px" }}
        onSubmit={handleSubmit}
      >
        <h3 className="mb-4">Edit Doctor</h3>
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
              value={data.name}
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
              value={data.email}
              onChange={handleOnChange}
              required
            />
            <div className="invalid-feedback">Email is required</div>
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
              value={data.dob}
              onChange={handleOnChange}
            />
          </div>
          <div className="form-group col-lg-6">
            <label htmlFor="inputFName4">Qualification</label>
            <input
              type="text"
              className="form-control"
              id="inputFName4"
              name="qualification"
              value={data.qualification}
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
              value={data.gender}
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
              value={data.phone}
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
              value={data?.department?.id || ""}   
              onChange={handleOnChange}
              required
            >
              <option value="" disabled>
                Select Department
              </option>
              {department.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name} - {item.description}
                </option>
              ))}
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
              value={data.appointmentCharges}
              onChange={handleOnChange}
              required
            />
            <div className="invalid-feedback">Appointment Charges is required</div>

          </div>
        </div>

        <div>
          <button
            type="submit"
            className="btn float-end"
            style={{ background: "#212529", color: "#fff" }}
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditDoctor;
