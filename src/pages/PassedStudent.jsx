import React, { useContext } from "react";
import { Context } from "../context/ContextProvider";
import { LeaderBoard } from "../components/LeaderBoard";
import { SpecialChance } from "../components/SpecialChance";

export const PassedStudent = () => {
  const { studentsData } = useContext(Context);

  const passedStudent = studentsData.filter((student) => student.marks > 40);

  const getSpecialData =
    JSON.parse(localStorage.getItem("filterSpecial")) || [];
  console.log(getSpecialData, "getSpecialData");

  // this is to show special data in passed data
  const specialWithPassed = [...passedStudent, ...getSpecialData];

  return (
    <div className="passedStudent-container">
      <div className="passedStudent-div">
        <LeaderBoard />
        <h2
          style={{
            background: "burlywood",
            textTransform: "uppercase",
            justifyContent: "center",
          }}
        >
          All passed student list
        </h2>
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
            </tr>
          </thead>
          <tbody className="table-body">
            {specialWithPassed.map((data, index) => (
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
              </tr>
            ))}
          </tbody>
        </table>
        <SpecialChance />
      </div>
    </div>
  );
};
