import { useState } from 'react';
import AppBar from "@mui/material/AppBar";
import ToolBar from "../components/Toolbar";
import Footer from "../components/Footer";
import { Box, Grid, Typography, Card, CardMedia, CardContent, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import './StadiumsView.css';

const StadiumsView = () => {
  const [stadiums, setStadiums] = useState([
    { id: 1, img: 'https://i.pinimg.com/originals/61/28/03/61280310accff08308966f1a21c1d849.jpg', name: 'Cairo International Stadium' },
    { id: 2, img: 'https://i.pinimg.com/originals/61/28/03/61280310accff08308966f1a21c1d849.jpg', name: 'Borg El Arab Stadium' },
    { id: 3, img: 'https://i.pinimg.com/originals/61/28/03/61280310accff08308966f1a21c1d849.jpg', name: 'Al Ahly Stadium' },
    { id: 4, img: 'https://i.pinimg.com/originals/61/28/03/61280310accff08308966f1a21c1d849.jpg', name: 'Petro Sport Stadium' },
    { id: 5, img: 'https://i.pinimg.com/originals/61/28/03/61280310accff08308966f1a21c1d849.jpg', name: 'Suez Stadium' },
    { id: 6, img: 'https://i.pinimg.com/originals/61/28/03/61280310accff08308966f1a21c1d849.jpg', name: 'Ismailia Stadium' },
  ]);

  const [open, setOpen] = useState(false);
  const [newStadium, setNewStadium] = useState({ name: '', img: '' });

  // Function to open the dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Function to close the dialog
  const handleClose = () => {
    setOpen(false);
  };

  // Function to add a new stadium
  const handleAddStadium = () => {
    const newStadiumObj = {
      id: stadiums.length + 1, // Ensure the id is unique
      name: newStadium.name,
      img: newStadium.img,
    };

    // Update the state immutably using the setState function
    setStadiums((prevStadiums) => [...prevStadiums, newStadiumObj]); // Add the new stadium to the existing list

    setOpen(false); // Close the dialog
    setNewStadium({ name: '', img: '' }); // Reset the form
  };

  return (
    <Box sx={{ width: "100vw" }}>
      <AppBar position="static" color="default" className="app-bar">
        <ToolBar />
      </AppBar>

      {/* Add Stadium Button */}
      <Button
        variant="contained"
        color="primary"
        className="add-stadium-button"
        onClick={handleClickOpen}
      >
        Add New Stadium
      </Button>

      {/* Title Section */}
      <Box className="title-section">
        <SportsSoccerIcon className="soccer-icon" />
        <Typography variant="h2" className="title-text">
          Stadiums
        </Typography>
      </Box>

      <Grid container spacing={4} justifyContent="center">
        {stadiums.map((stadium) => {
          return (
            <Grid item xs={12} sm={6} md={4} key={stadium.id}>
              <Card
                className="stadium-card"
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={stadium.img}
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
          );
        })}
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
