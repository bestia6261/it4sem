import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CarList from "./components/Carlist";

function App() {
  return (
    <Container maxWidth="sm">
      <AppBar>
        <Toolbar>
          <Typography variant="h6">Car Shop</Typography>
        </Toolbar>
      </AppBar>
      <CarList />
    </Container>
  );
}

export default App;
