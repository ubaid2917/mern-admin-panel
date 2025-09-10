import { useState } from "react";

function AddUser() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      // ✅ Form is valid - do submit logic here
      console.log("Form submitted successfully!");
    }

    setValidated(true);
  };

  return (
    <div className="d-flex justify-content-center">
      <form
        noValidate
        className={`needs-validation card p-4 ${validated ? "was-validated" : ""}`}
        style={{ width: "1000px" }}
        onSubmit={handleSubmit}
      >
        <h3 className="mb-4">Add User</h3>

        <div className="row mb-3">
          <div className="form-group col-lg-6">
            <label htmlFor="inputFname1">First Name</label>
            <input
              type="text"
              className="form-control"
              id="inputFname1"
              required
            />
            <div className="invalid-feedback">First name is required</div>
          </div>
          <div className="form-group col-lg-6">
            <label htmlFor="inputLname1">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="inputLname1"
              required
            />
            <div className="invalid-feedback">Last name is required</div>
          </div>
        </div>

        <div className="row mb-3">
          <div className="form-group col-lg-6">
            <label htmlFor="inputEmail4">Email</label>
            <input
              type="email"
              className="form-control"
              id="inputEmail4"
              required
            />
            <div className="invalid-feedback">Enter a valid email</div>
          </div>
          <div className="form-group col-lg-6">
            <label htmlFor="inputPassword4">Password</label>
            <input
              type="password"
              className="form-control"
              id="inputPassword4"
              required
              minLength={8}
            />
            <div className="invalid-feedback">
              Password must be at least 8 characters
            </div>
          </div>
        </div>

        <div className="row mb-3">
          <div className="form-group col-md-6">
            <label htmlFor="inputCity">City</label>
            <input
              type="text"
              className="form-control"
              id="inputCity"
              required
            />
            <div className="invalid-feedback">City is required</div>
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="inputState">State</label>
            <select id="inputState" className="form-control" required>
              <option value="">Choose...</option>
              <option>Punjab</option>
              <option>Sindh</option>
              <option>KPK</option>
              <option>Balochistan</option>
            </select>
            <div className="invalid-feedback">Please select a state</div>
          </div>
          <div className="form-group col-md-2">
            <label htmlFor="inputZip">Zip</label>
            <input
              type="text"
              className="form-control"
              id="inputZip"
              required
            />
            <div className="invalid-feedback">Zip is required</div>
          </div>
        </div>

        <div>
          <button type="submit" className="btn btn-secondary">
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddUser;
