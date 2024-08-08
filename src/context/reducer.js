export const initialState = {
  user: null,
  loading: false,
  refresh: false,
  messages: {
    errorMsg: "errorMsg",
    successMsg: "SuccesMsg",
    warningMsg: "waringMsg",
  },
  isOpenMsg: {
    open: false,
    msgType: "",
    msg: "",
  },
  user_location: {
    showroom_warehouse_id: "",
    stock: "",
  },
};

export const actionTypes = {
  SET_USER: "SET_USER",
  SET_LOADING: "SET_LOADING",
  SET_OPEN_MSG: "SET_OPEN_MSG",
  SET_CLOSE_MSG: "SET_CLOSE_MSG",
  SET_USER_LOCATION: "SET_USER_LOCATION",
  SET_REFRESH: "SET_REFRESH",
  UPDATE_ITEM_ID_WISE_STOCK: "UPDATE_ITEM_ID_WISE_STOCK",
};

const reducer = (state, action) => {
  // console.log("in reducer, action is:\n" + JSON.stringify(action, null, 2));
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case actionTypes.SET_LOADING:
      return {
        ...state,
        loading: !state.loading,
      };
    case actionTypes.SET_REFRESH:
      return {
        ...state,
        refresh: !state.refresh,
      };
    case actionTypes.SET_OPEN_MSG:
      return {
        ...state,
        isOpenMsg: { open: true, ...action.payload },
      };
    case actionTypes.SET_CLOSE_MSG:
      return {
        ...state,
        isOpenMsg: { open: false, msg: "", msgType: state.isOpenMsg.msgType },
      };
    case actionTypes.SET_USER_LOCATION:
      return {
        ...state,
        user_location: { ...action.payload },
      };

    case actionTypes.UPDATE_ITEM_ID_WISE_STOCK: {
      let res = {
        ...state,
        item_id_wise_stock: {
          ...(state.item_id_wise_stock || {}),
          item_id: action.payload.item_id,
          showroom_warehouse_id: action.payload.showroom_warehouse_id,
          stock: action.payload.stock,
        },
      };
      // console.log(action,"action.payload.stock");
      
      // console.log(
      //   "in reducer, dispatching event, res.item_id_wise_stock is:\n" +
      //     JSON.stringify(res.item_id_wise_stock, null, 2)
      // );
      return res;
    }

    default:
      return state;
  }
};

export default reducer;
