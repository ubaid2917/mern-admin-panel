import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useToast } from "../../components/ToastProvider";
import { addRecord } from "../../../src/API/card"; 

function AddCard() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    minVisits: "",
    discount: "",
    type: "",
    validity: "",
    description: "",
  });

  //  Card types
  const cardTypes = [
    { value: "Platinum", label: "Platinum" },
    { value: "Silver", label: "Silver" },
    { value: "Gold", label: "Gold" },
    { value: "Diamond", label: "Diamond" },
    { value: "VIP", label: "VIP" },
  ];

  // Validity options (in months)
  const validityOptions = [
    { value: "1", label: "1 Month" },
    { value: "3", label: "3 Months" },
    { value: "6", label: "6 Months" },
    { value: "9", label: "9 Months" },
    { value: "12", label: "12 Months" },
  ];

  // handle form change
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

      const payload = {
        name: formData.name,
        minVisits: Number(formData.minVisits),
        discount: Number(formData.discount),
        type: formData.type,
        validity: Number(formData.validity),
        description: formData.description,
      };

      console.log("payload", payload);

      const response = await addRecord(payload); 

      if (response?.data?.success === true) {
        showToast(response?.data?.message, "success");
        navigate("/cards/list"); 
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
          className={`needs-validation card p-4 ${
            validated ? "was-validated" : ""
          }`}
          style={{ width: "1000px" }}
          onSubmit={handleSubmit}
        >
          <h3 className="mb-4">Add Smart Card</h3>

          <div className="row mb-3">
            <div className="form-group col-lg-6">
              <label htmlFor="name">Card Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleOnChange}
                placeholder="Enter card name"
                required
              />
              <div className="invalid-feedback">Card name is required</div>
            </div>

            <div className="form-group col-lg-6">
              <label htmlFor="type">Card Type</label>
              <select
                name="type"
                className="form-control"
                value={formData.type}
                onChange={handleOnChange}
                required
              >
                <option value="" disabled>
                  Select Card Type
                </option>
                {cardTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              <div className="invalid-feedback">Card type is required</div>
            </div>
          </div>

          <div className="row mb-3">
            <div className="form-group col-lg-6">
              <label htmlFor="minVisits">Minimum Visits</label>
              <input
                type="number"
                className="form-control"
                id="minVisits"
                name="minVisits"
                value={formData.minVisits}
                onChange={handleOnChange}
                placeholder="Enter minimum visits"
                min="1"
                required
              />
              <div className="invalid-feedback">Minimum visits is required</div>
            </div>

            <div className="form-group col-lg-6">
              <label htmlFor="discount">Discount (%)</label>
              <input
                type="number"
                className="form-control"
                id="discount"
                name="discount"
                value={formData.discount}
                onChange={handleOnChange}
                placeholder="Enter discount percentage"
                min="0"
                max="100"
                required
              />
              <div className="invalid-feedback">Discount is required</div>
            </div>
          </div>

          <div className="row mb-3">
            <div className="form-group col-lg-6">
              <label htmlFor="validity">Validity (Months)</label>
              <select
                name="validity"
                className="form-control"
                value={formData.validity}
                onChange={handleOnChange}
                required
              >
                <option value="" disabled>
                  Select Validity
                </option>
                {validityOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="invalid-feedback">Validity is required</div>
            </div>

            <div className="form-group col-lg-6">
              <label htmlFor="description">Description</label>
              <input
                className="form-control"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleOnChange}
                placeholder="Enter card description"
                rows="3"
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

export default AddCard;