import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  IconButton,
  Typography,
} from "@mui/material";
import { HiArchive, HiPencilAlt, HiLocationMarker } from "react-icons/hi";
import CloseIcon from "@mui/icons-material/Close";
import FunctionsIcon from "@mui/icons-material/Functions";
import SwitchAccessShortcutAddIcon from "@mui/icons-material/SwitchAccessShortcutAdd";

import { useComandasGlobales } from "./../hooks/useComandasGlobales";
import { useUsers } from "../hooks/useUsers";
import styles from "./../styles/index/ListaComandasGlobales.module.css";

export default function ListaComandasGlobales({ update }) {
  const { obtenerComandasGlobales } = useComandasGlobales();
  const [comandasGlobales, setComandasGlobales] = useState([]);
  const [comandasAMostrar, setComandasAMostrar] = useState(5);
  const [forceUpdate, setForceUpdate] = useState(false);

  useEffect(() => {
    obtenerComandasGlobales().then((comandas) => setComandasGlobales(comandas));
  }, [forceUpdate, update]);

  useEffect(() => {
    const interval = setInterval(() => {
      handleForceUpdate();
    }, 10000);
    return () => clearInterval(interval);
  }, [forceUpdate]);

  const handleForceUpdate = () => {
    console.log("force update");
    setForceUpdate(!forceUpdate);
  };

  const handleShowMore = () => {
    setComandasAMostrar(comandasAMostrar + 5);
  };

  return (
    <div className={styles.mainContainer} onClick={handleForceUpdate}>
      {comandasGlobales.length > 0 ? (
        comandasGlobales.map((comanda) => {
          if (comanda.paid !== "true" || !comanda.fullDeliver) {
            return (
              <ItemComandaGlobal
                key={comanda._id}
                comanda={comanda}
                handleForceUpdate={handleForceUpdate}
              />
            );
          }
          return null;
        })
      ) : (
        <section className="flex flex-col items-center w-3/4 my-12">
          <Typography variant="h6">No tienes comandas activas.</Typography>
          <Typography variant="caption">
            Esperemos que pronto llegue gente.
          </Typography>
        </section>
      )}
      {/* comandas finalizadas - pagadas*/}
      <div className={styles.separator}>
        <hr className={styles.line} />
        <p className={styles.textoSeparador}>Comandas finalizadas</p>
        <hr className={styles.line} />
      </div>
      <ComandasTerminadas
        comandasGlobales={comandasGlobales}
        comandasAMostrar={comandasAMostrar}
        handleForceUpdate={handleForceUpdate}
      />
      <section
        className={`flex flex-nowrap w-full justify-${
          comandasGlobales.length > comandasAMostrar ? "between" : "center"
        }`}
      >
        {comandasGlobales.length > comandasAMostrar && (
          <Button
            variant="outlined"
            startIcon={<SwitchAccessShortcutAddIcon />}
            onClick={handleShowMore}
          >
            Mostrar más
          </Button>
        )}
        {comandasGlobales.some(
          (comanda) => comanda.paid === "true" && comanda.fullDeliver
        ) && (
          <Link href={"/admin/corte"}>
            <Button
              variant="contained"
              startIcon={<FunctionsIcon />}
              color="error"
            >
              Realizar Corte
            </Button>
          </Link>
        )}
      </section>
    </div>
  );
}

const ComandasTerminadas = ({
  comandasGlobales,
  comandasAMostrar,
  handleForceUpdate,
}) => {
  const comandasTerminadas = comandasGlobales
    .filter((comanda) => comanda.paid === "true" && comanda.fullDeliver)
    .reverse()
    .slice(0, comandasAMostrar);

  return (
    <>
      {comandasTerminadas.length > 0 ? (
        comandasTerminadas.map((comanda) => (
          <ItemComandaGlobal
            key={comanda._id}
            comanda={comanda}
            handleForceUpdate={handleForceUpdate}
          />
        ))
      ) : (
        <section className="flex flex-col items-center w-3/4 my-12">
          <Typography variant="h6">No hay pedidos finalizados.</Typography>
          <Typography variant="caption" className="text-center">
            Para finalizar un pedido tienes que marcarlo como pagado y
            entregado.
          </Typography>
        </section>
      )}
    </>
  );
};

const ItemComandaGlobal = ({ comanda, handleForceUpdate }) => {
  const {
    editarComandaGlobal,
    marcarComandaComoCompleta,
    marcarComandaComoPagada,
  } = useComandasGlobales();
  const { userIsOnSesion } = useUsers();
  const [open, setOpen] = useState(false);
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [messageSnackBar, setMessageSnackBar] = useState("");
  const [userInSesion, setUserInSesion] = useState(false);

  const handleClickOpenConfirmDialog = () => {
    if (comanda.paid !== "true" && userInSesion) {
      setOpen(true);
    }
  };

  const handleSnackBar = () => {
    setShowSnackBar(!showSnackBar);
  };

  const handleCloseConfirmDialog = () => {
    setOpen(false);
  };

  const handleCompleteOrder = () => {
    setMessageSnackBar(`Orden completa. Mesa: ${comanda.tableName}`);
    if (userInSesion) {
      marcarComandaComoCompleta(comanda._id).then((data) => {
        console.log(data);
        handleForceUpdate();
        handleSnackBar();
      });
    }
  };

  const handleCompletePay = () => {
    setMessageSnackBar(`Orden pagada. Mesa: ${comanda.tableName}`);
    marcarComandaComoPagada(comanda._id).then((data) => {
      console.log(data);
      setOpen(false);
      handleForceUpdate();
      handleSnackBar();
    });
  };

  useEffect(() => {
    userIsOnSesion().then((userInSesion) => setUserInSesion(userInSesion));
  }, []);

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleSnackBar}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <>
      <div className={styles.itemContainerMainInfo}>
        <div className={styles.locationContainer}>
          <HiLocationMarker />
        </div>
        <div style={{ width: "60%" }}>
          <h3 style={{ marginBottom: "5px" }}>{comanda.tableName}</h3>
          <div className={styles.containerEstadoTotal}>
            <p
              className={`${styles.textEstadoTotal} ${
                comanda.fullDeliver ? styles.full : styles.noFull
              } text-xs text-blue-600`}
              onClick={handleCompleteOrder}
            >
              {comanda.fullDeliver ? "Entregado" : "Pendiente"}
            </p>
            <p
              className={`${styles.textEstadoTotal} ${
                comanda.paid === "true"
                  ? styles.full
                  : comanda.paid === "wait"
                  ? styles.wait
                  : styles.noFull
              }`}
              onClick={handleClickOpenConfirmDialog}
            >
              {comanda.paid === "true"
                ? "Pagado"
                : comanda.paid === "wait"
                ? "Espera"
                : "Falta pagar"}
            </p>
            <p className={`${styles.textEstadoTotal} ${styles.total}`}>
              {`$ ${comanda.total}`}
            </p>
          </div>
        </div>
        <div
          className={styles.locationContainer}
          onClick={() =>
            comanda.paid !== "true" && editarComandaGlobal(comanda.id)
          }
        >
          {comanda.paid === "true" ? <HiArchive /> : <HiPencilAlt />}
        </div>
        <Dialog open={open} onClose={handleCloseConfirmDialog}>
          <DialogTitle>{`Cambiar el estado de ${comanda.tableName}`}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Esto marcará como pagada la comanda.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseConfirmDialog}>Cancelar</Button>
            <Button onClick={handleCompletePay} autoFocus>
              Marcar como pagada
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          open={showSnackBar}
          autoHideDuration={6000}
          onClose={handleSnackBar}
          message={messageSnackBar}
          action={action}
        />
      </div>
    </>
  );
};
