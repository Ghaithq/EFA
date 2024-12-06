import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";

interface UserCardCardProps {
  sx?: any;
  image: string;
  text1: string;
  text2?: string;
  link: string;
}

function UserCard({ sx, image, text1, text2, link }: UserCardCardProps) {
  const cardHeight = window.innerHeight * (40 / 100);
  const imageHeight = cardHeight * 0.7;
  sx = { ...sx, height: cardHeight };

  return (
    <Link to={link} style={{ textDecoration: "none" }}>
      <Card sx={sx}>
        <CardMedia sx={{ height: imageHeight }} image={image} />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            {text1}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              textAlign: "center",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            {text2}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            padding: "0",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 3,
              marginBottom: 3,
            }}
          >
            <Button
              sx={{
                color: "white",
                backgroundColor: "#02468D",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              Authorize
            </Button>
            <Button
              sx={{
                color: "white",
                backgroundColor: "#02468D",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              Remove
            </Button>
          </Box>
        </CardActions>
      </Card>
    </Link>
  );
}

export default UserCard;
