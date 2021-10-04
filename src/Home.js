import { useState, useEffect } from "react";
import { getDatabase, set, ref, get, child } from "firebase/database";
import { useHistory } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { formatDate } from "./services/formatDate";

import { Grid, Button, IconButton, Snackbar, Alert } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import Data from "./components/DataComponent";
import Progress from "./components/ProgressComponent";

export default function Home() {
  const { user, signInWithGoogle, signOutWithGoogle } = useAuth();
  const [ponto, setPonto] = useState(true);
  const [open, setOpen] = useState(false);

  const handlePonto = () => {
    if (ponto) {
      pontoEntrada(user.id, user.name);
      setPonto(false);
      setOpen(true);
    } else {
      pontoSaida(user.id, user.name);
      setPonto(true);
      setOpen(true);
    }
  };

  const pontoEntrada = async (userId, name) => {
    const data = new Date().toISOString();
    const dataAtual = `${new Date(data).getDate()}-${new Date(
      data
    ).getMonth()}-${new Date(data).getFullYear()}`;
    const db = getDatabase();
    await set(ref(db, `users/${userId}/${new Date(data).getTime()}`), {
      createdAt: dataAtual,
      ponto: "entrada",
      name: name,
    });
  };

  const pontoSaida = async (userId, name) => {
    const data = new Date().toISOString();
    const dataAtual = `${new Date(data).getDate()}-${new Date(
      data
    ).getMonth()}-${new Date(data).getFullYear()}`;
    const db = getDatabase();
    await set(ref(db, `users/${userId}/${new Date(data).getTime()}`), {
      createdAt: dataAtual,
      ponto: "saida",
      name: name,
    });
  };

  const getEntradas = async () => {
    const dbRef = ref(getDatabase());
    await get(child(dbRef, `users/${user.id}`)).then((snapshot) => {
      if (snapshot.exists()) {
        const databaseEntries = snapshot.val();
        const parsedEntries = Object.entries(databaseEntries).map(
          ([key, value]) => {
            return {
              id: key,
              createdAt: value.createdAt,
              hours: `${formatDate(
                new Date(parseInt(key)).getHours()
              )}:${formatDate(
                new Date(parseInt(key)).getMinutes()
              )}:${formatDate(new Date(parseInt(key)).getSeconds())}`,
              ponto: value.ponto,
            };
          }
        );
        console.log(parsedEntries);
      } else {
        console.log("No data available");
      }
    });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const loginGoogle = async () => {
    await signInWithGoogle();
  };

  const logoutGoogle = async () => {
    await signOutWithGoogle();
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
      {!user ? (
        <Button
          variant="contained"
          onClick={loginGoogle}
          color="primary"
          size="large"
        >
          Logar
        </Button>
      ) : ponto ? (
        <>
          <Button
            variant="contained"
            color="success"
            size="large"
            onClick={handlePonto}
          >
            Entrada ponto
          </Button>
          <Button onClick={getEntradas}>Get Dados</Button>
        </>
      ) : (
        <div style={{ gap: "20px", display: "flex" }}>
          <Button variant="outlined" color="error" size="large">
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
