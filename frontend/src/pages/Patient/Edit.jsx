import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { getOneRec, updateOneRec } from "../../../src/API/patients";

function AddPatient() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [validated, setValidated] = useState(false);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("success");
  const [data, setData] = useState({}); 
  const [file, setFile] = useState(null);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const response = await getOneRec(id);
      setData(response?.data?.data || {});
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
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
      payload.append("name", data.name || "");
      payload.append("fatherName", data.fatherName || "");
      payload.append("gender", data.gender || "");
      payload.append("phone", data.phone || "");
      payload.append("bloodGroup", data.bloodGroup || "");
      payload.append("martialStatus", data.martialStatus || "");
      payload.append("dob", data.dob || "");
      payload.append("address", data.address || "");
      if (file) {
        payload.append("file", file);
      }

      const response = await updateOneRec(id, payload);

      if (response?.data?.success === false) {
        setMessage(response?.data?.message || "Failed to update patient");
        setVariant("danger");
      } else {
        setMessage(response?.data?.message || "Patient updated successfully");
        setVariant("success");

        setTimeout(() => {
          navigate("/patients/list");
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong");
      setVariant("danger");
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <form
        noValidate
        className={`needs-validation card p-4 ${validated ? "was-validated" : ""}`}
        style={{ width: "1000px" }}
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <h3 className="mb-4">Edit Patient</h3>
        {message && (
          <div className={`alert alert-${variant} h6`} role="alert">
            {message}
          </div>
        )}

        {/* Name & Father Name */}
        <div className="row mb-3">
          <div className="form-group col-lg-6">
            <label htmlFor="inputFname1">Name</label>
            <input
              type="text"
              className="form-control"
              id="inputFname1"
              name="name"
              value={data.name || ""}
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
              value={data.fatherName || ""}
              onChange={handleOnChange}
              required
            />
            <div className="invalid-feedback">Father Name is required</div>
          </div>
        </div>

        {/* Phone & Gender */}
        <div className="row mb-3">
          <div className="form-group col-lg-6">
            <label htmlFor="inputPhone4">Phone</label>
            <input
              type="number"
              className="form-control"
              id="inputPhone4"
              name="phone"
              value={data.phone || ""}
              onChange={handleOnChange}
              required
            />
            <div className="invalid-feedback">Phone is required</div>
          </div>

          <div className="form-group col-lg-6">
            <label htmlFor="inputGender">Gender</label>
            <select
              name="gender"
              id="inputGender"
              className="form-control"
              value={data.gender || ""}
              onChange={handleOnChange}
              required
            >
              <option value="" disabled>Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <div className="invalid-feedback">Gender is required</div>
          </div>
        </div>

        {/* Blood Group & DOB */}
        <div className="row mb-3">
          <div className="form-group col-lg-6">
            <label htmlFor="inputBloodGroup">Blood Group</label>
            <select
              id="inputBloodGroup"
              name="bloodGroup"
              className="form-control"
              value={data.bloodGroup || ""}
              onChange={handleOnChange}
              required
            >
              <option value="" disabled>Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
            <div className="invalid-feedback">Please select a Blood Group</div>
          </div>

          <div className="form-group col-md-6">
            <label htmlFor="inputDob">Date of Birth</label>
            <input
              type="date"
              className="form-control"
              id="inputDob"
              name="dob"
              value={data.dob ? data.dob.substring(0, 10) : ""}
              onChange={handleOnChange}
              required
            />
            <div className="invalid-feedback">Date of Birth is required</div>
          </div>
        </div>

        {/* Marital Status */}
        <div className="row mb-3">
          <div className="form-group col-lg-6">
            <label htmlFor="inputMaritalStatus">Marital Status</label>
            <select
              name="martialStatus"
              id="inputMaritalStatus"
              className="form-control"
              value={data.martialStatus || ""}
              onChange={handleOnChange}
              required
            >
              <option value="" disabled>Select Status</option>
              <option value="married">Married</option>
              <option value="single">Single</option>
            </select>
            <div className="invalid-feedback">Marital Status is required</div>
          </div>
        </div>

        {/* Address */}
        <div className="row mb-3">
          <div className="form-group col-lg-12">
            <label htmlFor="inputAddress">Address</label>
            <textarea
              name="address"
              id="inputAddress"
              className="form-control"
              value={data.address || ""}
              onChange={handleOnChange}
            ></textarea>
          </div>
        </div>

      
        {/* Submit */}
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

export default AddPatient;
