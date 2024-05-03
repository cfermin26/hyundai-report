import Box from "@mui/material/Box";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { esES } from "@mui/x-data-grid/locales";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Layout from "../components/Layout";

function CustomToolbar() {
  return (
    <GridToolbarContainer>
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
    { field: "fecha_creacion", headerName: "Fecha de registro", width: 170 },
    /* { field: "id", headerName: "ID", width: 250 }, */
  ];

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const getAuth = async () => {
      try {
        const response = await axios.get(
          "https://demo.hyundaicolombia.co/api/allcallcenter"
        );
        setTableData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAuth();
  }, []);

  return (
    <Layout>
      <main>
        <Helmet>
          <title>Hyundai Colombia</title>
        </Helmet>
        <Box component="main" sx={{ pt: 8 }}>
          <div style={{ height: 100, width: "100%" }}>
            <DataGrid
              rows={tableData}
              columns={columns}
              autoHeight={true}
              localeText={esES.components.MuiDataGrid.defaultProps.localeText}
              /* localeText={esES.components.MuiDataGrid.defaultProps.localeText} */
              initialState={{
                sorting: {
                  sortModel: [{ field: "fecha_creacion", sort: "desc" }],
                },
              }}
              slots={{ toolbar: CustomToolbar }}
            />
          </div>
        </Box>
      </main>
    </Layout>
  );
};

export default IndexPage;
