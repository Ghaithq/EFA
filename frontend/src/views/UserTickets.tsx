import { useState } from 'react';
import AppBar from "@mui/material/AppBar";
import ToolBar from "../components/Toolbar";
import Footer from "../components/Footer";
import { Box, Grid, Typography, Card, CardContent, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber'; // Correct icon
import './UserTickets.css';

const ticketsData = [
  { id: 1, stadiumName: 'Cairo International Stadium', event: 'Football Match - Cairo vs Alexandria', date: '2024-12-10', status: 'Booked' },
  { id: 2, stadiumName: 'Borg El Arab Stadium', event: 'Football Match - Cairo vs Giza', date: '2024-12-15', status: 'Booked' },
  { id: 3, stadiumName: 'Al Ahly Stadium', event: 'Football Match - Al Ahly vs Zamalek', date: '2024-12-20', status: 'Booked' },
];

const TicketPage = () => {
  const [tickets, setTickets] = useState(ticketsData);
  const [open, setOpen] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);

  // Handle opening the cancel confirmation dialog
  const handleClickOpen = (ticketId: number) => {
    setSelectedTicketId(ticketId);
    setOpen(true);
  };

  // Handle closing the cancel confirmation dialog
  const handleClose = () => {
    setOpen(false);
    setSelectedTicketId(null);
  };

  // Handle canceling the ticket
  const handleCancelTicket = () => {
    if (selectedTicketId !== null) {
      setTickets(tickets.filter(ticket => ticket.id !== selectedTicketId));
      setOpen(false);
    }
  };

  return (
    <Box sx={{ width: "100vw" }}>
      <AppBar position="static" color="default" className="app-bar">
        <ToolBar />
      </AppBar>

      <Box className="title-section">
        <ConfirmationNumberIcon className="ticket-icon bouncing-icon" /> {/* Add the bouncing animation */}
        <Typography variant="h2" className="title-text">
          My Tickets
        </Typography>
      </Box>

      <Grid container spacing={4} justifyContent="center">
        {tickets.map((ticket) => (
          <Grid item xs={12} sm={6} md={4} key={ticket.id}>
            <Card className="ticket-card">
              <CardContent>
                <Typography variant="h5" className="ticket-title">
                  {ticket.event}
                </Typography>
                <Typography variant="body1" className="ticket-details">
                  Stadium: {ticket.stadiumName}
                </Typography>
                <Typography variant="body2" className="ticket-details">
                  Date: {ticket.date}
                </Typography>
                <Typography variant="body2" className="ticket-status">
                  Status: {ticket.status}
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleClickOpen(ticket.id)}
                  className="cancel-ticket-button"
                >
                  Cancel Ticket
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Footer />

      {/* Cancel Ticket Confirmation Dialog */}
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
