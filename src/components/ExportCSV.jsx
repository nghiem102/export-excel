import React from "react";
import { Button } from "react-bootstrap";
import FileSaver from "file-saver";
import * as XLSX from "xlsx";

const ExportCSV = ({ csvData, fileName }) => {
  const wscols = [
    {
      wch: Math.max(...Heading.map((customer) => customer.number?.length)),
    },
    { wch: Math.max(...Heading.map((customer) => customer.source?.length)) },
    {
      wch: Math.max(
        ...Heading.map((customer) => customer.cluster_deutsch?.length)
      ),
    },
    {
      wch: Math.max(
        ...Heading.map((customer) => customer.cluster_english?.length)
      ),
    },
    {
      wch: Math.max(
        ...Heading.map((customer) => customer.main_topics_dustch?.length)
      ),
    },
    {
      wch: Math.max(
        ...Heading.map((customer) => customer.main_topics_eng?.length)
      ),
    },
    {
      wch: Math.max(
        ...Heading.map((customer) => customer.sub_topics_dustch?.length)
      ),
    },
    {
      wch:
        Math.max(
          ...Heading.map((customer) => customer.sub_topics_eng?.length)
        ) + 3,
    },
  ];

  const exportToCSV = (csvData, fileName, wscols) => {
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";

    const Heading = [
      {
        number: "STT",
        source: "Source",
        cluster_deutsch: "Cluster Deutsch",
        cluster_english: "Cluster English",
        main_topics_dustch: "Hauptthema",
        main_topics_eng: "Main Topic",
        sub_topics_dustch: "Unterthema",
        sub_topics_eng: "Sub Topic",
      },
    ];

    const ws = XLSX.utils.json_to_sheet(Heading, {
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
    XLSX.utils.sheet_add_json(ws, csvData, {
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
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <Button
      variant="warning"
      onClick={(e) => exportToCSV(csvData, fileName, wscols)}
    >
      Export XLSX
    </Button>
  );
};

export default ExportCSV;

// This component is a presentational component which takes the data to download and file name as props. The exportToCSV method is invoked when the export button is clicked on line 20.
