// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
// import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import Grid from "@mui/material/Grid2";

function ToolBar(){
    return (<Toolbar>
          <IconButton
            size="small"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: -2, ml: -5 }}
          >
            <img
              src="../../logo.png"
              alt="logo"
              style={{ width: 200, height: 100 }}
            />
          </IconButton>
          <Typography
            variant="h4"
            component="div"
            sx={{
              fontFamily: "Poppins, sans-serif",
              flexGrow: 1,
              fontWeight: "bold",
              color: "black",
            }}
          >
            Egyptian Premier League
          </Typography>
          <Button sx={{ color: "white", backgroundColor: "#02468D", mr: 1,fontFamily: "Poppins, sans-serif" }}>
            Login
          </Button>
          <Button sx={{ color: "white", backgroundColor: "#02468D",fontFamily: "Poppins, sans-serif" }}>
            Register
          </Button>
        </Toolbar>);
}

export default ToolBar;
