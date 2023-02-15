import React from "react";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { data } from "../constants";
import { formatData, Heading } from "./constants";

const Test = () => {
  const newdata = formatData(data);
  console.log(newdata);
  const dataHeader = Object.values(Heading[0]);

  return (
    <>
      <ReactHTMLTableToExcel
        id="test-table-xls-button"
        className="download-table-xls-button"
        table="table-to-xls"
        filename="tablexls"
        sheet="tablexls"
        buttonText="Export XLS"
      />
      <table id="table-to-xls" border={1}>
        <thead>
          <tr>
            {dataHeader.map((item) => (
              <th>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {newdata?.map(
            ({
              number,
              source,
              cluster_deutsch,
              cluster_english,
              main_topics_dustch,
              main_topics_eng,
              sub_topics_dustch,
              sub_topics_eng,
            }) => (
              <tr>
                {number && <td rowSpan={0}>{number}</td>}
                {source && <td rowSpan={newdata.length}>{source}</td>}
                {cluster_deutsch && (
                  <td rowSpan={newdata.length}>{cluster_deutsch}</td>
                )}
                {cluster_english && (
                  <td rowSpan={newdata.length}>{cluster_english}</td>
                )}
                <td>{main_topics_dustch}</td>
                <td>{main_topics_eng}</td>
                <td>{sub_topics_dustch}</td>
                <td>{sub_topics_eng}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </>
  );
};

export default Test;
