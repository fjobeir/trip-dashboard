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

function Trips() {
  const columns = [
    { Header: "id", accessor: "id", align: "left" },
    { Header: "title", accessor: "title", align: "left" },
    { Header: "cost", accessor: "cost", align: "center" },
    { Header: "date", accessor: "date", align: "center" },
    { Header: "options", accessor: "options", align: "center" },
  ];
  const [rows, setRows] = useState([]);
  useEffect(() => {
    async function getTrips() {
      const data = await fetch("http://localhost:3000/trips");
      const trips = await data.json()
      console.log(trips)
      const tableRows = trips?.data?.map((trip) => {
        return {
          id: <>{trip.id}</>,
          title: <>{trip.title}</>,
          cost: <>{trip.cost}</>,
          date: <>{trip.date}</>,
          options: <>
            <MDButton variant="text" color="error">
                <Icon>delete</Icon>&nbsp;delete
            </MDButton>
            <MDButton variant="text" color="dark">
                <Icon>edit</Icon>&nbsp;edit
            </MDButton>
          </>
        };
      });
      setRows(tableRows);
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
                <MDTypography variant="h6" color="white">
                  Trips List
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
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
