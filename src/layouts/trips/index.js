import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Icon from "@mui/material/Icon";
import MDButton from "components/MDButton";
import DataTable from "examples/Tables/DataTable";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

function Trips() {
  const columns = [
    { Header: "id", accessor: "id", align: "left" },
    { Header: "title", accessor: "title", align: "left" },
    { Header: "cost", accessor: "cost", align: "center" },
    { Header: "date", accessor: "date", align: "center" },
    { Header: "options", accessor: "options", align: "center" },
  ];
  const [rows, setRows] = useState([]);
  const [tableRows, setTableRows] = useState([])
  const deleteTrip = async (id) => {
    if (window.confirm('Are you sure you want to delete this trip?')) {
      const deleted = await fetch('http://localhost:3000/trips/' + id, {
        method: 'DELETE'
      })
      const result = await deleted.json()
      const remainedRows = rows.filter((trip) => {
        return trip.id != id
      })
      setRows(remainedRows)
      alert(result.messages.join(' '))
    }

  }
  useEffect(() => {
    const jsxRows = rows?.map((trip) => {
      return {
        id: <>{trip.id}</>,
        title: <>{trip.title}</>,
        cost: <>{trip.cost}</>,
        date: <>{trip.date}</>,
        options: <>
          <MDButton variant="text" color="error" onClick={() => { deleteTrip(trip.id) }}>
            <Icon>delete</Icon>&nbsp;delete
          </MDButton>
          <MDButton variant="text" color="dark">
            <Icon>edit</Icon>&nbsp;edit
          </MDButton>
        </>
      };
    });
    setTableRows(jsxRows);
  }, [rows])
  useEffect(() => {
    async function getTrips() {
      const data = await fetch("http://localhost:3000/trips");
      const trips = await data.json()
      setRows(trips.data)
    }
    getTrips();
  }, []);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item>
                    <MDTypography variant="h6" color="white">
                      Trips List
                    </MDTypography>
                  </Grid>
                  <Grid item>
                    <Link to='/trips/add'>
                      <MDButton variant="text" color="white">
                        <Icon>add_circle</Icon>&nbsp;Add
                      </MDButton>
                    </Link>
                  </Grid>
                </Grid>

              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{
                    columns,
                    rows: tableRows
                  }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Trips;
