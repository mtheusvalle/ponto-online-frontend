import { useState } from "react";
import { Grid, Button, IconButton, Snackbar, Alert } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import Data from "./components/DataComponent";
import Progress from "./components/ProgressComponent";

export default function Home() {
  const [ponto, setPonto] = useState(true);
  const [open, setOpen] = useState(false);

  const handlePonto = () => {
    if (ponto) {
      setPonto(false);
      setOpen(true);
    } else {
      setPonto(true);
      setOpen(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <Grid>
      <Data />
      <Progress />
      {ponto ? (
        <Button
          variant="contained"
          color="success"
          size="large"
          onClick={handlePonto}
        >
          Entrada
        </Button>
      ) : (
        <div style={{ gap: '20px', display: 'flex' }}>
          <Button
            variant="outlined"
            color="error"
            size="large"
            
          >
            Pausar
          </Button>
          <Button
            variant="contained"
            color="error"
            size="large"
            onClick={handlePonto}
          >
            Saída
          </Button>
        </div>
      )}

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        action={action}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Registro efetuado com Sucesso!
        </Alert>
      </Snackbar>
    </Grid>
  );
}
