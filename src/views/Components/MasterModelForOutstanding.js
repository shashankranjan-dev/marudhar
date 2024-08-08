import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Close from "@mui/icons-material/Close";
import { CustomCard } from "./CustomCard";
import styles from "assets/jss/material-dashboard-pro-react/views/itemPageStyle.js";
import { makeStyles } from "@material-ui/core/styles";
import CustomButton, { ColoseButton } from "./CustomButton";
import { Box, Button, useMediaQuery } from "@material-ui/core";
import { appDefaultColor } from "assets/jss/material-dashboard-pro-react";
import { appDefaultFamily } from "assets/jss/material-dashboard-pro-react";
const useStyles = makeStyles((theme) => ({
  modalFooter: {
    '@media print': {
      display: 'none'
    }
  },
}));

const MasterModel = ({
  modelName,
  onCloseModel,
  classicModal,
  width = "100%",
  height,
  children,
  btnDisabled,
  onClickOk,
  dialogMaxWidht,
  addTodobtn,
  okBtnText,
  okbtnWith,
  appLogo,
  closeIcon = true,
  onClickAddTask = () => {},
  closeBtn = true,
  okbtn = true,
}) => {
  const classes = useStyles();
  const matchesPrint = useMediaQuery("print");

  return (
    <div>
      <Dialog
        style={{ background: "transparent", maxWidth: dialogMaxWidht }}
        open={classicModal}
        keepMounted
        disableBackdropClick={true}
        onClose={onCloseModel}
        aria-labelledby="classic-modal-slide-title"
        aria-describedby="classic-modal-slide-description"
      >
        <Box style={{
          margin: "Auto",
          padding:"2rem",
          width:"100%"
        }}>
          <form noValidate>
            {children}

            {!matchesPrint && (
              <DialogActions className={classes.modalFooter}>
                {closeBtn && (
                  <ColoseButton height={37} onClick={onCloseModel} style={{ backgroundColor: "red", color: "#FFFFFF", borderColor: "red" }} >
                    Close
                  </ColoseButton>
                )}
                {/* {addTodobtn && (
                  <ColoseButton
                    height={37}
                    width={140}
                    onClick={onClickAddTask}
                  >
                 Ok
                  </ColoseButton>
                )}
                {okbtn && (
                  <CustomButton
                    type="submit"
                    className={classes.onClickOk}
                    disabled={btnDisabled}
                    onClick={onClickOk}
                    width={okbtnWith ? okbtnWith : 100}
                  >
                    {okBtnText ? okBtnText : "Ok"}
                  </CustomButton>
                )} */}
              </DialogActions>
            )}
          </form>
        </Box>
      </Dialog>
    </div>
  );
};

export default MasterModel;
