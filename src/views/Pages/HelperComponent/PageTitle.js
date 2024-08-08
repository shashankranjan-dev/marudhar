import React from "react";
import { Box, Grid, makeStyles } from "@material-ui/core";
import { appDefaultColor } from "assets/jss/material-dashboard-pro-react";
import {
  whiteColor,
  appFontWeight,
} from "assets/jss/material-dashboard-pro-react";
import { CircleAddBtn } from "../../Components/CustomButton";

import { CircleUpdateBtn } from "../../Components/CustomButton";


import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  pageHeader: {
    padding: "10px 5px",
    zIndex: 100,
    top: 70,
    backgroundColor: whiteColor,
    position: "absolute",
    width: "100%",
  },
  pageTitleBox: {
    color: "#0059B2",
    // color: appSecondColor,
    fontSize: "14px",
    fontWeight: 400,
    paddingLeft: "15px",
  },
  topHeaderTitle: {
    minHeight: "35px",
    lineHeight: "35px",
    backgroundColor: whiteColor,
    height: "auto",
    padding: "5px 20px",
    margin: "-20px -30px 10px -30px",
    boxShadow: "0 1px 4px 0 rgb(0 0 0 / 14%)",
  },
}));

const PageTitle = ({ title, btnToolTip, addBtnLink,updateBtnLink, onClickAddBtn,updateBtnToolTip }) => {
  const history = useHistory();
  const classes = useStyles();
  return (
    <Box className={classes.topHeaderTitle}>
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <Box className={classes.pageTitleBox}>{title}</Box>
        </Grid>
        <Grid item>
        <Grid container spacing={1}>
        {updateBtnLink && (
          <Grid item>
            <CircleUpdateBtn
              size="small"
              title={updateBtnToolTip}
              onClick={() => history.push(updateBtnLink)}
      
            />
          </Grid>
        )}
        {addBtnLink && (
          <Grid item>
            <CircleAddBtn
              size="small"
              title={btnToolTip}
              onClick={() => history.push(addBtnLink)}
            />
          </Grid>
        )}
        {onClickAddBtn && (
          <Grid item>
            <CircleAddBtn
              size="small"
              title={btnToolTip}
              onClick={onClickAddBtn}
            />
          </Grid>
        )}
        </Grid>
        </Grid>
       
      </Grid>
    </Box>
  );
};
// const PageTitle = ({ title, btnTile, addBtnLink }) => {
//   const classes = useStyles();
//   return (
//     <Box
//       mb={1}
//       fontSize="13px"
//       color={whiteColor}
//       fontWeight={500}
//       textAlign="center"
//       borderRadius={4}
//       className={classes.pageTitleBox}
//     >
//       {title}
//     </Box>
//   );
// };

export const PageHeader = ({
  title,
  btnToolTip,
  addBtnLink,
  onClickAddBtn,
}) => {
  const history = useHistory();
  const classes = useStyles();
  return (
    <Box className={classes.topHeaderTitle}>
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <Box className={classes.pageTitleBox}>{title}</Box>
        </Grid>
        {addBtnLink && (
          <Grid item>
            <CircleAddBtn
              size="small"
              title={btnToolTip}
              onClick={() => history.push(addBtnLink)}
            />
          </Grid>
        )}
        {onClickAddBtn && (
          <Grid item>
            <CircleAddBtn
              size="small"
              title={btnToolTip}
              onClick={onClickAddBtn}
            />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default PageTitle;
