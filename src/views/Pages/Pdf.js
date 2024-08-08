import React from 'react';
import { jsPDF } from "jspdf";


const Pdf = () => {

  const pdfDownload = e => {
      e.preventDefault()
      let doc = new jsPDF("landscape", 'pt', 'A4');
      doc.html(document.getElementById('pdf-view'), {
        callback: () => {
          doc.save('test.pdf');
        }
      });
  }
    return (
      <div>
        <div id="pdf-view">
          <h1 style={{color: '#000'}}>Marudhar Marble PDF</h1>
        </div>
        <button onClick={pdfDownload}>Download as pdf</button>
      </div>
    );
}

export default Pdf;

// import * as React from 'react';

// export default function App() {

// // Function to clear complete cache data
// const clearCacheData = () => {
// 	caches.keys().then((names) => {
// 	names.forEach((name) => {
// 		caches.delete(name);
// 	});
// 	});
// 	alert('Complete Cache Cleared')
// };

// return (
// 	<div style={{ height: 500, width: '80%' }}>
// 	<h4>How to clear complete cache data in ReactJS?</h4>
// 	<button onClick={() => clearCacheData()} >
// 		Clear Cache Data</button>
// 	</div>
// );
// }



// import React from "react";
// import { useCookies } from "react-cookie";

// export default function App() {
//   const [cookies, setCookie, removeCookie] = useCookies(["user"]);

//   function handleSetCookie() {
//     setCookie("user", "obydul", { path: '/' });
//   }

//   function handleRemoveCookie() {
//     removeCookie("user");
//   }

//   return (
//     <div className="App">
//       <h1>React Cookie</h1>
//       <p>{cookies.user}</p> {/* access user cookie */}
//       <button onClick={handleSetCookie}>Set Cookie</button>
//       <button onClick={handleRemoveCookie}>Remove Cookie</button>
//     </div>
//   );
// }