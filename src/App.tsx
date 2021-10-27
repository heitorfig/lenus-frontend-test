import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import Header from "./components/Header";
import WeightTracker from "./components/WeightTracker";

const App = () => {
  return (
    <Box>
      <Header>
        <Container sx={{ minHeight: "60px", textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center" }} fixed>
          <Typography variant="h5" component="h1" sx={{ fontWeight: 700 }} color="primary">
            Weight Tracker
          </Typography>
        </Container>
      </Header>
      <WeightTracker />
    </Box>
  );
};

export default App;
