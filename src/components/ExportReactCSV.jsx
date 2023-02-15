import React from "react";
import { CSVLink } from "react-csv";
import { Button } from "react-bootstrap";

const ExportReactCSV = ({ csvHeaders, csvData, fileName }) => (
  <CSVLink headers={csvHeaders} data={csvData} filename={fileName}>
    <Button variant="success">Export CSV</Button>
  </CSVLink>
);

export default ExportReactCSV;
