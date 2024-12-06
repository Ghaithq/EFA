// import AppBar from "@mui/material/AppBar";
// import ToolBar from "../components/Toolbar";
// import Footer from "../components/Footer"
// import './StadiumsView.css';

// import { useState } from "react";
// import { Box, Grid2, Typography } from "@mui/material";
// import { useInView } from "react-intersection-observer";
// import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";

// const StadiumsView = () => {
//   // Array of stadium images and their names
//   const stadiums = [
//     { id: 1, img: 'https://i.pinimg.com/originals/61/28/03/61280310accff08308966f1a21c1d849.jpg', name: 'Cairo International Stadium' },
//     { id: 2, img: 'https://i.pinimg.com/originals/61/28/03/61280310accff08308966f1a21c1d849.jpg', name: 'Borg El Arab Stadium' },
//     { id: 3, img: 'https://i.pinimg.com/originals/61/28/03/61280310accff08308966f1a21c1d849.jpg', name: 'Al Ahly Stadium' },
//     { id: 4, img: 'https://i.pinimg.com/originals/61/28/03/61280310accff08308966f1a21c1d849.jpg', name: 'Petro Sport Stadium' },
//     { id: 5, img: 'https://i.pinimg.com/originals/61/28/03/61280310accff08308966f1a21c1d849.jpg', name: 'Suez Stadium' },
//     { id: 6, img: 'https://i.pinimg.com/originals/61/28/03/61280310accff08308966f1a21c1d849.jpg', name: 'Ismailia Stadium' },
//   ];

//   const [activeIndex, setActiveIndex] = useState(0);

//   return (
//     <Box
//       sx={{
//         width: "100vw",
//       }}
//     >
//       <AppBar position="static" sx={{ backgroundColor: "#FFFFFF" }}>
//         <ToolBar />
//       </AppBar>

//       {/* Title Section */}
//       <Box className = "title-section"
//       >
//         <SportsSoccerIcon className = "soccer-icon"
//         />
//         <Typography className = "title-text"
//           variant="h2"
//         >
//           Stadiums
//         </Typography>

//       </Box>

//       <Grid2 container spacing={4} justifyContent="center">
//         {stadiums.map((stadium, index) => {
//           const { ref } = useInView({
//             threshold: 0.7, // Triggers when 70% of the item is visible
//             onChange: (isInView) => {
//               if (isInView) setActiveIndex(index);
//             },
//           });

//           return (
//             <Box className = "stadium-section"
//               ref={ref}
//               key={stadium.name}
//               sx={{
//                 filter: activeIndex === index ? "blur(0px)" : "blur(8px)",
//               }}
//             >
//               <img className = "stadium-image"
//                 src={stadium.img}
//                 alt={stadium.name}
//               />
//               <Typography className = "stadium-name"
//                 variant="h4"
//               >
//                 {stadium.name}
//               </Typography>
//             </Box>
//           );
//         })}
//       <Footer />
//       </Grid2>
//     </Box>
//   );
// };

// export default StadiumsView;



import { useState } from 'react';
import AppBar from "@mui/material/AppBar";
import ToolBar from "../components/Toolbar";
import Footer from "../components/Footer";
import { Box, Grid, Typography, Card, CardMedia, CardContent } from "@mui/material";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import { useInView } from "react-intersection-observer";
import './StadiumsView.css';

const stadiums = [
  { id: 1, img: 'https://i.pinimg.com/originals/61/28/03/61280310accff08308966f1a21c1d849.jpg', name: 'Cairo International Stadium' },
  { id: 2, img: 'https://i.pinimg.com/originals/61/28/03/61280310accff08308966f1a21c1d849.jpg', name: 'Borg El Arab Stadium' },
  { id: 3, img: 'https://i.pinimg.com/originals/61/28/03/61280310accff08308966f1a21c1d849.jpg', name: 'Al Ahly Stadium' },
  { id: 4, img: 'https://i.pinimg.com/originals/61/28/03/61280310accff08308966f1a21c1d849.jpg', name: 'Petro Sport Stadium' },
  { id: 5, img: 'https://i.pinimg.com/originals/61/28/03/61280310accff08308966f1a21c1d849.jpg', name: 'Suez Stadium' },
  { id: 6, img: 'https://i.pinimg.com/originals/61/28/03/61280310accff08308966f1a21c1d849.jpg', name: 'Ismailia Stadium' },
];

const StadiumsView = () => {
  const [, setActiveIndex] = useState(0);

  return (
    <Box sx={{ width: "100vw" }}>
      <AppBar position="static" color="default" className="app-bar">
        <ToolBar />
      </AppBar>

      {/* Title Section */}
      <Box className="title-section">
        <SportsSoccerIcon className="soccer-icon" />
        <Typography variant="h2" className="title-text">
          Stadiums
        </Typography>
      </Box>

      <Grid container spacing={4} justifyContent="center">
        {stadiums.map((stadium, index) => {
          const { ref } = useInView({
            threshold: 0.7, // Triggers when 70% of the item is visible
            onChange: (isInView) => {
              if (isInView) setActiveIndex(index);
            },
          });

          return (
            <Grid item xs={12} sm={6} md={4} key={stadium.id}>
              <Card
                ref={ref}
                className="stadium-card"
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={stadium.img}
                  alt={stadium.name}
                  className="stadium-image"
                />
                <CardContent>
                  <Typography variant="h5" className="stadium-name">
                    {stadium.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <Footer />
    </Box>
  );
};

export default StadiumsView;
