import React, { useRef, useState,useEffect } from 'react'
import IdleTimer from 'react-idle-timer'
import { useHistory } from "react-router-dom";

import { IdleTimerProvider, useIdleTimer } from 'react-idle-timer'

import { UserLogOut } from "../services/AuthService";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { SettingsPowerRounded } from '@mui/icons-material';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const IdleTimerContainer = () => {
  const [open,setOpen] = useState(false)
  const timeout = 1000 * 60 * 15
  const sessionTimeoutRef = useRef(6000);

  const history = useHistory();

  const handleOnIdle = () => {
    setOpen(true)
    reset()

    // UserLogOut(
    //   (r) => {
    //     sessionStorage.removeItem("user_token")
    //     setOpen(true)
    //     history.push("/auth");
    //     // removeCookie("localhost");
    //     // const { cookies } = props;
    //     // cookies.remove('Token');
    //     // window.location.href = '/auth';

    //     caches.keys().then((names) => {
    //       names.forEach((name) => {
    //         caches.delete(name);
    //       });
    //     });
    //   }

    // );
  }


  const {
    reset,
    // pause,
    // resume,
    // isLeader,
    // getRemainingTime,
    // getLastActiveTime,
    // getElapsedTime,
    // getTotalIdleTime,
  } = useIdleTimer({
    timeout,
    onIdle: handleOnIdle
  })
  
  const handleClose = (event, reason) => {
    setOpen(false)
    if (reason === "clickaway") {
      return;
    }
  };
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }
        }
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error">
          Idle For 15 Min
        </Alert>
      </Snackbar>

    </div>
  )
}

export default IdleTimerContainer;


// import React, { useRef, useState,useEffect } from 'react'
// import IdleTimer from 'react-idle-timer'
// import { useHistory } from "react-router-dom";

// import { IdleTimerProvider, useIdleTimer } from 'react-idle-timer'

// import { UserLogOut } from "../services/AuthService";

// import Snackbar from "@material-ui/core/Snackbar";
// import MuiAlert from "@material-ui/lab/Alert";
// import { SettingsPowerRounded } from '@mui/icons-material';

// function Alert(props) {
//   return <MuiAlert elevation={6} variant="filled" {...props} />;
// }

// const IdleTimerContainer = () => {
//   const [open,setOpen] = useState(false)
//   const timeout = 60000 * 15
//   const history = useHistory();

//   const [remaining, setRemaining] = useState(timeout)
//   const [elapsed, setElapsed] = useState(0)
//   const [lastActive, setLastActive] = useState(+new Date())
//   const [isIdle, setIsIdle] = useState(false)

//   const handleOnActive = () => setIsIdle(false)
//   const handleOnIdle = () => {
//     setIsIdle(true)
//     setOpen(true)
//     UserLogOut(
//       (r) => {
//         // console.log("logged cookies",removeCookie)
//         sessionStorage.removeItem("user_token")
//         setOpen(true)
//         history.push("/");
//         // removeCookie("localhost");
//         // const { cookies } = props;
//         // cookies.remove('Token');
//         // window.location.href = '/';

//         caches.keys().then((names) => {
//           names.forEach((name) => {
//             caches.delete(name);
//           });
//         });
//       }

//     );
//   }

//   const {
//     // reset,
//     // pause,
//     // resume,
//     getRemainingTime,
//     getLastActiveTime,
//     getElapsedTime
//   } = useIdleTimer({
//     timeout,
//     onActive: handleOnActive,
//     onIdle: handleOnIdle
//   })

//   // const handleReset = () => reset()
//   // const handlePause = () => pause()
//   // const handleResume = () => resume()

//   useEffect(() => {
//     setRemaining(getRemainingTime())
//     setLastActive(getLastActiveTime())
//     setElapsed(getElapsedTime())

//     setInterval(() => {
//       setRemaining(getRemainingTime())
//       setLastActive(getLastActiveTime())
//       setElapsed(getElapsedTime())
//     }, 1000)
//   }, [])

//   const handleClose = (event, reason) => {
//     setOpen(false)
//     if (reason === "clickaway") {
//       return;
//     }
//   };
//   return (
//     <div>
//       {/* <IdleTimer ref={idleTimerRef} onIdle={onIdle}></IdleTimer> */}

//       <Snackbar
//         anchorOrigin={{ vertical: "top", horizontal: "center" }
//         }
//         open={open}
//         autoHideDuration={3000}
//         onClose={handleClose}
//       >
//         <Alert onClose={handleClose} severity="error">
//           Idle For 15 Min
//         </Alert>
//       </Snackbar>

//     </div>
//   )
// }

// export default IdleTimerContainer;




// // import React, { useRef, useState,useEffect } from 'react'
// // import IdleTimer from 'react-idle-timer'
// // import { useHistory } from "react-router-dom";

// // import { IdleTimerProvider, useIdleTimer } from 'react-idle-timer'

// // import { UserLogOut } from "../services/AuthService";

// // import Snackbar from "@material-ui/core/Snackbar";
// // import MuiAlert from "@material-ui/lab/Alert";
// // import { SettingsPowerRounded } from '@mui/icons-material';

// // function Alert(props) {
// //   return <MuiAlert elevation={6} variant="filled" {...props} />;
// // }

// // const IdleTimerContainer = () => {
// //   const [open,setOpen] = useState(false)
// //   const timeout = 60000 * 15
// //   const history = useHistory();

// //   const [remaining, setRemaining] = useState(timeout)
// //   const [elapsed, setElapsed] = useState(0)
// //   const [lastActive, setLastActive] = useState(+new Date())
// //   const [isIdle, setIsIdle] = useState(false)

// //   const handleOnActive = () => setIsIdle(false)
// //   const handleOnIdle = () => {
// //     setIsIdle(true)
// //     setOpen(true)
// //     UserLogOut(
// //       (r) => {
// //         // console.log("logged cookies",removeCookie)
// //         sessionStorage.removeItem("user_token")
// //         setOpen(true)
// //         history.push("/");
// //         // removeCookie("localhost");
// //         // const { cookies } = props;
// //         // cookies.remove('Token');
// //         // window.location.href = '/';

// //         caches.keys().then((names) => {
// //           names.forEach((name) => {
// //             caches.delete(name);
// //           });
// //         });
// //       }

// //     );
// //   }

// //   const {
// //     // reset,
// //     // pause,
// //     // resume,
// //     getRemainingTime,
// //     getLastActiveTime,
// //     getElapsedTime
// //   } = useIdleTimer({
// //     timeout,
// //     onActive: handleOnActive,
// //     onIdle: handleOnIdle
// //   })

// //   // const handleReset = () => reset()
// //   // const handlePause = () => pause()
// //   // const handleResume = () => resume()

// //   useEffect(() => {
// //     setRemaining(getRemainingTime())
// //     setLastActive(getLastActiveTime())
// //     setElapsed(getElapsedTime())

// //     setInterval(() => {
// //       setRemaining(getRemainingTime())
// //       setLastActive(getLastActiveTime())
// //       setElapsed(getElapsedTime())
// //     }, 1000)
// //   }, [])

// //   const handleClose = (event, reason) => {
// //     setOpen(false)
// //     if (reason === "clickaway") {
// //       return;
// //     }
// //   };
// //   return (
// //     <div>
// //       {/* <IdleTimer ref={idleTimerRef} onIdle={onIdle}></IdleTimer> */}

// //       <Snackbar
// //         anchorOrigin={{ vertical: "top", horizontal: "center" }
// //         }
// //         open={open}
// //         autoHideDuration={3000}
// //         onClose={handleClose}
// //       >
// //         <Alert onClose={handleClose} severity="error">
// //           Idle For 15 Min
// //         </Alert>
// //       </Snackbar >

// //     </div>
// //   )
// // }

// // export default IdleTimerContainer;

