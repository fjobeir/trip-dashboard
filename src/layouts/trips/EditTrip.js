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
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Avatar from '@mui/material/Avatar';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';


function EditTrip() {
    const [trip, setTrip] = useState({
        title: '',
        cost: '',
        date: '',
        Photos: []
    })
    const { id } = useParams()
    const navigate = useNavigate()
    const editTrip = async (event) => {
        event.preventDefault()
        let tripData = new FormData(event.target)
        const added = await fetch(`${process.env.REACT_APP_API_URL}/trips/${id}`, {
            method: 'PUT',
            body: tripData
        })
        const json = await added.json()
        alert(json.messages.join(' '))
        if (json.success) {
            // navigate('/trips')
        }
    }
    const deletePhoto = async (id) => {
        if (window.confirm('Are you sure you want to delete this photo?')) {
          const deleted = await fetch(`${process.env.REACT_APP_API_URL}/photos/${id}`, {
            method: 'DELETE'
          })
          const result = await deleted.json()
          const remainedPhotos = trip.Photos.filter((photo) => {
            return photo.id !== id
          })
          setTrip({...trip, Photos: remainedPhotos})
          alert(result.messages.join(' '))
        }
      }
    useEffect(() => {
        async function getTrip() {
            const tripData = await fetch(`${process.env.REACT_APP_API_URL}/trips/${id}`)
            const json = await tripData.json()
            setTrip(json.data)
        }
        getTrip();
    }, [])
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <Card>
                        <form method="post" onSubmit={editTrip}>
                            <MDBox p={3}>
                                <MDTypography variant='h5'>Edit Trip</MDTypography>
                                <MDBox pt={4} pb={2}>
                                    <MDBox mb={3}>
                                        <TextField value={trip?.title} onChange={(e) => { setTrip({ ...trip, title: e.target.value }) }} name="title" fullWidth label="Trip Title" /></MDBox>
                                    <MDBox mb={3}>
                                        <TextField value={trip?.cost} onChange={(e) => { setTrip({ ...trip, cost: e.target.value }) }} name="cost" fullWidth label="Trip Cost" /></MDBox>
                                    <MDBox mb={3}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DateTimePicker
                                                value={trip.date}
                                                renderInput={(props) => <TextField name="date" fullWidth {...props} />}
                                                label="Trip Date"
                                                inputFormat="YYYY-MM-DD HH:mm:ss"
                                                mask="____-__-__ __:__:__"
                                                onChange={(newValue) => {
                                                    setTrip({ ...trip, date: dayjs(newValue).format("YYYY-MM-DD HH:mm:ss") })
                                                }}
                                            />
                                        </LocalizationProvider>
                                    </MDBox>
                                    <MDBox mb={3}>
                                        <Grid container spacing={2}>
                                            {
                                                trip.Photos.map((photo, i) => {
                                                    return (
                                                        <Grid item key={i}>
                                                            <Avatar
                                                                alt=""
                                                                variant="square"
                                                                src={photo.file}
                                                                sx={{ width: 150, height: 150 }}
                                                            />
                                                            <IconButton aria-label="delete" onClick={() => {deletePhoto(photo.id)}}>
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        </Grid>
                                                    )
                                                })
                                            }
                                        </Grid>
                                        <Button variant="contained" component="label" color='primary'>
                                            <MDTypography color='white' variant="p">
                                                <Grid container spacing={1}>
                                                    <Grid item><Icon>photo_library</Icon></Grid>
                                                    <Grid item>Upload Photos</Grid>
                                                </Grid>
                                            </MDTypography>
                                            <input hidden name="photo" accept="image/*" multiple type="file" />
                                        </Button>
                                    </MDBox>
                                    <MDBox>
                                        <Button variant="contained" type="submit">
                                            <MDTypography color='white' variant="p">
                                                Edit Trip
                                            </MDTypography>
                                        </Button>
                                    </MDBox>
                                </MDBox>
                            </MDBox>
                        </form>
                    </Card>
                </Grid>
            </Grid>
        </DashboardLayout>
    )
}

export default EditTrip