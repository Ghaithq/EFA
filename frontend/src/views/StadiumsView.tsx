import AppBar from "@mui/material/AppBar";
import ToolBar from "../components/Toolbar";
import Footer from "../components/Footer"
import './StadiumsView.css';

import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { useInView } from "react-intersection-observer";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";

const StadiumsView = () => {
  // Array of stadium images and their names
  const stadiums = [
    { id: 1, img: 'https://i.pinimg.com/originals/61/28/03/61280310accff08308966f1a21c1d849.jpg', name: 'Cairo International Stadium' },
    { id: 2, img: 'https://i.pinimg.com/originals/61/28/03/61280310accff08308966f1a21c1d849.jpg', name: 'Borg El Arab Stadium' },
    { id: 3, img: 'https://i.pinimg.com/originals/61/28/03/61280310accff08308966f1a21c1d849.jpg', name: 'Al Ahly Stadium' },
    { id: 4, img: 'https://i.pinimg.com/originals/61/28/03/61280310accff08308966f1a21c1d849.jpg', name: 'Petro Sport Stadium' },
    { id: 5, img: 'https://i.pinimg.com/originals/61/28/03/61280310accff08308966f1a21c1d849.jpg', name: 'Suez Stadium' },
    { id: 6, img: 'https://i.pinimg.com/originals/61/28/03/61280310accff08308966f1a21c1d849.jpg', name: 'Ismailia Stadium' },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Box
      sx={{
        width: "100vw",
      }}
    >
      <AppBar position="static" sx={{ backgroundColor: "#FFFFFF" }}>
        <ToolBar />
      </AppBar>

      {/* Title Section */}
      <Box className = "title-section"
      >
        <SportsSoccerIcon className = "soccer-icon"
        />
        <Typography className = "title-text"
          variant="h2"
        >
          Stadiums
        </Typography>


      </Box>

      {stadiums.map((stadium, index) => {
        const { ref } = useInView({
          threshold: 0.7, // Triggers when 70% of the item is visible
          onChange: (isInView) => {
            if (isInView) setActiveIndex(index);
          },
        });

        return (
          <Box className = "stadium-section"
            ref={ref}
            key={stadium.name}
            sx={{
              filter: activeIndex === index ? "blur(0px)" : "blur(8px)",
            }}
          >
            <img className = "stadium-image"
              src={stadium.img}
              alt={stadium.name}
            />
            <Typography className = "stadium-name"
              variant="h4"
            >
              {stadium.name}
            </Typography>
          </Box>
        );
      })}
      <Footer />
    </Box>
  );
};

export default StadiumsView;
