import { useState } from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    dob: "",
    gender: "",
    city: "",
    agreed: false,
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    validate({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({
      ...touched,
      [name]: true,
    });
    validate(formData);
  };

  const validate = (data = formData) => {
    const newErrors = {};

    const calculateAge = (dob) => {
      const birthDate = new Date(dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }
      return age;
    };

    // Validate Name
    if (!data.name) {
      newErrors.name = "Name is required.";
    } else if (data.name.length < 4) {
      newErrors.name = "Name must be at least 4 characters long.";
    } else if (!/^[a-zA-Z\s]+$/.test(data.name)) {
      newErrors.name = "Name can only contain letters and spaces.";
    }

    // Validate Email
    if (!data.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = "Email is invalid.";
    }

    // Validate Mobile
    if (!data.mobile) {
      newErrors.mobile = "Mobile number is required.";
    } else if (!/^(?:\+91)?[6789]\d{9}$/.test(data.mobile)) {
      newErrors.mobile =
        "Mobile number must start with 6, 7, 8, or 9 and be 10 digits long. '+91' is also valid.";
    }

    // Validate Date of Birth (Age > 18 and Age <= 100)
    if (!data.dob) {
      newErrors.dob = "Date of Birth is required.";
    } else {
      const age = calculateAge(data.dob);
      if (age < 18) {
        newErrors.dob = "You must be at least 18 years old.";
      } else if (age > 100) {
        newErrors.dob = "Age must be less than or equal to 100 years.";
      }
    }

    // Validate Gender
    if (!data.gender) {
      newErrors.gender = "Gender is required.";
    }

    // Validate City
    if (!data.city) {
      newErrors.city = "City is required.";
    }

    // Validate Agreement Checkbox
    if (!data.agreed) {
      newErrors.agreed = "You must agree to proceed.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({
      name: true,
      email: true,
      mobile: true,
      dob: true,
      gender: true,
      city: true,
      agreed: true,
    });
    if (validate()) {
      console.log("Form submitted:", formData);
      setFormData({
        name: "",
        email: "",
        mobile: "",
        dob: "",
        gender: "",
        city: "",
        agreed: false,
      });
      setErrors({});
      setTouched({});
    }
  };

  return (
    <section className="container w-50 rounded">
      <form
        name="myForm"
        id="Form"
        className="row g-3 needs-validation my-5 mainForm px-sm-4 py-sm-5 pt-sm-0 rounded-5"
        onSubmit={handleSubmit}
      >
        <h1 className="text-white">Form</h1>

        <div className="col-md-12 pt-0 mt-2">
          <label htmlFor="inputName" className="form-label text-light">
            Name <span className="text-danger">*</span>
          </label>
          <div className="text-danger">{touched.name && errors.name}</div>
          <input
            type="text"
            className={`form-control bgWhite ${
              touched.name && errors.name ? "is-invalid" : ""
            }`}
            name="name"
            id="inputName"
            placeholder="Enter Your Name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>

        <div className="col-12">
          <label htmlFor="inputEmail" className="form-label text-light">
            Email <span className="text-danger">*</span>
          </label>
          <div className="text-danger">{touched.email && errors.email}</div>
          <input
            type="email"
            className={`form-control bgWhite ${
              touched.email && errors.email ? "is-invalid" : ""
            }`}
            name="email"
            id="inputEmail"
            placeholder="Enter Your Email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>

        <div className="col-12">
          <label htmlFor="inputMoNum" className="form-label text-light">
            Mobile Number <span className="text-danger">*</span>
          </label>
          <div className="text-danger">{touched.mobile && errors.mobile}</div>
          <input
            type="text"
            className={`form-control bgWhite ${
              touched.mobile && errors.mobile ? "is-invalid" : ""
            }`}
            name="mobile"
            id="inputMoNum"
            placeholder="Enter Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>

        <div className="col-12">
          <label htmlFor="inputDob" className="form-label text-light">
            Date of Birth <span className="text-danger">*</span>
          </label>
          <div className="text-danger">{touched.dob && errors.dob}</div>
          <input
            type="date"
            className={`form-control bgWhite ${
              touched.dob && errors.dob ? "is-invalid" : ""
            }`}
            name="dob"
            id="inputDob"
            value={formData.dob}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>

        <label htmlFor="inputGender" className="form-label text-light">
          Gender <span className="text-danger">*</span>
        </label>
        <div id="inputGender" className="form-group d-flex flex-wrap gap-4">
          {["male", "female", "other"].map((gender) => (
            <div className="form-check" key={gender}>
              <input
                type="radio"
                name="gender"
                value={gender}
                id={`opt-${gender}`}
                className="form-check-input"
                onChange={handleChange}
                checked={formData.gender === gender}
              />
              <label
                htmlFor={`opt-${gender}`}
                className="form-check-label text-light"
              >
                {gender.charAt(0).toUpperCase() + gender.slice(1)}
              </label>
            </div>
          ))}
          <div className="text-danger">{touched.gender && errors.gender}</div>
        </div>

        <div className="col-md-12">
          <label htmlFor="inputCity" className="form-label text-light">
            City <span className="text-danger">*</span>
          </label>
          <div className="text-danger">{touched.city && errors.city}</div>
          <select
            name="city"
            id="inputCity"
            className={`form-select text-black bgWhite ${
              errors.city ? "is-invalid" : ""
            }`}
            value={formData.city}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option value="">--Select City--</option>
            <option value="Ahm">Ahmedabad</option>
            <option value="And">Anand</option>
            <option value="ganNgr">Gandhinagar</option>
            <option value="st">Surat</option>
            <option value="nvs">Navsari</option>
            <option value="gdv">Gandevi</option>
          </select>
        </div>

        <div className="col-12">
          <div className="form-check">
            <input
              className={`form-check-input ${
                touched.agreed && errors.agreed ? "is-invalid" : ""
              }`}
              type="checkbox"
              name="agreed"
              id="gridCheck"
              checked={formData.agreed}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <label className="form-check-label text-light" htmlFor="gridCheck">
              I Agree to proceed
            </label>
            <div className="text-danger">{touched.agreed && errors.agreed}</div>
          </div>
        </div>

        <div className="col-12">
          <button
            type="submit"
            className="btn btn-light bgWhite text-dark fw-bold"
          >
            Submit
          </button>
        </div>
      </form>
    </section>
  );
}

export default App;
