import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";

interface CardCustomProps {
  sx?: any;
  image: string;
  text1: string;
  text2?: string;
}

function CardCustom({ sx, image, text1, text2 }: CardCustomProps) {
  const cardHeight = window.innerHeight * (40 / 100);
  const imageHeight = cardHeight * 0.7;
  sx = { ...sx, height: cardHeight };
  return (
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
      <CardActions>
        {/* <Button size="small">Share</Button>
          <Button size="small">Learn More</Button> */}
      </CardActions>
    </Card>
  );
}

export default CardCustom;
