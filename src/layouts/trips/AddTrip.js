import DashboardLayout from "examples/LayoutContainers/DashboardLayout"
import DashboardNavbar from "examples/Navbars/DashboardNavbar"

// @mui material components
import dayjs from "dayjs";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { TextField } from "@mui/material";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import Button from "@mui/material/Button";
import Icon from "@mui/material/Icon";
import { useRef, useState } from "react";


function AddTrip() {
    const titleRef = useRef()
    const costRef = useRef()
    const [tripDate, setTripDate] = useState('')
    const addTrip = async () => {
        const title = titleRef.current.querySelector('input').value
        const cost = costRef.current.querySelector('input').value
        let tripData = new FormData()
        tripData.append('title', title)
        tripData.append('cost', cost)
        tripData.append('date', tripDate)
        await fetch('http://localhost:3000/trips', {
            method: 'POST',
            body: tripData
        })

    }
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <Card>
                        <MDBox p={3}>
                            <MDTypography variant='h5'>Add New Trip</MDTypography>
                            <MDBox pt={4} pb={2}>
                                <MDBox mb={3}><TextField fullWidth label="Trip Title" ref={titleRef} /></MDBox>
                                <MDBox mb={3}><TextField fullWidth label="Trip Cost" ref={costRef} /></MDBox>
                                <MDBox mb={3}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DateTimePicker
                                            renderInput={(props) => <TextField fullWidth {...props} />}
                                            label="Trip Date"
                                            onChange={(newValue) => {
                                                setTripDate(dayjs(newValue).format("YYYY-MM-DD HH:mm:ss"))
                                            }}
                                        />
                                    </LocalizationProvider>
                                </MDBox>
                                <MDBox mb={3}>
                                    <Button variant="contained" component="label" color='primary'>
                                        <MDTypography color='white' variant="p">
                                            <Grid container spacing={1}>
                                                <Grid item><Icon>photo_library</Icon></Grid>
                                                <Grid item>Upload Photos</Grid>
                                            </Grid>
                                        </MDTypography>
                                        <input hidden accept="image/*" multiple type="file" />
                                    </Button>
                                </MDBox>
                                <MDBox>
                                    <Button variant="contained" type="button" onClick={addTrip}>
                                        <MDTypography color='white' variant="p">
                                            Add Trip
                                        </MDTypography>
                                    </Button>
                                </MDBox>
                            </MDBox>
                        </MDBox>
                    </Card>
                </Grid>
            </Grid>
        </DashboardLayout>
    )
}

export default AddTrip