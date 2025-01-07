import React, { useContext, useEffect} from "react";
import { Context } from "../context/ContextProvider";

export const FailedStudent = () => {
  const { studentsData, specialChance, setSpecial } = useContext(Context);

  const failedStudent = studentsData.filter((student) => student.marks < 40);

  useEffect(() => {
    setSpecial(failedStudent);
  }, []);

  const handleSpecialChance = (index) => {
    specialChance(index);
  };

  return (
    <div className="faildStudent-container">
      <h2
        style={{
          background: "burlywood",
          textTransform: "uppercase",
          justifyContent: "center",
        }}
      >
        All failed student list
      </h2>
      <div className="failedStudent-div">
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
              <th className="thead-heading">Special Chance</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {failedStudent.map((data, index) => (
              <tr className="tbody-row" key={index + 1}>
                <td>{index + 1}</td>
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
                <td className="tbody-data">{data.marks}</td>
                <td className="tbody-data">
                  {data.marks >= 30 && data.marks <= 40 && (
                    <button
                      className="special-chance-btn"
                      onClick={() => handleSpecialChance(index)}
                    >
                      Special Chance
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
