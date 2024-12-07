import * as React from "react";
import { useState } from "react";
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
import AccountBoxIcon from '@mui/icons-material/AccountBox';
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


export default function Logout() {
    const [open, setOpen] = React.useState(false);

    const handleLogout=()=>{
        console.log(localStorage.getItem('jwt'))
        localStorage.removeItem("jwt");
        window.location.reload();
    }
    // const [selectedDate, setSelectedDate] = React.useState(null);
  
    // const handleChange = (date: Date | null) => {
    //   setSelectedDate(date);
    // };
  
  
    return (
      <div>
        {(localStorage.getItem('jwt')!=null) &&
        <Button
          onClick={handleLogout}
          sx={{
            color: "white",
            backgroundColor: "#02468D",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          Log out
        </Button>}
        
      </div>
    );
  }
  