import React from "react";
import { ThemeProvider, Box } from "@material-ui/core";
import PageTitle from "../HelperComponent/PageTitle";
import theme from "../../../theme/theme";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import MuiTable from "../../Components/MuITable";
import { makeStyles } from "@material-ui/core/styles";
import { CustomCard } from "../../Components/CustomCard";
import { useHistory, useLocation } from "react-router-dom";
import ViewCard, { AddressCard } from "../HelperComponent/ViewCard";

const useStyles = makeStyles((theme) => ({
  root: {
    switchBtn: {
      width: 180,
      height: "100%",
    },
  },
  actionbtns: {
    marginLeft: 15,
    marginTop: 20,
    float: "right",
  },
  cardPadding: {
    padding: "10px  15px 0 15px",
  },

  catCards: {
    marginLeft: 5,
  },
}));

const headerData = [
  {
    id: "group_name",
    label: "Group",
    align: "left",
  },
  {
    id: "company",
    label: "Company",
    align: "left",
  },
  {
    id: "name",
    label: "Name",
    align: "left",
  },

  {
    id: "mobile",
    label: "Mobile",
    align: "left",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    align: "left",
  },
  {
    id: "email",
    label: "Email",
    align: "left",
  },
  {
    id: "status",
    label: "Status",
    align: "left",
    statusBtn: (v) => (v === "Y" ? true : false),
  },
];

const CustomerViewPage = () => {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const [customerInfo, setCustomerInfo] = React.useState({
    customer_id: "",
    company: "",
    group_name: "",
    reference_name: "",
    name: "",
    mobile: "",
    whatsapp: "",
    email: "",
    status: "",
    allContacts: [],
    allAddress: [],
  });

  React.useEffect(() => {
    setCustomerInfo({
      customer_id: location.state?.row?.customer_id,
      company: location.state?.row?.company,
      group_name: location.state?.row?.group_name,
      group_id: location.state?.row?.group_id,
      reference_id: location.state?.row?.reference_id,
      reference_name: location.state?.row?.reference_name,
      gst: location.state?.row?.gst_no,
      status: location.state?.row?.status,
      name: location.state?.row?.allContacts[0]?.txt_name,
      email: location.state?.row?.allContacts[0]?.txt_email,
      mobile: location.state?.row?.allContacts[0]?.txt_mobile,
      whatsapp: location.state?.row?.allContacts[0]?.txt_whatsapp,
      allAddress: location.state?.row?.allAddress,
      allContacts: location.state?.row?.allContacts,
    });
  }, []);

  const onClickClose = (e) => {
    history.push({
      pathname: "/admin/master/customer",
    });
  }

  return (
    <div>
      <ThemeProvider theme={theme}>
        <PageTitle title="Customer > view" />
        <GridContainer className={classes.root}>
          <GridItem xs="12">
            <CustomCard cdTitle="Customer" height="auto">
              <MuiTable
                pagination={false}
                columns={headerData}
                rows={[customerInfo]}
              />
            </CustomCard>
          </GridItem>
          <GridItem xs="12">
            <CustomCard cdTitle="Address" height="auto">
              {customerInfo.allAddress.length > 0 ? (
                <GridContainer className={classes.cardPadding}>
                  {customerInfo.allAddress.map((a, id) => (
                    <AddressCard
                      a={a}
                      id={id}
                      edit={false}
                      remove={false}
                      key={id}
                    />
                  ))}
                </GridContainer>
              ) : (
                <Box textAlign="center">No Address</Box>
              )}
            </CustomCard>
          </GridItem>
          <GridItem xs="12">
            <CustomCard cdTitle="Contacts" height="auto">
              {customerInfo.allContacts.length > 0 ? (
                <GridContainer className={classes.cardPadding}>
                  {customerInfo.allContacts.map((a, id) => (
                    <ViewCard
                      a={a}
                      id={id}
                      edit={false}
                      remove={false}
                      key={id}
                    />
                  ))}
                </GridContainer>
              ) : (
                <Box textAlign="center">No Contacts</Box>
              )}
                     <GridItem xs={12}>
          <div className={classes.actionbtns} >
            <Button
                onClick={onClickClose}
              className={classes.actionbtn}
              variant="outlined"
              color="danger"
            >
             close
            </Button>
          </div>
        </GridItem>
            </CustomCard>
          </GridItem>
        </GridContainer>
      </ThemeProvider>
    </div>
  );
};

export default CustomerViewPage;
