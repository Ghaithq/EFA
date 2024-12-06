// import React, { useState } from "react";
// import AppBar from "@mui/material/AppBar";
// import ToolBar from "../components/Toolbar";
// import Footer from "../components/Footer";
// import { Box, Grid, Typography, Card, CardContent, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
// import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
// import "./MatchesView.css";

// const matches = [
//   {
//     id: 1,
//     team1: "Al Ahly",
//     team2: "Zamalek",
//     date: "2024-12-10",
//     time: "18:00",
//     stadium: "Cairo International Stadium",
//     team1Logo: "/logo.png",
//     team2Logo: "/logo.png",
//   },
//   {
//     id: 2,
//     team1: "Pyramids FC",
//     team2: "Ismaily",
//     date: "2024-12-12",
//     time: "20:00",
//     stadium: "Borg El Arab Stadium",
//     team1Logo: "/logo.png",
//     team2Logo: "/logo.png",
//   },
// ];

// const MatchesView: React.FC = () => {
//   const [open, setOpen] = useState(false);
//   const [newMatch, setNewMatch] = useState({
//     team1: "",
//     team2: "",
//     date: "",
//     time: "",
//     stadium: "",
//     team1Logo: "",
//     team2Logo: "",
//   });

//   const handleClickOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setNewMatch((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleAddMatch = () => {
//     // For now, just log the new match data
//     console.log("New Match Added:", newMatch);
//     // Here you can add the logic to update the `matches` state or send the data to an API
//     handleClose();
//   };

//   return (
//     <Box sx={{ width: "100vw" }}>
//       {/* Header */}
//       <AppBar position="static" color="default" className="app-bar">
//         <ToolBar />
//       </AppBar>

//       {/* Title Section */}
//       <Box className="title-section">
//         <SportsSoccerIcon className="soccer-icon" />
//         <Typography variant="h2" className="title-text">
//           Upcoming Matches
//         </Typography>
//       </Box>

//       {/* Matches Grid */}
//       <Grid container spacing={4} justifyContent="center">
//         {matches.map((match) => (
//           <Grid item xs={12} sm={6} md={4} key={match.id}>
//             <Card className="match-card">
//               {/* Team 1 Logo */}
//               <img
//                 src={match.team1Logo}
//                 alt={match.team1}
//                 className="team-logo"
//               />
//               <CardContent>
//                 <Typography variant="h5" className="team-name">
//                   {match.team1} vs {match.team2}
//                 </Typography>
//                 <Typography variant="body2" className="match-details">
//                   {match.date} at {match.time}
//                 </Typography>
//                 <Typography variant="body2" className="stadium-name">
//                   {match.stadium}
//                 </Typography>
//                 <div className="reserve-button-container">
//                   <Button
//                     variant="contained"
//                     className="reserve-button"
//                     onClick={() => alert(`You reserved a ticket for match ID: ${match.id}`)}
//                   >
//                     Reserve Ticket
//                   </Button>
//                 </div>
//               </CardContent>
//               {/* Team 2 Logo */}
//               <img
//                 src={match.team2Logo}
//                 alt={match.team2}
//                 className="team-logo"
//               />
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       {/* Add New Match Button */}
//       <Box className="add-match-button-container">
//         <Button variant="contained" className="add-match-button" onClick={handleClickOpen}>
//           Add New Match
//         </Button>
//       </Box>

//       {/* Add Match Dialog */}
//       <Dialog open={open} onClose={handleClose} className="add-match-dialog">
//         <DialogTitle>Add New Match</DialogTitle>
//         <DialogContent>
//           <TextField
//             label="Team 1"
//             fullWidth
//             margin="normal"
//             name="team1"
//             value={newMatch.team1}
//             onChange={handleInputChange}
//             variant="outlined"
//           />
//           <TextField
//             label="Team 2"
//             fullWidth
//             margin="normal"
//             name="team2"
//             value={newMatch.team2}
//             onChange={handleInputChange}
//             variant="outlined"
//           />
//           <TextField
//             label="Date"
//             fullWidth
//             margin="normal"
//             name="date"
//             type="date"
//             value={newMatch.date}
//             onChange={handleInputChange}
//             variant="outlined"
//             InputLabelProps={{
//               shrink: true,
//             }}
//           />
//           <TextField
//             label="Time"
//             fullWidth
//             margin="normal"
//             name="time"
//             type="time"
//             value={newMatch.time}
//             onChange={handleInputChange}
//             variant="outlined"
//             InputLabelProps={{
//               shrink: true,
//             }}
//           />
//           <TextField
//             label="Stadium"
//             fullWidth
//             margin="normal"
//             name="stadium"
//             value={newMatch.stadium}
//             onChange={handleInputChange}
//             variant="outlined"
//           />
//           <TextField
//             label="Team 1 Logo URL"
//             fullWidth
//             margin="normal"
//             name="team1Logo"
//             value={newMatch.team1Logo}
//             onChange={handleInputChange}
//             variant="outlined"
//           />
//           <TextField
//             label="Team 2 Logo URL"
//             fullWidth
//             margin="normal"
//             name="team2Logo"
//             value={newMatch.team2Logo}
//             onChange={handleInputChange}
//             variant="outlined"
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} color="secondary">
//             Cancel
//           </Button>
//           <Button onClick={handleAddMatch} color="primary">
//             Add Match
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Footer */}
//       <Footer />
//     </Box>
//   );
// };

// export default MatchesView;


import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import ToolBar from "../components/Toolbar";
import Footer from "../components/Footer";
import { Box, Grid, Typography, Card, CardContent, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import EditIcon from "@mui/icons-material/Edit";
import "./MatchesView.css";

const matches = [
  {
    id: 1,
    team1: "Al Ahly",
    team2: "Zamalek",
    date: "2024-12-10",
    time: "18:00",
    stadium: "Cairo International Stadium",
    team1Logo: "/logo.png",
    team2Logo: "/logo.png",
  },
  {
    id: 2,
    team1: "Pyramids FC",
    team2: "Ismaily",
    date: "2024-12-12",
    time: "20:00",
    stadium: "Borg El Arab Stadium",
    team1Logo: "/logo.png",
    team2Logo: "/logo.png",
  },
];

const MatchesView: React.FC = () => {
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [newMatch, setNewMatch] = useState({
    team1: "",
    team2: "",
    date: "",
    time: "",
    stadium: "",
    team1Logo: "",
    team2Logo: "",
  });
  const [editedMatch, setEditedMatch] = useState({
    id: 0,
    team1: "",
    team2: "",
    date: "",
    time: "",
    stadium: "",
    team1Logo: "",
    team2Logo: "",
  });

  const handleClickOpenAdd = () => setOpenAddDialog(true);
  const handleCloseAdd = () => setOpenAddDialog(false);

  const handleClickOpenEdit = (match: any) => {
    setEditedMatch(match);
    setOpenEditDialog(true);
  };
  const handleCloseEdit = () => setOpenEditDialog(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, // Broaden the event type
    form: "add" | "edit"
  ) => {
    const { name, value } = e.target;
    if (form === "add") {
      setNewMatch((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      setEditedMatch((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  

  const handleAddMatch = () => {
    console.log("New Match Added:", newMatch);
    handleCloseAdd();
  };

  const handleEditMatch = () => {
    console.log("Match Edited:", editedMatch);
    handleCloseEdit();
  };

  return (
    <Box sx={{ width: "100vw" }}>
      {/* Header */}
      <AppBar position="static" color="default" className="app-bar">
        <ToolBar />
      </AppBar>

      {/* Title Section */}
      <Box className="title-section">
        <SportsSoccerIcon className="soccer-icon" />
        <Typography variant="h2" className="title-text">
          Upcoming Matches
        </Typography>
      </Box>

      {/* Matches Grid */}
      <Grid container spacing={4} justifyContent="center">
        {matches.map((match) => (
          <Grid item xs={12} sm={6} md={4} key={match.id}>
            <Card className="match-card">
              {/* Edit Button */}
              <IconButton
                className="edit-button"
                onClick={() => handleClickOpenEdit(match)}
              >
                <EditIcon />
              </IconButton>

              {/* Team 1 Logo */}
              <img src={match.team1Logo} alt={match.team1} className="team-logo" />
              <CardContent>
                <Typography variant="h5" className="team-name">
                  {match.team1} vs {match.team2}
                </Typography>
                <Typography variant="body2" className="match-details">
                  {match.date} at {match.time}
                </Typography>
                <Typography variant="body2" className="stadium-name">
                  {match.stadium}
                </Typography>
                <div className="reserve-button-container">
                  <Button
                    variant="contained"
                    className="reserve-button"
                    onClick={() => alert(`You reserved a ticket for match ID: ${match.id}`)}
                  >
                    Reserve Ticket
                  </Button>
                </div>
              </CardContent>
              {/* Team 2 Logo */}
              <img src={match.team2Logo} alt={match.team2} className="team-logo" />
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Add New Match Button */}
      <Box className="add-match-button-container">
        <Button variant="contained" className="add-match-button" onClick={handleClickOpenAdd}>
          Add New Match
        </Button>
      </Box>

      {/* Add Match Dialog */}
      <Dialog open={openAddDialog} onClose={handleCloseAdd} className="add-match-dialog">
        <DialogTitle>Add New Match</DialogTitle>
        <DialogContent>
          <TextField
            label="Team 1"
            fullWidth
            margin="normal"
            name="team1"
            value={newMatch.team1}
            onChange={(e) => handleInputChange(e, "add")}
            variant="outlined"
          />
          <TextField
            label="Team 2"
            fullWidth
            margin="normal"
            name="team2"
            value={newMatch.team2}
            onChange={(e) => handleInputChange(e, "add")}
            variant="outlined"
          />
          <TextField
            label="Date"
            fullWidth
            margin="normal"
            name="date"
            type="date"
            value={newMatch.date}
            onChange={(e) => handleInputChange(e, "add")}
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Time"
            fullWidth
            margin="normal"
            name="time"
            type="time"
            value={newMatch.time}
            onChange={(e) => handleInputChange(e, "add")}
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Stadium"
            fullWidth
            margin="normal"
            name="stadium"
            value={newMatch.stadium}
            onChange={(e) => handleInputChange(e, "add")}
            variant="outlined"
          />
          <TextField
            label="Team 1 Logo URL"
            fullWidth
            margin="normal"
            name="team1Logo"
            value={newMatch.team1Logo}
            onChange={(e) => handleInputChange(e, "add")}
            variant="outlined"
          />
          <TextField
            label="Team 2 Logo URL"
            fullWidth
            margin="normal"
            name="team2Logo"
            value={newMatch.team2Logo}
            onChange={(e) => handleInputChange(e, "add")}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAdd} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddMatch} color="primary">
            Add Match
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Match Dialog */}
      <Dialog open={openEditDialog} onClose={handleCloseEdit} className="edit-match-dialog">
        <DialogTitle>Edit Match</DialogTitle>
        <DialogContent>
          <TextField
            label="Team 1"
            fullWidth
            margin="normal"
            name="team1"
            value={editedMatch.team1}
            onChange={(e) => handleInputChange(e, "edit")}
            variant="outlined"
          />
          <TextField
            label="Team 2"
            fullWidth
            margin="normal"
            name="team2"
            value={editedMatch.team2}
            onChange={(e) => handleInputChange(e, "edit")}
            variant="outlined"
          />
          <TextField
            label="Date"
            fullWidth
            margin="normal"
            name="date"
            type="date"
            value={editedMatch.date}
            onChange={(e) => handleInputChange(e, "edit")}
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Time"
            fullWidth
            margin="normal"
            name="time"
            type="time"
            value={editedMatch.time}
            onChange={(e) => handleInputChange(e, "edit")}
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Stadium"
            fullWidth
            margin="normal"
            name="stadium"
            value={editedMatch.stadium}
            onChange={(e) => handleInputChange(e, "edit")}
            variant="outlined"
          />
          <TextField
            label="Team 1 Logo URL"
            fullWidth
            margin="normal"
            name="team1Logo"
            value={editedMatch.team1Logo}
            onChange={(e) => handleInputChange(e, "edit")}
            variant="outlined"
          />
          <TextField
            label="Team 2 Logo URL"
            fullWidth
            margin="normal"
            name="team2Logo"
            value={editedMatch.team2Logo}
            onChange={(e) => handleInputChange(e, "edit")}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit} color="secondary">
            Cancel
          </Button>
          <Button autoFocus onClick={handleEditMatch} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default MatchesView;
