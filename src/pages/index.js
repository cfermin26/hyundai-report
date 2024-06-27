import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { esES as esESDataGrid } from "@mui/x-data-grid/locales";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { esES as esESDatePicker } from "@mui/x-date-pickers/locales";
import axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/es";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Layout from "../components/Layout";

function CustomToolbar({ startDate, setStartDate, endDate, setEndDate }) {
  return (
    <GridToolbarContainer>
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        adapterLocale="es"
        localeText={
          esESDatePicker.components.MuiLocalizationProvider.defaultProps
            .localeText
        }
      >
        <DatePicker
          label="Desde"
          value={startDate}
          onChange={(newValue) => setStartDate(newValue)}
          renderInput={(params) => <TextField {...params} />}
          format="DD/MM/YYYY"
        />
        <DatePicker
          label="Hasta"
          value={endDate}
          onChange={(newValue) => setEndDate(newValue)}
          renderInput={(params) => <TextField {...params} />}
          format="DD/MM/YYYY"
        />
      </LocalizationProvider>
      <GridToolbarExport
        csvOptions={{
          utf8WithBom: true,
        }}
      />
    </GridToolbarContainer>
  );
}

const IndexPage = () => {
  const columns = [
    { field: "nombres", headerName: "Nombres", width: 170 },
    { field: "apellidos", headerName: "Apellidos", width: 170 },
    { field: "identificacion", headerName: "Cédula", width: 130 },
    { field: "email", headerName: "Correo electrónico", width: 250 },
    { field: "telefono", headerName: "Teléfono", width: 150 },
    { field: "ciudad", headerName: "Ciudad", width: 150 },
    { field: "referencia", headerName: "Modelo", width: 150 },
    { field: "interes_compra", headerName: "Estimación de compra", width: 220 },
    {
      field: "fecha_creacion",
      headerName: "Fecha de registro",
      width: 200,
      type: "dateTime",
      // cambiar el formato a  DD/MM/YYYY HH:mm:ss
      valueFormatter: (params) =>
        dayjs(params).locale("es").format("DD/MM/YYYY HH:mm:ss"),
    },
  ];

  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    const getAuth = async () => {
      try {
        const response = await axios.get(
          "https://demo.hyundaicolombia.co/api/allcallcenter"
        );
        setTableData(response.data);
        setFilteredData(response.data); // Inicialmente muestra todos los datos
      } catch (error) {
        console.log(error);
      }
    };
    getAuth();
  }, []);

  useEffect(() => {
    if (startDate && endDate) {
      const filtered = tableData.filter((row) => {
        const date = new Date(row.fecha_creacion);
        const start = startDate.startOf("day").toDate();
        const end = endDate.endOf("day").toDate();
        return date >= start && date <= end;
      });
      setFilteredData(filtered);
    } else {
      setFilteredData(tableData);
    }
  }, [startDate, endDate, tableData]);

  return (
    <Layout>
      <main>
        <Helmet>
          <title>Hyundai Colombia</title>
        </Helmet>
        <Box component="main" sx={{ pt: 8 }}>
          <div style={{ height: 100, width: "100%" }}>
            <DataGrid
              rows={filteredData}
              columns={columns}
              autoHeight={true}
              localeText={
                esESDataGrid.components.MuiDataGrid.defaultProps.localeText
              }
              initialState={{
                sorting: {
                  sortModel: [{ field: "fecha_creacion", sort: "desc" }],
                },
              }}
              slots={{
                toolbar: () => (
                  <CustomToolbar
                    startDate={startDate}
                    setStartDate={setStartDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                  />
                ),
              }}
            />
          </div>
        </Box>
      </main>
    </Layout>
  );
};

export default IndexPage;
