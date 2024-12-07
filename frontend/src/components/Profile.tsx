import * as React from "react";
import { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Autocomplete from "@mui/material/Autocomplete";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Grid from "@mui/material/Grid2";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Cookies from "js-cookie";
import axios from "axios";
import { address } from "motion/react-client";
import { Snackbar ,Alert} from "@mui/material";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "background.paper",
  border: "2px solid #ccc",
  boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)",
  p: 4,
  borderRadius: "12px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  fontFamily: "Poppins, sans-serif",
  textAlign: "center",
  minHeight: "250px", // Adjusted to give more space for fields
  background: "#f9f9f9",
  gap: "15px", // Increased gap between elements
};

const genders = ["Male", "Female"];
const egyptianCities = [
  "Cairo",
  "Alexandria",
  "Giza",
  "Port Said",
  "Suez",
  "Luxor",
  "Aswan",
  "Mansoura",
  "Tanta",
  "Ismailia",
  "Sharm El-Sheikh",
  "Hurghada",
  "Beni Suef",
  "Minya",
  "Sohag",
  "Damanhur",
  "Faiyum",
  "Zagazig",
  "Damietta",
  "Kafr El-Sheikh",
  "Assiut",
  "Al Mahalla al Kubra",
  "Qena",
  "Monufia",
  "Asyut",
];

export default function Profile() {
  const [open, setOpen] = React.useState(false);
  // const [showButton,setShowButton]=useState(Cookies.get("jwt")!="")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    gender: "",
    city: "",
    address: "",
    birthDate: null,
  });
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // const [selectedDate, setSelectedDate] = React.useState(null);

  // const handleChange = (date: Date | null) => {
  //   setSelectedDate(date);
  // };

  const handleChange = (field) => (event, value) => {
    setFormData({
      ...formData,
      [field]: value ?? event.target.value,
    });
  };
  const handleCloseAlert = () => setAlertOpen(false);

  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");
  const [alertOpen, setAlertOpen] = useState(false);

  useEffect(() => {
    if(localStorage.getItem("jwt")!=null){
    axios
      .get("http://localhost:3000/get-profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`, // Replace with the token variable
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {

        setFormData({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          username: response.data.username,
          address: response.data.address,
          birthDate: "",
          gender: response.data.gender,
          city: response.data.city,
        });
        
      })
      .catch(function (error) {
        setAlertType("error");
        setAlertOpen(true);
        setAlertMessage(error.response.data.message);
        console.log(error);
      });
  }}, []);

  const handleEdit = async () => {
    console.log("UEADSLVDFLKVNDLFKVN")
    await axios
      .post(
        "http://localhost:3000/edit-profile",
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          username: formData.username,
          gender: formData.gender,
          city: formData.city,
          address: formData.address,
          birthDate: formData.birthDate,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`, // Replace with the token variable
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        setAlertType("success");
        setAlertOpen(true);
        setAlertMessage("Edited successfully!");
        setOpen(false);
        setFormData({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          username: formData.username,
          gender: formData.gender,
          city: formData.city,
          address: formData.address,
          birthDate: "",
        });
      })
      .catch(function (error) {
        setAlertType("error");
        setAlertOpen(true);
        setAlertMessage(error.response.data.message);
        console.log(error);
      });
  };

  return (
    <div>
      {localStorage.getItem("jwt") != null && (
        <Button
          onClick={handleOpen}
          sx={{
            right: 7,
            color: "white",
            backgroundColor: "#02468D",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          <AccountBoxIcon />
        </Button>
      )}
        <Snackbar
        open={alertOpen}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseAlert} severity={alertType}>
          {alertMessage}
        </Alert>
      </Snackbar>
      
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Grid container spacing={2} sx={{ width: "100%" }}>
              <TextField
                label="First Name"
                value={formData.firstName}
                id="outlined-firstname"
                onChange={handleChange("firstName")}
                sx={{
                  width: "47.5%",
                  fontFamily: "Poppins, sans-serif",
                }}
              />
              <TextField
                label="Last Name"
                value={formData.lastName}
                id="outlined-lastname"
                onChange={handleChange("lastName")}
                sx={{
                  width: "47.5%",
                  fontFamily: "Poppins, sans-serif",
                }}
              />
            </Grid>
            <TextField
              label="email"
              id="outlined-email"
              value={formData.email}
              onChange={handleChange("email")}
              sx={{
                width: "100%",
                fontFamily: "Poppins, sans-serif",
              }}
              disabled
            />
            <TextField
              label="username"
              id="outlined-username"
              value={formData.username}
              onChange={handleChange("username")}
              sx={{
                width: "100%",
                fontFamily: "Poppins, sans-serif",
              }}
              disabled
            />
            <Grid container spacing={2} sx={{ width: "100%" }}>
              <Autocomplete
                disablePortal
                options={genders}
                value={formData.gender}
                renderInput={(params) => (
                  <TextField {...params} label="Gender" />
                )}
                sx={{ width: "47.5%" }}
              />
              <Autocomplete
                value={formData.city}
                disablePortal
                options={egyptianCities}
                onChange={handleChange("city")}
                renderInput={(params) => <TextField {...params} label="City" />}
                sx={{ width: "47.5%" }}
              />
            </Grid>

            <TextField
              value={formData.address}
              label="Address"
              id="outlined-lastname"
              onChange={handleChange("address")}
              sx={{
                width: "100%",
                fontFamily: "Poppins, sans-serif",
              }}
            />
            <FormControl
              sx={{
                width: "100%",
                fontFamily: "Poppins, sans-serif",
              }}
              variant="outlined"
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  // value={formData.birthDate}
                  onChange={(date) => handleChange("birthDate")(null, date)}
                  sx={{
                    width: "100%",
                    fontFamily: "Poppins, sans-serif",
                  }}
                  label="Birthday"
                />
              </LocalizationProvider>
            </FormControl>
            <Button
            onClick={handleEdit}
              sx={{
                color: "white",
                backgroundColor: "#02468D",
                fontFamily: "Poppins, sans-serif",
                padding: "10px 20px", // Adjusted padding for better button sizing
                marginTop: "15px", // Add spacing between the password field and the button
                width: "40%",
              }}
            >
              Edit
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
