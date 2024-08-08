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
import ViewCard, {
  AddressCard,
  ViewBankCard,
} from "../HelperComponent/ViewCard";

const useStyles = makeStyles((theme) => ({
  root: {
    switchBtn: {
      width: 180,
      height: "100%",
    },
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

const VendorViewPage = () => {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const [vendorInfo, setVendorInfo] = React.useState({
    vendor_id: "",
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
    allBanks: [],
  });

  React.useEffect(() => {
    setVendorInfo({
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
      allBanks: location.state?.row?.allBanks,
    });
  }, []);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <PageTitle title="Vendor > view" />
        <GridContainer className={classes.root}>
          <GridItem xs="12">
            <CustomCard cdTitle="Vendor" height="auto">
              <MuiTable
                pagination={false}
                columns={headerData}
                rows={[vendorInfo]}
              />
            </CustomCard>
          </GridItem>
          <GridItem xs="12">
            <CustomCard cdTitle="Address" height="auto">
              {vendorInfo.allAddress.length > 0 ? (
                <GridContainer className={classes.cardPadding}>
                  {vendorInfo.allAddress.map((a, id) => (
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
              {vendorInfo.allContacts.length > 0 ? (
                <GridContainer className={classes.cardPadding}>
                  {vendorInfo.allContacts.map((a, id) => (
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
            </CustomCard>
          </GridItem>
          <GridItem xs="12">
            <CustomCard cdTitle="Banks" height="auto">
              {vendorInfo?.allBanks?.length > 0 ? (
                <GridContainer className={classes.cardPadding}>
                  {vendorInfo.allBanks.map((a, id) => (
                    <ViewBankCard
                      a={a}
                      id={id}
                      edit={false}
                      remove={false}
                      key={id}
                    />
                  ))}
                </GridContainer>
              ) : (
                <Box textAlign="center">No Bank</Box>
              )}
            </CustomCard>
          </GridItem>
        </GridContainer>
      </ThemeProvider>
    </div>
  );
};

export default VendorViewPage;
