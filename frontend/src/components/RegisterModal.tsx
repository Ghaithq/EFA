import  { useState } from "react";
import {
  Stack,
  Alert,
  Snackbar,
  Backdrop,
  Box,
  Modal,
  Fade,
  Button,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  FormControl,
  IconButton,
  TextField,
  Autocomplete,
  Grid,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import axios from "axios";
import Cookies from 'js-cookie';


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 400,
  bgcolor: "background.paper",
  border: "2px solid #ccc",
  boxShadow: 24,
  p: 4,
  borderRadius: "12px",
  display: "flex",
  flexDirection: "column",
  gap: 2,
  background: "#f9f9f9",
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
];

export default function Register() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    gender: "",
    city: "",
    address: "",
    password: "",
    confirmPassword: "",
    birthDate: null,
  });
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");
  const [alertOpen, setAlertOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showButton,setShowButton]=useState(localStorage.getItem('jwt')==null)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (field) => (event, value) => {
    setFormData({
      ...formData,
      [field]: value ?? event.target.value,
    });
  };

  const handlePasswordVisibility = () => setShowPassword((prev) => !prev);

  const handleRegister = async () => {
    await axios
      .post(
        "http://localhost:3000/signup",
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          username: formData.username,
          gender: formData.gender,
          city: formData.city,
          address: formData.address,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          birthDate: formData.birthDate,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        setAlertType("success");
        setAlertOpen(true);
        localStorage.setItem('jwt', response.data.jwt);
        setShowButton(false)
        setAlertMessage("Registered successfully!");
        setOpen(false);
        window.location.reload();
      })
      .catch(function (error) {
        setAlertType("error");
        setAlertOpen(true);
        setAlertMessage(error.response.data.message);
        console.log(error);
      });
  };

  const handleCloseAlert = () => setAlertOpen(false);

  return (
    <div>
      {showButton && <Button
    
        onClick={handleOpen}
        sx={{
          color: "white",
          backgroundColor: "#02468D",
        }}
      >
        Register
      </Button>}

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
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 500 } }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Stack sx={style}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label="First Name"
                    fullWidth
                    value={formData.firstName}
                    onChange={handleChange("firstName")}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Last Name"
                    fullWidth
                    value={formData.lastName}
                    onChange={handleChange("lastName")}
                  />
                </Grid>
              </Grid>
              <TextField
                label="Email"
                fullWidth
                value={formData.email}
                onChange={handleChange("email")}
              />
              <TextField
                label="Username"
                fullWidth
                value={formData.username}
                onChange={handleChange("username")}
              />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Autocomplete
                    disablePortal
                    options={genders}
                    value={formData.gender}
                    onChange={handleChange("gender")}
                    renderInput={(params) => (
                      <TextField {...params} label="Gender" fullWidth />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Autocomplete
                    disablePortal
                    options={egyptianCities}
                    value={formData.city}
                    onChange={handleChange("city")}
                    renderInput={(params) => (
                      <TextField {...params} label="City" fullWidth />
                    )}
                  />
                </Grid>
              </Grid>
              <TextField
                label="Address"
                fullWidth
                value={formData.address}
                onChange={handleChange("address")}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={formData.birthDate}
                  onChange={(date) => handleChange("birthDate")(null, date)}
                  renderInput={(params) => (
                    <TextField {...params} label="Birth Date" fullWidth />
                  )}
                />
              </LocalizationProvider>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange("password")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={handlePasswordVisibility}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="confirm-password">Confirm Password</InputLabel>
                <OutlinedInput
                  id="confirm-password"
                  type={showPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange("confirmPassword")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={handlePasswordVisibility}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Confirm Password"
                />
              </FormControl>
              <Button
                onClick={handleRegister}
                sx={{
                  backgroundColor: "#02468D",
                  color: "white",
                  marginTop: 2,
                }}
              >
                Register
              </Button>
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
