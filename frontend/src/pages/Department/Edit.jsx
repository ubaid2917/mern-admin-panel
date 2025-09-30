import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { getOneRec, updateOneRec } from "../../API/Department";
import { useToast } from "../../components/ToastProvider";

function EditDepartment() {
  const navigate = useNavigate();
  const { id } = useParams();
   const { showToast } = useToast();

  const [validated, setValidated] = useState(false);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("success");
  const [data, setData] = useState({});
  const [originalData, setOriginalData] = useState({});
  const [file, setFile] = useState(null);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const response = await getOneRec(id);
      setData(response?.data?.data || {});
      setOriginalData(response?.data?.data || {});
    } catch (error) {
      showToast("Something Went Wrong",  "error");
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

      // handle if no change
      if (isEqual(data, originalData)) {
        setMessage("You have not made any changes");
        setVariant("warning");  
        return
      }

      const payload = new FormData();
      payload.append("name", data.name || "");
      payload.append("description", data.description || "");
      

      const response = await updateOneRec(id, payload);

      if (response?.data?.success === true) {
        showToast(response?.data?.message, "success");
        navigate("/departments/list");
      } else {
        showToast(response?.message || response?.data?.message,  "error");
      }
    } catch (error) {
      console.error(error);
      showToast("Something Went Wrong",  "error");
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
        <h3 className="mb-4">Edit Department</h3>
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
            <label htmlFor="inputFName4">Description</label>
            <input
              type="text"
              className="form-control"
              id="inputFName4"
              name="description"
              value={data.description || ""}
              onChange={handleOnChange}
           
            />
            
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

export default EditDepartment;
