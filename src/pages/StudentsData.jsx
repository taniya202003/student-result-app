import React, { useContext } from "react";
import "../assets/table.css";
import { Context } from "../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

export const StudentsData = () => {
  const {
    studentsData,
    deleteBtn,
    editBtn,
    marksBtn,
    togglemark,
    editMarksBtn,
  } = useContext(Context);

  const navigate = useNavigate();

  const handleEdit = (index) => {
    navigate("/");
    editBtn(index);
  };

  const handleDeleteData = (index) => {
    // confirmAlert this is use to delete confirmation pop up its a npm package
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure you want to delete this record?",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteBtn(index),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
    // deleteBtn(index) this function has  all deleteBtn functionality in context
  };

  const handleMarks = (index) => {
    marksBtn(index);
  };

  const editMarks = (index) => {
    editMarksBtn(index);
  };

  console.log(studentsData, "studentdata", togglemark);

  return (
    <div className="studentsData-container">
      <div className="studentsData-div">
        <table className="student-table">
          <thead className="table-thead">
            <tr className="thead-row">
              <th className="thead-heading">Sr.No.</th>
              <th className="thead-heading"> IMAGE</th>
              <th className="thead-heading">NAME</th>
              <th className="thead-heading">E-MAIL ADDRESS</th>
              <th className="thead-heading">CLASS</th>
              <th className="thead-heading">SUBJECT</th>
              <th className="thead-heading">MARKS</th>
              <th className="thead-heading">EDIT</th>
              <th className="thead-heading">DELETE</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {studentsData.map((data, index) => (
              <tr className="tbody-row" key={index}>
                <td className="tbody-data">{data.serialNumber}</td>
                <td className="tbody-data">
                  {data.imageUrl && (
                    <img
                      src={data.imageUrl}
                      alt="submittedImage"
                      height={"200px"}
                    />
                  )}
                </td>
                <td className="tbody-data">{data.name}</td>
                <td className="tbody-data"> {data.email}</td>
                <td className="tbody-data">{data.class}</td>
                <td className="tbody-data">{data.subject}</td>
                <td className="tbody-data" style={{ cursor: "pointer" }}>
                  {data?.marks ? (
                    <p onClick={() => editMarks(index)}>{data?.marks}</p>
                  ) : (
                    <button
                      className="marksBtn"
                      onClick={() => handleMarks(index)}
                    >
                      Add Marks
                    </button>
                  )}
                </td>
                <td className="tbody-data">
                  <button className="editBtn" onClick={() => handleEdit(index)}>
                    EDIT
                  </button>
                </td>
                <td className="tbody-data">
                  <button
                    className="deleteBtn"
                    onClick={() => handleDeleteData(index)}
                  >
                    DELETE{" "}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
