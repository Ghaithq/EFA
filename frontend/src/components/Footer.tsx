import React from 'react';
import { Box, Container, Typography, Link, IconButton } from '@mui/material';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#f7f7f7', // Light background
        color: '#333', // Dark font color
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Subtle shadow
        padding: '10px 0',
        width: '100%',
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          {/* Left Section */}
          <Box sx={{ flex: 1, minWidth: '200px' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1, fontSize: '14px' }}>
              About Us
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '12px', lineHeight: 1.4 }}>
              Welcome to the Egyptian Premier League Soccer Reservation Website. Reserve your tickets and enjoy the game!
            </Typography>
          </Box>

          {/* Center Section */}
          <Box sx={{ flex: 1, minWidth: '200px', textAlign: 'center' }}>
            <SportsSoccerIcon sx={{ fontSize: '40px', color: '#ff6f00', mb: 1 }} />
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 'bold',
                mb: 1,
                fontSize: '14px',
                textTransform: 'uppercase',
                letterSpacing: 1.5,
              }}
            >
              Egyptian Premier League
            </Typography>
            <Box>
              <Link
                href="/matches"
                sx={{
                  display: 'inline-block',
                  color: '#333',
                  textDecoration: 'none',
                  fontSize: '12px',
                  marginRight: '10px',
                  '&:hover': { textDecoration: 'underline', color: '#ff6f00' },
                }}
              >
                Matches
              </Link>
              <Link
                href="/stadiums"
                sx={{
                  display: 'inline-block',
                  color: '#333',
                  textDecoration: 'none',
                  fontSize: '12px',
                  marginRight: '10px',
                  '&:hover': { textDecoration: 'underline', color: '#ff6f00' },
                }}
              >
                Stadiums
              </Link>
              <Link
                href="/tickets"
                sx={{
                  display: 'inline-block',
                  color: '#333',
                  textDecoration: 'none',
                  fontSize: '12px',
                  '&:hover': { textDecoration: 'underline', color: '#ff6f00' },
                }}
              >
                Tickets
              </Link>
            </Box>
          </Box>

          {/* Right Section */}
          <Box sx={{ flex: 1, minWidth: '200px', textAlign: 'right' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1, fontSize: '14px' }}>
              Follow Us
            </Typography>
            <Box>
              <IconButton
                href="https://facebook.com"
                target="_blank"
                sx={{
                  color: '#333',
                  padding: '5px',
                  '&:hover': { color: '#ff6f00' },
                }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                href="https://twitter.com"
                target="_blank"
                sx={{
                  color: '#333',
                  padding: '5px',
                  '&:hover': { color: '#ff6f00' },
                }}
              >
                <TwitterIcon />
              </IconButton>
              <IconButton
                href="https://instagram.com"
                target="_blank"
                sx={{
                  color: '#333',
                  padding: '5px',
                  '&:hover': { color: '#ff6f00' },
                }}
              >
                <InstagramIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>

        {/* Bottom Section */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 2,
            borderTop: '1px solid #ddd',
            pt: 1,
            fontSize: '12px',
          }}
        >
          <Typography variant="caption" sx={{ color: '#777' }}>
            Egyptian Premier League - Where Passion Meets the Game!
          </Typography>
          <Typography variant="caption" sx={{ color: '#ff6f00' }}>
            &copy; 2024 Egyptian Premier League. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
