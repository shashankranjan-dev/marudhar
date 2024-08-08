import React from "react";
import { useStateValue } from "../../../context/context";
import { actionTypes } from "../../../context/reducer";
import { IMG_API } from "services/webApi/webApi";
import { getItemImgById } from "../../../services/saleService/addEnqueryService";

const ItemImg = ({ item_id }) => {
  const [globalState, dispatch] = useStateValue();
  const [imgPath, setImgPath] = React.useState("");

  React.useEffect(() => {
    getItemImgById(
      item_id,
      (r) => {
        // console.log(r[0]?.picture_path, "sen1506/img");
        if (r.length) {
          // setImgPath(r[0]?.picture_path);
          setImgPath(r[0]);

        } else {
          setImgPath("");
        }
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
        setImgPath("");
      }
    );
  }, [item_id]);

  // console.log(imgPath, "sen1506/img1");
  return (
    // <img
    //   style={{ width: "100%" }}
    //   src={imgPath ? IMG_API + imgPath : "https://via.placeholder.com/80"}
    //   alt=""
    // />
    <img
      id="imgPath"
      // className={classes.itemImg}
      src={
        imgPath.picture_path
          ? IMG_API + imgPath.picture_path
          : "https://via.placeholder.com/160"
      }
      height="100%"
      width="100%"
      alt="image"
    //   style={{paddingLeft:"20px"

    // }}
      
    
    />
  );
};

export default ItemImg;
