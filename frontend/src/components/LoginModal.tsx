import * as React from "react";
import { useState } from "react";
import {
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
} from "@mui/material";
import axios from "axios";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import Cookies from 'js-cookie';

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

export default function Login() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showButton,setShowButton]=useState(localStorage.getItem('jwt')==null)
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");
  const [alertOpen, setAlertOpen] = useState(false);

  const handleChange = (field) => (event, value) => {
    setFormData({
      ...formData,
      [field]: value ?? event.target.value,
    });
  };
  const handleCloseAlert = () => setAlertOpen(false);

  const handleLogin = async () => {
    await axios
      .post(
        "http://localhost:3000/login",
        {
          username: formData.username,
          password: formData.password
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
        setAlertMessage("Signed in successfully!");
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

  return (
    <div>
      {showButton&&<Button
        onClick={handleOpen}
        sx={{
          color: "white",
          backgroundColor: "#02468D",
          fontFamily: "Poppins, sans-serif",
          right: 7,
        }}
      >
        Login
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
            <TextField
              onChange={handleChange("username")}
              label="username"
              id="outlined-start-adornment"
              sx={{
                width: "100%",
                fontFamily: "Poppins, sans-serif",
              }}
            />

            <FormControl sx={{
              width: "100%",
              fontFamily: "Poppins, sans-serif",
            }} variant="outlined">
              <InputLabel  htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                onChange={handleChange("password")}
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword
                          ? "hide the password"
                          : "display the password"
                      }
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
                
            <Button
            onClick={handleLogin}
              sx={{
                color: "white",
                backgroundColor: "#02468D",
                fontFamily: "Poppins, sans-serif",
                padding: "10px 20px", // Adjusted padding for better button sizing
                marginTop: "15px", // Add spacing between the password field and the button
                width: "40%",
              }}
            >
              Login
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
