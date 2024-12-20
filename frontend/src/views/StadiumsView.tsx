import { useState, useEffect } from 'react';
import axios from 'axios';
import AppBar from "@mui/material/AppBar";
import ToolBar from "../components/Toolbar";
import Footer from "../components/Footer";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import {jwtDecode} from "jwt-decode";
import './StadiumsView.css';

const StadiumsView = () => {
  const [stadiums, setStadiums] = useState([]);
  const [open, setOpen] = useState(false);
  const [newStadium, setNewStadium] = useState({ name: '', rows: '', cols: '', img: '' });
  const [isManager, setIsManager] = useState(false);

  // Fetch stadiums from the database
  useEffect(() => {
    const fetchStadiums = async () => {
      try {
        const response = await axios.get('http://localhost:3000/get-all-stadiums');
        setStadiums(response.data);
      } catch (error) {
        console.error("Error fetching stadiums:", error);
      }
    };

    fetchStadiums();
  }, []);

  // Check if the user is a manager
  useEffect(() => {
    const checkUserRole = () => {
      const token = localStorage.getItem("jwt");
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          if (decodedToken.role === "Manager") {
            setIsManager(true);
          }
        } catch (error) {
          console.error("Error decoding token:", error);
        }
      }
    };

    checkUserRole();
  }, []);

  // Function to open the dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Function to close the dialog
  const handleClose = () => {
    setOpen(false);
  };

  // Function to add a new stadium
  const handleAddStadium = async () => {
    const rows = Math.min(Math.max(parseInt(newStadium.rows, 10) || 0, 0), 99);
    const cols = Math.min(Math.max(parseInt(newStadium.cols, 10) || 0, 0), 99);

    const newStadiumObj = {
      name: newStadium.name,
      rows,
      cols,
      imageURL: newStadium.img,
    };

    try {
      const response = await axios.post('http://localhost:3000/manager/add-stadium', newStadiumObj, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });

      setStadiums((prevStadiums) => [...prevStadiums, response.data]);
      setOpen(false); // Close the dialog
      setNewStadium({ name: '', rows: '', cols: '', img: '' }); // Reset the form
    } catch (error) {
      console.error("Error adding stadium:", error);
    }
  };

  return (
    <Box sx={{ width: "100vw" }}>
      <AppBar position="static" color="default" className="app-bar">
        <ToolBar />
      </AppBar>

      {/* Add Stadium Button (Only visible to Managers) */}
      {isManager && (
        <Button
          variant="contained"
          color="primary"
          className="add-stadium-button"
          onClick={handleClickOpen}
        >
          Add New Stadium
        </Button>
      )}

      {/* Title Section */}
      <Box className="title-section">
        <SportsSoccerIcon className="soccer-icon" />
        <Typography variant="h2" className="title-text">
          Stadiums
        </Typography>
      </Box>

      <Grid container spacing={4} justifyContent="center">
        {stadiums.map((stadium) => (
          <Grid item xs={12} sm={6} md={4} key={stadium.id}>
            <Card className="stadium-card">
              <CardMedia
                component="img"
                height="200"
                image={stadium.imageURL}
                alt={stadium.name}
                className="stadium-image"
              />
              <CardContent>
                <Typography variant="h5" className="stadium-name">
                  {stadium.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Footer />

      {/* Dialog for Adding New Stadium */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Stadium</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Stadium Name"
            type="text"
            fullWidth
            value={newStadium.name}
            onChange={(e) => setNewStadium({ ...newStadium, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Rows"
            type="number"
            fullWidth
            value={newStadium.rows}
            onChange={(e) => setNewStadium({ ...newStadium, rows: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Columns"
            type="number"
            fullWidth
            value={newStadium.cols}
            onChange={(e) => setNewStadium({ ...newStadium, cols: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Image URL"
            type="text"
            fullWidth
            value={newStadium.img}
            onChange={(e) => setNewStadium({ ...newStadium, img: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddStadium} color="primary">
            Add Stadium
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StadiumsView;
