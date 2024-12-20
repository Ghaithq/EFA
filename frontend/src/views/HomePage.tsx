import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ToolBar from "../components/Toolbar";
import CardCustom from "../components/Card";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkUserRole = () => {
      const token = localStorage.getItem("jwt");
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          if (decodedToken?.role === "Fan") {
            setIsLoggedIn(true);
          }
        } catch (error) {
          console.error("Error decoding token:", error);
        }
      }
    };

    checkUserRole();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
      }}
    >
      {/* App Bar */}
      <AppBar position="static" sx={{ backgroundColor: "#FFFFFF" }}>
        <ToolBar />
      </AppBar>

      {/* Main Welcome Card */}
      <CardCustom
        sx={{ width: "95vw", margin: "0 auto", mt: 2 }}
        image="../Cairo_Stadium-modified.jpg"
        text1="Welcome to The Egyptian Premier League Website"
        text2="Here you can reserve your ticket for the next match"
        link=""
      />

      {/* Grid of Cards */}
      <Grid
        container
        spacing={2}
        sx={{ width: "95vw", margin: "0 auto", mt: 2 }}
      >
        {/* Matches Card */}
        <Grid item xs={12} sm={4}>
          <CardCustom
            sx={{ mb: 2 }}
            image="../football2-modified.jpg"
            text1="Matches"
            text2="Check out the matches in the league"
            link="/matches"
          />
        </Grid>

        {/* Stadiums Card */}
        <Grid item xs={12} sm={4}>
          <CardCustom
            sx={{ mb: 2 }}
            image="../stad2-modified.jpg"
            text1="Stadiums"
            text2="Check out the stadiums in Egypt"
            link="/stadiums"
          />
        </Grid>

        {/* Tickets Card (Visible Only for Logged-In Users) */}
        {isLoggedIn && (
          <Grid item xs={12} sm={4}>
            <CardCustom
              sx={{ mb: 2 }}
              image="../tickets-modified.jpg"
              text1="Tickets"
              text2="Reserve your ticket for the next match"
              link="/tickets"
            />
          </Grid>
        )}
      </Grid>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default HomePage;
