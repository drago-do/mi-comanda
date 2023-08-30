import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { HiArchive, HiPencilAlt, HiLocationMarker } from "react-icons/hi";
import { useComandasGlobales } from "./../hooks/useComandasGlobales";
import { useUsers } from "../hooks/useUsers";
import { obtenerComandasGlobales } from "./../hooks/useComandasGlobales";
import styles from "./../styles/index/ListaComandasGlobales.module.css";
import SwitchAccessShortcutAddIcon from "@mui/icons-material/SwitchAccessShortcutAdd";

import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export default function ListaComandasGlobales() {
 
  const { obtenerComandasGlobales } = useComandasGlobales();
  const [comandasGlobales, setComandasGlobales] = useState(null);
  const [forceUpdate, setForceUpdate] = useState(false);
  const [comandasAMostrar, setComandasAMostrar] = useState(5);

  useEffect(() => {
    obtenerComandasGlobales().then((comandas) => setComandasGlobales(comandas));
  }, [forceUpdate]);

  useEffect(() => {
    const interval = setInterval(() => {
      handleForceUpdate();
    }, 40000);
    return () => clearInterval(interval);
  }, [forceUpdate]);

  const handleForceUpdate = () => {
    setForceUpdate(!forceUpdate);
  };

  const handleShowMore = () => {
    setComandasAMostrar(comandasAMostrar + 5);
  };

  return (
    <div className={styles.mainContainer} onClick={handleForceUpdate}>
      {/* comandas activas( pendiente, entregado) */}
      {comandasGlobales &&
        comandasGlobales.map((comanda) => {
          //Verificar si la comanda esta activa (comanda.paid == false)
          if (comanda.paid !== "true" || !comanda.fullDeliver) {
            return (
              <ItemComandaGlobal
                key={comanda._id}
                id={comanda.id}
                _id={comanda._id}
                tableName={comanda.tableName}
                location={comanda.location}
                fullDeliver={comanda.fullDeliver}
                total={comanda.total}
                paid={comanda.paid}
                fullObjet={comanda}
                handleForceUpdate={handleForceUpdate}
              />
            );
          }
        })}
      {/* comandas finalizadas - pagadas*/}
      <div className={styles.separator}>
        <hr className={styles.line} />
        <p className={styles.textoSeparador}>Comandas finalizadas</p>
        <hr className={styles.line} />
      </div>
      {comandasGlobales &&
        comandasGlobales
          .filter((comanda) => comanda.paid === "true" && comanda.fullDeliver)
          .reverse()
          .slice(0, comandasAMostrar)
          .map((comanda) => (
            <ItemComandaGlobal
              key={comanda._id}
              id={comanda.id}
              _id={comanda._id}
              tableName={comanda.tableName}
              location={comanda.location}
              fullDeliver={comanda.fullDeliver}
              paid={comanda.paid}
              total={comanda.total}
              handleForceUpdate={handleForceUpdate}
            />
          ))}
      <Button
        variant="outlined"
        startIcon={<SwitchAccessShortcutAddIcon />}
        onClick={handleShowMore}
      >
        Mostrar más
      </Button>
    </div>
  );
}

const ItemComandaGlobal = ({
  id,
  _id,
  tableName,
  location,
  fullDeliver,
  paid,
  total,
  handleForceUpdate,
}) => {
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
    if (paid !== "true" && userInSesion) {
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
    setMessageSnackBar(`Orden completa. Mesa: ${tableName}`);
    if (userInSesion) {
      marcarComandaComoCompleta(_id).then((data) => {
        console.log(data);
        handleForceUpdate();
        handleSnackBar();
      });
    }
  };
  const handleCompletePay = () => {
    setMessageSnackBar(`Orden pagada. Mesa: ${tableName}`);
    marcarComandaComoPagada(_id).then((data) => {
      console.log(data);
      handleForceUpdate();
      setOpen(false);
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
          <h3 style={{ marginBottom: "5px" }}>{tableName}</h3>
          <div className={styles.containerEstadoTotal}>
            <p
              className={`${styles.textEstadoTotal} ${
                fullDeliver ? styles.full : styles.noFull
              } text-xs text-blue-600`}
              onClick={handleCompleteOrder}
            >
              {fullDeliver ? "Entregado" : "Pendiente"}
            </p>

            <p
              className={`${styles.textEstadoTotal} ${
                paid === "true"
                  ? styles.full
                  : paid === "wait"
                  ? styles.wait
                  : styles.noFull
              }`}
              onClick={handleClickOpenConfirmDialog}
            >
              {paid === "true"
                ? "Pagado"
                : paid === "wait"
                ? "Espera"
                : "Falta pagar"}
            </p>
            <p
              className={`${styles.textEstadoTotal} ${styles.total}`}
            >{`$ ${total}`}</p>
          </div>
        </div>
        <div
          className={styles.locationContainer}
          onClick={() => paid !== "true" && editarComandaGlobal(id)}
        >
          {paid === "true" ? <HiArchive /> : <HiPencilAlt />}
        </div>
        <Dialog open={open} onClose={handleCloseConfirmDialog}>
          <DialogTitle>{`Cambiar el estado de ${tableName}`}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Esto marcara como pagada la comanda.
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
