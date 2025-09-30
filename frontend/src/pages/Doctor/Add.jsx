import { useState } from "react";
import { useNavigate } from "react-router";
import Message from "../../components/Message";
import App from "../../App";
import { addDepartment } from "../../../src/API/Department";
import { useToast } from "../../components/ToastProvider";
function AddDepartment() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [validated, setValidated] = useState(false);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("success");
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

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
      payload.append("description", formData.description);

      const response = await addDepartment(payload);

      if (response?.data?.success === true) {
        showToast(response?.data?.message, "success");

        navigate("/departments/list");
      } else {
        showToast(response?.message || response?.data?.message, "error");
      }
    } catch (error) {
      showToast("Something Went Wrong", "error");
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
          <h3 className="mb-4">Add Department</h3>
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
              <label htmlFor="inputFName4">Description</label>
              <input
                type="text"
                className="form-control"
                id="inputFName4"
                name="description"
                value={formData.description}
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

export default AddDepartment;
