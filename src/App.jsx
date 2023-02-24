import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { formatData, Heading, wscols } from "./components/constants";
import Customers from "./components/Customers";
import ExportCSV from "./components/ExportCSV";
import ExportReactCSV from "./components/ExportReactCSV";
import Test from "./components/Test";
import { data } from "./constants";
import FileSaver from "file-saver";
import * as XLSX from "xlsx";

// generate customer objects

const App = () => {
  const { newData, merges } = formatData(data);
  const { read, utils, writeFile, write } = XLSX;
  const [movies, setMovies] = useState([]);

  const exportToCSV = (csvData, fileName) => {
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";

    const ws = utils.json_to_sheet(Heading, {
      header: [
        "number",
        "source",
        "cluster_english",
        "cluster_deutsch",
        "main_topics_eng",
        "main_topics_dustch",
        "sub_topics_eng",
        "sub_topics_dustch",
      ],
      skipHeader: true,
      origin: 0, //ok
    });

    ws["!cols"] = wscols;

    utils.sheet_add_json(ws, csvData, {
      header: [
        "number",
        "source",
        "cluster_english",
        "cluster_deutsch",
        "main_topics_eng",
        "main_topics_dustch",
        "sub_topics_eng",
        "sub_topics_dustch",
      ],
      skipHeader: true,
      origin: -1, //ok
    });

    // merge rows
    ws["!merges"] = merges;

    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };

    const excelBuffer = write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  const handleImport = ($event) => {
    const files = $event.target.files;
    if (files.length) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const wb = read(event.target.result);
        const sheets = wb.SheetNames;

        if (sheets.length) {
          const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
          setMovies(rows);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  console.log(movies);

  return (
    <div className="App">
      <div className="row">
        <div className="col-md-8">
          <div className="custom-file">
            <input
              type="file"
              name="file"
              className="custom-file-input"
              id="inputGroupFile"
              required
              onChange={handleImport}
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            />
            <label className="custom-file-label" htmlFor="inputGroupFile">
              Choose file
            </label>
          </div>
          <h2>Customers</h2>
        </div>
        <div className="col-md-4 center">
          <Button
            variant="warning"
            onClick={(e) => exportToCSV(newData, "Customers_Infomation_xlsx")}
          >
            Export XLSX
          </Button>
        </div>
      </div>
    </div>
  );
};

export default App;
