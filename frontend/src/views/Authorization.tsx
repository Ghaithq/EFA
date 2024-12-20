import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ToolBar from "../components/Toolbar";
import { Card, CardMedia, CardContent, CardActions, Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

function Authorize() {
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    // Fetch users from the database
    axios.get("http://localhost:3000/get-all-users")
      .then((response) => {
        setUsersList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const promoteToManager = async (username) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/admin/authorize",
        { username },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      alert(response.data.message);
      setUsersList((prevUsers) =>
        prevUsers.map((user) =>
          user.username === username ? { ...user, role: "Manager" } : user
        )
      );
    } catch (error) {
      console.error("Error promoting user:", error);
      alert("Failed to promote user.");
    }
  };
  
  const removeUser = async (username) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/admin/remove-user",
        { username },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      alert(response.data.message);
      setUsersList((prevUsers) =>
        prevUsers.filter((user) => user.username !== username)
      );
    } catch (error) {
      console.error("Error removing user:", error);
      alert("Failed to remove user.");
    }
  };
  

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
        overflowX: "hidden",
      }}
    >
      <AppBar position="static" sx={{ backgroundColor: "#FFFFFF" }}>
        <ToolBar />
      </AppBar>
      <Typography
        variant="h4"
        sx={{
          color: "black",
          textAlign: "center",
          fontFamily: "Poppins, sans-serif",
          mt: 2,
          fontWeight: "bold",
        }}
      >
        Users
      </Typography>
      <Grid
        container
        spacing={3}
        sx={{ width: "95vw", margin: "0 auto", mt: 2 }}
      >
        {usersList.map((user) => {
          let selectedImage = "";

          if (user.gender === "Female") {
            const randomIndex = Math.floor(Math.random() * 3) + 1;
            selectedImage = `girl${randomIndex}.png`;
          } else if (user.gender === "Male") {
            const randomIndex = Math.floor(Math.random() * 3) + 1;
            selectedImage = `boy${randomIndex}.png`;
          }

          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={user.username}>
              <Card sx={{ mb: 2 }}>
                <CardMedia
                  component="img"
                  image={selectedImage}
                  alt={`${user.firstName} ${user.lastName}`}
                  sx={{ height: 140 }}
                />
                <CardContent>
                  <Typography variant="h6">{`${user.firstName} ${user.lastName}`}</Typography>
                  <Typography variant="body2">{`City: ${user.city}`}</Typography>
                  <Typography variant="body2">{`Email: ${user.email}`}</Typography>
                  <Typography variant="body2">{`Role: ${user.role}`}</Typography>
                </CardContent>
                <CardActions>
                  {user.role === "Fan" && (
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => promoteToManager(user.username)}
                    >
                      Make Manager
                    </Button>
                  )}
                  <Button
                    size="small"
                    color="secondary"
                    onClick={() => removeUser(user.username)}
                  >
                    Remove
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

export default Authorize;
