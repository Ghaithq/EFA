import { useEffect, useState } from 'react';
import axios from 'axios'; // For API calls
import AppBar from "@mui/material/AppBar";
import ToolBar from "../components/Toolbar";
import {jwtDecode} from 'jwt-decode';
import Footer from "../components/Footer";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber'; // Correct icon
import './UserTickets.css';

const TicketPage = () => {
  const [tickets, setTickets] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  // Fetch user tickets on component mount
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get('http://localhost:3000/get-tickets-for-user', {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        });
        setTickets(response.data);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    fetchTickets();
  }, []);

  // Handle opening the cancel confirmation dialog
  const handleClickOpen = (ticket) => {
    setSelectedTicket(ticket);
    setOpen(true);
  };

  // Handle closing the cancel confirmation dialog
  const handleClose = () => {
    setOpen(false);
    setSelectedTicket(null);
  };

  const getUsername = () => {
    const token = localStorage.getItem("jwt");
    if (token) {
      const decoded = jwtDecode(token);
      return decoded.username; // Adjust based on your JWT payload
    }
    return null;
  };

  // Handle canceling the ticket
  const handleCancelTicket = async () => {
    if (selectedTicket) {
      try {
        const { row, col, matchid } = selectedTicket;
        await axios.delete('http://localhost:3000/cancel-ticket', {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
          data: {
            row,
            col,
            matchid,
            username: getUsername(),
          },
        });

        setTickets(tickets.filter(ticket => ticket.row !== row || ticket.col !== col || ticket.matchid !== matchid));
        setOpen(false);
      } catch (error) {
        console.error("Error canceling ticket:", error);
      }
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        width: '100vw',
      }}
    >
      {/* AppBar - Keeping the styles unchanged */}
      <AppBar position="static" color="default" className="app-bar">
        <ToolBar />
      </AppBar>

      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          padding: 4,
          width: '100%',
        }}
      >
        <Box className="title-section" sx={{ mb: 4, textAlign: 'center' }}>
          <ConfirmationNumberIcon className="ticket-icon bouncing-icon" />
          <Typography variant="h2" className="title-text">
            My Tickets
          </Typography>
        </Box>

        {/* Tickets Grid */}
        <Grid container spacing={4} justifyContent="center">
          {tickets.map((ticket) => (
            <Grid item xs={12} sm={6} md={4} key={`${ticket.row}-${ticket.col}-${ticket.matchid}`}>
              <Card className="ticket-card">
                <CardContent>
                  <Typography variant="h5" className="ticket-title">
                    Match: {ticket.match.name}
                  </Typography>
                  <Typography variant="body1" className="ticket-details">
                    Stadium: {ticket.match.stadium.name}
                  </Typography>
                  <Typography variant="body2" className="ticket-details">
                    Date: {ticket.match.date}
                  </Typography>
                  <Typography variant="body2" className="ticket-status">
                    Row: {ticket.row}, Col: {ticket.col}
                  </Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleClickOpen(ticket)}
                    className="cancel-ticket-button"
                  >
                    Cancel Ticket
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Footer */}
      <Footer />

      {/* Cancel Ticket Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Cancel Ticket</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to cancel this ticket? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            No, Keep Ticket
          </Button>
          <Button onClick={handleCancelTicket} color="primary">
            Yes, Cancel Ticket
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TicketPage;
