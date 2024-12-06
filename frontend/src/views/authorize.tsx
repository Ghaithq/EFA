import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ToolBar from "../components/Toolbar";
// import CardCustom from "../components/Card";
import UserCard from "../components/UserCard";

// username and gender
const usersList = [
  ["fares atef", "male"],
  ["mohamed", "male"],
  ["ahmed", "male"],
  ["nada", "female"],
  ["nour", "male"],
  ["menna", "female"],
  ["fares atef", "male"],
  ["mohamed", "male"],
  ["ahmed", "male"],
  ["nada", "female"],
  ["nour", "male"],
  ["menna", "female"],
];

function Authorize() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
        overflowX: "hidden"
      }}
    >
      <AppBar position="static" sx={{ backgroundColor: "#FFFFFF" }}>
        <ToolBar />
      </AppBar>
      <Typography
        variant="body2"
        sx={{
          color: "black",
          textAlign: "center",
          fontFamily: "Poppins, sans-serif",
          mt: 2,
          fontWeight: "bold",
          fontSize: "2.5rem",
        }}
      >
        Users
      </Typography>
      <Grid
        container
        spacing={2}
        sx={{ width: "95vw", margin: "0 auto", mt: 2 }}
      >
        {usersList.map((item) => {
          let selectedImage = "";

          if (item[1] === "female") {
            const randomIndex = Math.floor(Math.random() * 3) + 1;
            selectedImage = `../girl${randomIndex}.png`;
          } else if (item[1] === "male") {
            const randomIndex = Math.floor(Math.random() * 3) + 1;
            selectedImage = `../boy${randomIndex}.png`;
          }
          return (
            <Grid item xs={12} sm={2}>
              <UserCard
                sx={{ mb: 2 }}
                image={selectedImage}
                text1={item[0]}
                link="" 
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

export default Authorize;
