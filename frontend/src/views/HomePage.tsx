// import { useState } from 'react'
// import * as React from 'react';
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid2";
import ToolBar from "../components/Toolbar";
import CardCustom from "../components/Card";

function HomePage() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
      }}
    >
      <AppBar position="static" sx={{ backgroundColor: "#FFFFFF" }}>
        <ToolBar />
      </AppBar>
      <CardCustom
        sx={{ width: "95vw", margin: "0 auto", mt: 2 }}
        image="../Cairo_Stadium-modified.jpg"
        text1="Welcome to Egyptian Premier League Website"
        text2="Here you can reserve your ticket for the next match"
        link=""
      />
      <Grid
        container
        spacing={2}
        sx={{ width: "95vw", margin: "0 auto", mt: 2 }}
      >
        {/* Card 1 */}
        <Grid size="grow">
          <CardCustom
            sx={{ mb: 2 }}
            image="../football2-modified.jpg"
            text1="Teams"
            text2="Check out the teams in the league"
            link=""
          />
        </Grid>

        {/* Card 2 */}
        <Grid size="grow">
          <CardCustom
            sx={{ mb: 2 }}
            image="../stad2-modified.jpg"
            text1="Stadiums"
            text2="Check out the stadiums in Egypt"
            link="/stadiums"
          />
        </Grid>

        {/* Card 3 */}
        <Grid size="grow">
          <CardCustom
            sx={{ mb: 2 }}
            image="../tickets-modified.jpg"
            text1="Tickets"
            text2="Reserve your ticket for the next match"
            link=""
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default HomePage;
