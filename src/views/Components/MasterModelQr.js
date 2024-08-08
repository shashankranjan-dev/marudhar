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
import { Button, useMediaQuery } from "@material-ui/core";
import { appDefaultColor } from "assets/jss/material-dashboard-pro-react";
import { appDefaultFamily } from "assets/jss/material-dashboard-pro-react";
const useStyles = makeStyles((theme) => ({
  modalFooter: {
    '@media print': {
      display: 'none',
      breakAfter: 'avoid',  
      overflow: 'initial !important',
      'page-break-inside': 'always'   
      // '-webkit-region-break-inside': 'avoid'    
    }
  
  },

  // print: {
  //   '@media print': {
  //     display: 'block',
  //     pageBreakBefore: 'always',
  //   },
  // },
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
  okClosebtn,
  okbtnWith,
  appLogo,
  closeIcon = true,
  onClickAddTask = () => {},
  closeBtn = true,
  okbtn = true,
  ref,
}) => {
  const classes = useStyles();
  const matchesPrint = useMediaQuery("print");

  return (
    <div     ref={ref}>
      <Dialog
        style={{ background: "transparent", maxWidth: dialogMaxWidht }}
        open={classicModal}
        keepMounted
        disableBackdropClick={true}
        onClose={onCloseModel}
        aria-labelledby="classic-modal-slide-title"
        aria-describedby="classic-modal-slide-description"
      >
        <CustomCard
          close={closeIcon}
          width={width}
          height={height}
          onClose={onCloseModel}
          appLogo={appLogo}
          addTodobtn={addTodobtn}
          style={{
            marginTop: 0,
            marginBottom: 0,
          }}
          cdTitle={modelName}
        >
          <form noValidate>
            {children}

            {!matchesPrint && (
              <DialogActions className={classes.modalFooter}>
                {closeBtn && (
                  <ColoseButton height={37} onClick={onCloseModel} style={{ backgroundColor: "red", color: "#FFFFFF", borderColor: "red" }} >
                    
                    {okClosebtn ? okClosebtn : "Close"}
                  </ColoseButton>
                )}
                {addTodobtn && (
                  <ColoseButton
                    height={37}
                    width={140}
                    onClick={onClickAddTask}
                  >
                    Add To Do
                  </ColoseButton>
                )}
              </DialogActions>
            )}
          </form>
        </CustomCard>
      </Dialog>
    </div>
  );
};




export default MasterModel;
