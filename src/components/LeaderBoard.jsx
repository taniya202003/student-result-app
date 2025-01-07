import React, { useContext } from "react";
import { Context } from "../context/ContextProvider";

export const LeaderBoard = () => {
  const { studentsData } = useContext(Context);
  const sortedStudents = [...studentsData].sort((a, b) => b.marks - a.marks);
  const topThreeStudents = sortedStudents.slice(0, 3);

  return (
    <div className="leaderBoard-container">
      <h2
        style={{
          background: "burlywood",
          textTransform: "uppercase",
          justifyContent: "center",
        }}
      >
        Top Three Students Leader Board
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
          {topThreeStudents.map((data, index) => (
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
    </div>
  );
};
