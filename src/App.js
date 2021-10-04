import Home from "./Home";
import { AuthContextProvider } from "./contexts/AuthContext";

import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    textAlign: "center",
  },
});

function App() {
  const classes = useStyles();

  return (
    <AuthContextProvider>
      <Grid className={classes.root}>
        <Home />
      </Grid>
    </AuthContextProvider>
  );
}

export default App;
