import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import ToolBar from "../components/Toolbar";
import Footer from "../components/Footer";
import { jwtDecode } from "jwt-decode";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import "./MatchesView.css";

const MatchesView: React.FC = () => {
  const [teams, setTeams] = useState<string[]>([]);
  const [stadiums, setStadiums] = useState<string[]>([]);
  const [referees, setReferees] = useState<string[]>([]);
  const [linesmen, setLinesmen] = useState<string[]>([]);
  const [matches, setMatches] = useState<(typeof newMatch)[]>([]);
  const [isManager, setIsManager] = useState(false);


  useEffect(() => {
    const checkUserRole = () => {
      const token = localStorage.getItem("jwt");
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          console.log(decodedToken);
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


  useEffect(() => {
    const fetchData = async () => {
      try {
        const teamResponse = await axios.get("http://localhost:3000/get-all-teams/");
        const stadiumResponse = await axios.get("http://localhost:3000/get-all-stadiums/");
        const refResponse = await axios.get("http://localhost:3000/get-all-referees/");
        const linesMenResponse = await axios.get("http://localhost:3000/get-all-linesmen/");
        const matchesResponse = await axios.get("http://localhost:3000/get-all-matches");
        setTeams(teamResponse.data);
        setStadiums(stadiumResponse.data);
        setReferees(refResponse.data);
        setLinesmen(linesMenResponse.data);
        const transformedData = matchesResponse.data.map((match: any) => ({
          stadiumName: stadiumResponse.data.find((stadium) => stadium.id === match.stadiumid).name,
          refName: referees.find((referee) => referee.id === match.refereeid),
          linesMan1Name: linesmen.find((linesman) => linesman.id === match.linesMan1id),
          linesMan2Name: linesmen.find((linesman) => linesman.id === match.linesMan2id),
          homeTeamid: match.homeTeamid,
          awayTeamid: match.awayTeamid,
          stadiumid: match.stadiumid,
          date: match.date.split("T")[0],
          time: match.date.split("T")[1].slice(0, 5),
          refereeid: match.refereeid,
          linesMan1id: match.linesMan1id,
          linesMan2id: match.linesMan2id,
          team1Logo: match.homeTeam.logoUrl,
          team2Logo: match.awayTeam.logoUrl,
          team1Name: match.homeTeam.name,
          team2Name: match.awayTeam.name,
        }));

        setMatches(transformedData)

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [newMatch, setNewMatch] = useState({
    homeTeamid: "",
    awayTeamid: "",
    stadiumid: "",
    date: "",
    time: "",
    refereeid: "",
    linesMan1id: "",
    linesMan2id: "",
    team1Logo: "",
    team2Logo: "",
  });


  const [editedMatch, setEditedMatch] = useState({
    id: 0,
    homeTeamid: "",
    awayTeamid: "",
    stadiumid: "",
    date: "",
    time: "",
  });

  const handleClickOpenAdd = () => setOpenAddDialog(true);
  const handleCloseAdd = () => setOpenAddDialog(false);

  const handleClickOpenEdit = (match: any) => {
    setEditedMatch(match);
    setOpenEditDialog(true);
  };
  const handleCloseEdit = () => setOpenEditDialog(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    form: "add" | "edit"
  ) => {
    const { name, value } = e.target;

    if (form === "add") {
      setNewMatch((prevState) => {


        const updatedMatch = { ...prevState, [name]: name === "date" || name === "time" ? value.toString() : Number(value) };

        console.log(updatedMatch);

        if (name === "homeTeamid") {
          const selectedTeam = teams.find((team) => team.id === Number(value));
          updatedMatch.team1Logo = selectedTeam?.logoUrl || "";
        }
        if (name === "awayTeamid") {
          const selectedTeam = teams.find((team) => team.id === Number(value));
          updatedMatch.team2Logo = selectedTeam?.logoUrl || "";
        }

        return updatedMatch;
      });
    } else {
      setEditedMatch((prevState) => {
        const updatedMatch = { ...prevState, [name]: value };

        if (name === "team1") {
          const selectedTeam = teams.find((team) => team.name === value);
          updatedMatch.team1Logo = selectedTeam?.logoUrl || "";
        }
        if (name === "team2") {
          const selectedTeam = teams.find((team) => team.name === value);
          updatedMatch.team2Logo = selectedTeam?.logoUrl || "";
        }

        return updatedMatch;
      });
    }
  };


  const handleAddMatch = async () => {
    const combinedDateTime = `${newMatch.date}T${newMatch.time}:00.000Z`;
    console.log(combinedDateTime);

    try {
      const response = await axios.post(
        'http://localhost:3000/manager/create-match/',
        {
          ...newMatch,
          date: combinedDateTime,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );

      const serverResponse = response.data;

      setMatches((prevMatches) => [...prevMatches, newMatch]);


      console.log(serverResponse);

      setNewMatch({
        homeTeamid: "",
        awayTeamid: "",
        stadiumid: "",
        date: "",
        time: "",
        refereeid: "",
        linesMan1id: "",
        linesMan2id: "",
        team1Logo: "",
        team2Logo: "",
      });

      handleCloseAdd();
    } catch (error: any) {
      if (error.response) {
        // Server responded with a status code outside the 2xx range
        console.error("Server Error:", error.response.data.message || error.response.data);
      } else if (error.request) {
        // Request was made but no response received
        console.error("No response from server:", error.request);
      } else {
        // Something else went wrong
        console.error("Error during request setup:", error.message);
      }
    }
  };


  const handleEditMatch = async () => {
    try {
      await axios.put(`/api/matches/${editedMatch.id}`, editedMatch);
      setMatches((prevMatches) =>
        prevMatches.map((match) =>
          match.id === editedMatch.id ? editedMatch : match
        )
      ); // Update the match in the state
      handleCloseEdit();
    } catch (error) {
      console.error("Error editing match:", error);
    }
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
              {isManager &&
                <IconButton
                  className="edit-button"
                  onClick={() => handleClickOpenEdit(match)}
                >
                  <EditIcon />
                </IconButton>
              }

              {/* Team 1 Logo */}
              <img
                src={match.team1Logo}
                alt={match.team1}
                className="team-logo"
              />
              <CardContent>
                <Typography variant="h5" className="team-name">
                  {match.team1Name} vs {match.team2Name}
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
                    onClick={() =>
                      alert(`You reserved a ticket for match ID: ${match.id}`)
                    }
                  >
                    Reserve Ticket
                  </Button>
                </div>
              </CardContent>
              {/* Team 2 Logo */}
              <img
                src={match.team2Logo}
                alt={match.team2}
                className="team-logo"
              />
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Add New Match Button */}
      {isManager &&
        <Box className="add-match-button-container">
          <Button
            variant="contained"
            className="add-match-button"
            onClick={handleClickOpenAdd}
          >
            Add New Match
          </Button>
        </Box>
      }

      {/* Add Match Dialog */}
      <Dialog
        open={openAddDialog}
        onClose={handleCloseAdd}
        className="add-match-dialog"
      >
        <DialogTitle>Add New Match</DialogTitle>
        <DialogContent>
          <TextField
            select
            label="Team 1"
            fullWidth
            margin="normal"
            name="homeTeamid"
            // value={newMatch.homeTeamid || ""}
            onChange={(e) => handleInputChange(e, "add")}
            variant="outlined"
            SelectProps={{ native: true }}
            InputLabelProps={{ shrink: true }}
          >
            <option value="">-- Select Team 1 --</option>
            {teams.map((team) => (
              <option key={team.id} value={team.id} disabled={team.id === newMatch.awayTeamid}>
                {team.name}
              </option>
            ))}
          </TextField>

          <TextField
            select
            label="Team 2"
            fullWidth
            margin="normal"
            name="awayTeamid"
            // value={newMatch.awayTeamid || ""}
            onChange={(e) => handleInputChange(e, "add")}
            variant="outlined"
            SelectProps={{ native: true }}
            InputLabelProps={{ shrink: true }}
          >
            <option value="">-- Select Team 2 --</option>
            {teams.map((team) => (
              <option key={team.id} value={team.id} disabled={team.id === newMatch.homeTeamid}>
                {team.name}
              </option>
            ))}
          </TextField>

          <TextField
            select
            label="Stadium"
            fullWidth
            margin="normal"
            name="stadiumid"
            value={newMatch.stadiumid}
            onChange={(e) => handleInputChange(e, "add")}
            variant="outlined"
            SelectProps={{ native: true }}
            InputLabelProps={{
              shrink: true,
            }}
          >
            <option value="">-- Select Stadium --</option>
            {stadiums.map((stadium) => (
              <option key={stadium.id} value={stadium.id}>
                {stadium.name}
              </option>
            ))}
          </TextField>

          <TextField
            select
            label="Referee"
            fullWidth
            margin="normal"
            name="refereeid"
            value={newMatch.refereeid}
            onChange={(e) => handleInputChange(e, "add")}
            variant="outlined"
            SelectProps={{ native: true }}
            InputLabelProps={{
              shrink: true,
            }}
          >
            <option value="">-- Select Referee --</option>
            {referees.map((referee) => (
              <option key={referee.id} value={referee.id}>
                {referee.name}
              </option>
            ))}
          </TextField>

          <TextField
            select
            label="Linesman 1"
            fullWidth
            margin="normal"
            name="linesMan1id"
            value={newMatch.linesMan1id}
            onChange={(e) => handleInputChange(e, "add")}
            variant="outlined"
            SelectProps={{ native: true }}
            InputLabelProps={{
              shrink: true,
            }}
          >
            <option value="">-- Select Linesman 1 --</option>
            {linesmen.map((linesman) => (
              <option key={linesman.id} value={linesman.id}>
                {linesman.name}
              </option>
            ))}
          </TextField>

          <TextField
            select
            label="Linesman 2"
            fullWidth
            margin="normal"
            name="linesMan2id"
            value={newMatch.linesMan2id}
            onChange={(e) => handleInputChange(e, "add")}
            variant="outlined"
            SelectProps={{ native: true }}
            InputLabelProps={{
              shrink: true,
            }}
          >
            <option value="">-- Select Linesman 2 --</option>
            {linesmen.map((linesman) => (
              <option key={linesman.id} value={linesman.id}>
                {linesman.name}
              </option>
            ))}
          </TextField>

          <TextField
            label="Date"
            type="date"
            fullWidth
            margin="normal"
            name="date"
            // value={newMatch.date}
            onChange={(e) => handleInputChange(e, "add")}
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Time"
            type="time"
            fullWidth
            margin="normal"
            name="time"
            value={newMatch.time}
            onChange={(e) => handleInputChange(e, "add")}
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Team 1 Logo URL"
            fullWidth
            margin="normal"
            name="team1Logo"
            value={newMatch.team1Logo}
            variant="outlined"
            disabled
          />
          <TextField
            label="Team 2 Logo URL"
            fullWidth
            margin="normal"
            name="team2Logo"
            value={newMatch.team2Logo}
            variant="outlined"
            disabled
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
      <Dialog
        open={openEditDialog}
        onClose={handleCloseEdit}
        className="edit-match-dialog"
      >
        <DialogTitle>Edit Match</DialogTitle>
        <DialogContent>
          <TextField
            label="Team 1"
            fullWidth
            margin="normal"
            name="team1"
            value={editedMatch.team1Name}
            onChange={(e) => handleInputChange(e, "edit")}
            variant="outlined"
          />
          <TextField
            label="Team 2"
            fullWidth
            margin="normal"
            name="team2"
            value={editedMatch.team2Name}
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
            value={editedMatch.stadiumName}
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
