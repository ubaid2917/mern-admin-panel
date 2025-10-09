import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useToast } from "../../components/ToastProvider";
import { getOneRec, updateOneRec } from "../../../src/API/card";

function EditCard() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { id } = useParams();

  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    minVisits: "",
    discount: "",
    type: "",
    validity: "",
    description: "",
  });
  const [originalData, setOriginalData] = useState({});

  // Card types
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

  // ✅ Fetch card data on component mount
  useEffect(() => {
    getCard();
  }, []);

  const getCard = async () => {
    try {
      const response = await getOneRec(id);
      const cardData = response?.data?.data || {};
      setFormData({
        name: cardData.name || "",
        minVisits: cardData.minVisits || "",
        discount: cardData.discount || "",
        type: cardData.type || "",
        validity: cardData.validity || "",
        description: cardData.description || "",
      });
      setOriginalData(cardData);
    } catch (error) {
      showToast("Error fetching card data", "error");
      console.error("Error fetching card:", error);
    }
  };

  // ✅ Check if data has changed
  const isEqual = (obj1, obj2) => {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  };

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

      // ✅ Check if no changes made
      const currentData = {
        name: formData.name,
        minVisits: Number(formData.minVisits),
        discount: Number(formData.discount),
        type: formData.type,
        validity: Number(formData.validity),
        description: formData.description,
      };

      if (isEqual(currentData, originalData)) {
        showToast("You have not made any changes", "warning");
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

      const response = await updateOneRec(id, payload);

      if (response?.data?.success === true) {
        showToast(response?.data?.message || "Card updated successfully", "success");
        navigate("/cards/list");
      } else {
        showToast(response?.message || response?.data?.message || "Failed to update card", "error");
      }
    } catch (error) {
      showToast(error.message || "Something went wrong", "error");
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
          <h3 className="mb-4">Edit Smart Card</h3>

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
              />
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
    </>
  );
}

export default EditCard;