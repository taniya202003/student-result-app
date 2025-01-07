import React, { useContext, useEffect, useState } from "react";
import "../assets/form.css";
import { Context } from "../context/ContextProvider";
import { useNavigate } from "react-router-dom";

export const StudentForm = () => {
  const { newSubmitedData, formData, setFormData } = useContext(Context);
  const [imgFile, setImgFile] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const navigate = useNavigate();

  // this is use for form edit btn =======================================
  useEffect(() => {
    const editStudentIndexData = localStorage.getItem("editStudentData");
    if (editStudentIndexData !== null) {
      const editIndex = JSON.parse(localStorage.getItem("formData")) || [];
      const editStudentDetail = editIndex[parseInt(editStudentIndexData)];
      setFormData(editStudentDetail);
      setEditIndex(parseInt(editStudentIndexData));
      localStorage.removeItem("editStudentData");
    }
  }, [setFormData]);

  // this is to target other input values =====================================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  // prevData represents the previous state of formData
  // { ...prevData, [name]: value } creates a new object that spreads the previous state (...prevData) and updates the property identified by name with the new value.

  // this is use to create choose file in input ================================
  const handleImageChange = (e) => {
    setImgFile(e.target.files[0]);
    // e.target.files[0] is used to access the first file selected by the user
    setFormData((prevData) => ({
      ...prevData,
      imageUrl: URL.createObjectURL(e.target.files[0]),
    }));
  };

  // this is used to submit image by url in input ==================================
  const handleImageUrlChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      imageUrl: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    newSubmitedData(formData, editIndex);
    setFormData({
      name: "",
      email: "",
      class: "",
      subject: "",
      imageUrl: "",
      marks: "",
    });
    setEditIndex(null);
    navigate("/studentsdata");
  };

  return (
    <div className="form-container">
      <div className="form-div">
        <h1 style={{ padding: "0px 0px 6px" }}>STUDENT FORM</h1>
        <form className="student-form" onSubmit={handleSubmit}>
          <label className="form-label" htmlFor="name">
            Name:
            <input
              className="form-input"
              type="text"
              name="name"
              placeholder="Add your name..."
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <label className="form-label" htmlFor="image" type="radio">
            Image:
            <div style={{ display: "flex" }}>
              <input
                className="form-input"
                type="file"
                name="imageUrl"
                onChange={handleImageChange}
              />
              <span style={{ padding: "3px" }}> or </span>
              <input
                className="form-input"
                type="text"
                placeholder="Enter image URL"
                value={formData.imageUrl}
                onChange={handleImageUrlChange}
              />
            </div>
            {formData.imageUrl && (
              <img src={formData.imageUrl} alt="Uploaded" height={"100px"} />
            )}
          </label>
          <label className="form-label" htmlFor="email">
            E-mail:
            <input
              className="form-input"
              type="email"
              name="email"
              placeholder="Add your email..."
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label className="form-label" htmlFor="class">
            Class:
            <input
              className="form-input"
              type="text"
              name="class"
              placeholder="Add your class..."
              value={formData.class}
              onChange={handleChange}
              required
            />
          </label>

          <label className="form-label" htmlFor="subject">
            Subject:
            <select
              className="form-select"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            >
              <option value="">Choose one option</option>
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Social Science">Social Science</option>
              <option value="Computer">Computer</option>
            </select>
          </label>
          <button className="form-submit-btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
