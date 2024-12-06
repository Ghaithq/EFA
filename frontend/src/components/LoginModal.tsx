import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import TextField from "@mui/material/TextField";

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

  return (
    <div>
      <Button
        onClick={handleOpen}
        sx={{
          color: "white",
          backgroundColor: "#02468D",
          fontFamily: "Poppins, sans-serif",
          right: 7,
        }}
      >
        Login
      </Button>
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
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
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
