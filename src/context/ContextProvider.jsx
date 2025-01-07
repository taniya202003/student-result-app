import React, { createContext, useEffect, useState } from "react";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [studentsData, setStudentsData] = useState(() => {
    const data = JSON.parse(localStorage.getItem("formData")) || [];
    return Array.isArray(data) ? data : [];
  });

  const [special, setSpecial] = useState();
  const [marks, setmarks] = useState("");
  const [togglemark, setTogglemark] = useState(false);

  const [formData, setFormData] = useState({
    serialNumber: "",
    name: "",
    email: "",
    class: "",
    subject: "",
    imageUrl: "",
    marks: "",
  });

  // this is used for serial numbers ========================================================
  useEffect(() => {
    const updatedData = studentsData.map((student, index) => ({
      ...student,
      serialNumber: index + 1,
    }));
    setStudentsData(updatedData);
    localStorage.setItem("formData", JSON.stringify(updatedData));
  }, []);

  // submit btn function =====================================================================
  const newSubmitedData = (newData, index = null) => {
    let updatedStudentData;
    if (index !== null) {
      updatedStudentData = [...studentsData];
      newData.serialNumber = updatedStudentData[index].serialNumber;
      updatedStudentData[index] = newData;
    } else {
      newData.serialNumber = studentsData.length + 1;
      updatedStudentData = [...studentsData, newData];
    }
    setStudentsData(updatedStudentData);
    localStorage.setItem("formData", JSON.stringify(updatedStudentData));
  };

  // delete btn function =====================================================================
  const deleteBtn = (index) => {
    const updatedData = studentsData.filter((_, i) => i !== index);
    setStudentsData(updatedData);

    localStorage.setItem("formData", JSON.stringify(updatedData));
  };

  // edit btn function =========================================================================
  const editBtn = (index) => {
    localStorage.setItem("editStudentData", index.toString());
  };

  // add marks btn function ====================================================================
  const marksBtn = (index) => {
    let studentMarks = prompt("Please enter your marks");
    if (studentMarks !== null) {
      studentMarks = parseInt(studentMarks, 10);
      if (studentMarks === null || studentMarks < 0 || studentMarks > 100) {
        alert("You can only add a number between 0 and 100.");
      } else {
        const updatedData = [...studentsData];
        updatedData[index].marks = studentMarks;
        setStudentsData(updatedData);
        localStorage.setItem("formData", JSON.stringify(updatedData));
        setTogglemark(true);
      }
    }
  };

  // edit marks btn function ====================================================================
  const editMarksBtn = (index) => {
    let marks = prompt("Edit your marks...");
    if (marks === "" || marks === null) {
      return;
      // marks === "" is use for promt ok btn
      // marks === null is use for prompt cencel btn
      //if prompt is empty then it will keep the old value and there will be no change and will jus return
    }
    marks = parseInt(marks, 10);
    console.log(marks, "marks");
    if (marks === null || marks < 0 || marks > 100) {
      alert("You can only add a number between 0 and 100.");
    } else {
      const updatedData = [...studentsData];
      updatedData[index].marks = marks;
      setStudentsData(updatedData);
      localStorage.setItem("formData", JSON.stringify(updatedData));
      setTogglemark(true);
    }
  };

  // special chance btn function ==============================================================
  const specialChance = (index) => {
    const filterSpecial = special.filter((_, i) => i === index);
    console.log(filterSpecial, "filterSpecial");
    // this is in the case if prev data replace old data from local storage
    let existingData = JSON.parse(localStorage.getItem("filterSpecial")) || [];
    existingData = [...existingData, ...filterSpecial];
    localStorage.setItem("filterSpecial", JSON.stringify(existingData));

    // this is to remove special student data on click of special btn
    if (filterSpecial) {
      const serial = filterSpecial[0].serialNumber;
      const filterClicked = studentsData.filter(
        (el) => el.serialNumber !== serial
      );
      console.log(filterClicked, "filterClicked");
      setStudentsData(filterClicked);
      localStorage.setItem("formData", JSON.stringify(filterClicked));
    }
  };

  return (
    <div>
      <Context.Provider
        value={{
          studentsData,
          newSubmitedData,
          setStudentsData,
          formData,
          setFormData,
          deleteBtn,
          editBtn,
          marks,
          setmarks,
          marksBtn,
          editMarksBtn,
          togglemark,
          specialChance,
          special,
          setSpecial,
        }}
      >
        {children}
      </Context.Provider>
    </div>
  );
};
