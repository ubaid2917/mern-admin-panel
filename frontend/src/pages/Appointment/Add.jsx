import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Message from "../../components/Message";
import App from "../../App";
import {  getList } from "../../../src/API/doctor";
import {  addRecord } from "../../../src/API/appointment";
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
  const [doctor, setDoctor] = useState([]);
  const [search, setSearch] = useState('');
  const [searchDr, setSearchDr] = useState('');
  const [formData, setFormData] = useState({
    date: "",
    payment: "",
    isLiveConsult: "",
    doctorId: "",
    patientId: "",

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

  const handleSearch = (inputValue) => {
    if (inputValue.length > 0) {
      getPatient(inputValue); // search patients
    }
  };

  // handle form change
  const handleOnChange = (event) => {
    const { name, value } = event.target;
  //   let finalValue = value;  

   
  // if (name === "isLiveConsult") {
  //   finalValue = value === "true"; // true or false (boolean)
  // } 

    setFormData({ ...formData, [name]: value });
  };

  // ✅ handle dropdown change
  const handlePatientChange = (selectedOption) => {
    setFormData({ ...formData, patientId: selectedOption?.value || "" });
  };


  // get doctor 
  // get department    
  const getDoctor = async (searchValue = '') => {
    try {
      const response = await getList(searchValue, 10, 1);
      if (response.status !== 200) return;
      const options = response?.data?.data?.map((item) => ({
        value: item.id,
        label: item.name,
      }));

      console.log('option', options)
      setDoctor(options);

    } catch (error) {
      showToast(error, "error");
    }
  };

  // search
  useEffect(() => {
    getDoctor();
  }, []);

  const handleDRSearch = (inputValue) => {
    if (inputValue.length > 0) {
      getDoctor(inputValue); // search patients
    }
  };

  // handle form change
  const handleDrOnChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // ✅ handle dropdown change
  const handleDoctorChange = (selectedOption) => {
    setFormData({ ...formData, doctorId: selectedOption?.value || "" });
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

      payload.append("date", formData.date);
      payload.append("payment", formData.payment);
      payload.append("isLiveConsult", formData.isLiveConsult);
 
      payload.append("doctorId", formData.doctorId);
      payload.append("patientId", formData.patientId);
    
      console.log('payload', payload.isLiveConsult)

      const response = await addRecord(payload);

      if (response?.data?.success === true) {
        showToast(response?.data?.message, "success");

        navigate("/appointments/list");
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
              <label>Patient</label>
              <Select
                options={patient}
                onInputChange={handleSearch}
                onChange={handlePatientChange}
                placeholder="Select Patient"
                isClearable
              />
              {validated && !formData.patientId && (
                <div className="invalid-feedback d-block">
                  Patient is required
                </div>
              )}

            </div>
            <div className="form-group col-lg-6">
              <label>Doctor</label>
              <Select
                options={doctor}
                onInputChange={handleDRSearch}
                onChange={handleDoctorChange}
                placeholder="Select Doctor"
                isClearable
              />
              {validated && !formData.doctorId && (
                <div className="invalid-feedback d-block">
                  Doctor is required
                </div>
              )}
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
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </select>
              <div className="invalid-feedback">isLiveConsult is required</div>
            </div>
            <div className="form-group col-lg-6">
              <label htmlFor="inputPassword4">Payment Mode</label>
              <select
                name="payment"
                className="form-control"
                value={formData.payment}
                onChange={handleOnChange}
                required
              >
                <option value="" disabled>
                  Select Payment Option
                </option>
                <option value="cash">Cash</option>
                <option value="check">Cheque</option>
                <option value="online">online</option>
              </select>
              <div className="invalid-feedback">Payment Mode is required</div>
            </div>
          </div>

          <div className="row mb-3">


            <div className="form-group col-lg-6">
              <label htmlFor="inputFName4">Appointment Date</label>
              <input
                type="datetime-local"
                className="form-control"
                id="inputFName4"
                name="date"
                value={formData.date}
                onChange={handleOnChange}
                required
              />
              <div className="invalid-feedback">Date is required</div>
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
