import moment from "moment";

export const financialYears = () => {
    const Fy = {
        currentFy: localStorage?.financial,
        nextFy: `${moment().format("yy")}-${Number(moment().format("yy")) + 1}`
    }
    return Fy
}

export function calculatePer(discValue, totalValue) {
    return Number(((100 * Number(discValue)) / Number(totalValue)));
}

export const calculatePerValue = (percent, totalValue) => {
    return Number((Number(totalValue) * (Number(percent) / 100)).toFixed(2));
};

export const currentDateAddOne = (addDay = 1) => {
    return moment().add(addDay, "days").format("YYYY-MM-DD");
};

export const currentDate = (addDay = 0) => {
    let financialYears = (localStorage?.financial).split("-")
    // //console.log(financialYears[0],"sen16012023/")
    //console.log(moment(moment().format("YYYY-MM-DD")).unix("x"), "sen16012023/y")
    //console.log(moment().add(addDay, "days").year(financialYears[1]).format("YYYY-03-31"), "sen16012023/4")

    const currentDay = moment(moment().format("YYYY-MM-DD")).unix("x")
    const currentFyStart = moment(moment().add(addDay, "days").year(financialYears[0]).format("YYYY-04-01")).unix('x')
    const currentFyEnd = moment(moment().add(addDay, "days").year(financialYears[1]).format("YYYY-03-31")).unix('x')
    
    if (currentDay >= currentFyStart && currentFyEnd >= currentDay) {
        return moment().add(addDay, "days").format("YYYY-MM-DD");
    }
    else {
        return moment().add(addDay, "days").year(financialYears[1]).format("YYYY-03-31")
    }

};
export const currentDateF = (addDay = 0) => {
    let financialYears = (localStorage?.financial).split("-")
    // //console.log(financialYears[0],"sen16012023/")
    //console.log(localStorage, "sen16012023/localstorage")


    // //console.log(moment().year(financialYears[0]).format("MM"),"sen16012023/y")
    // //console.log(moment().add(addDay, "days").year(financialYears[1]).format("YYYY-MM-DD"),"sen16012023/4")

    return moment().add(addDay, "days").year(financialYears[1]).format("DD-MM-YYYY");
};

export const currentMonth = (addMonth = 0) => {
    return moment().add(addMonth, "months").format("MM");
};

export const currentYear = (addYear = 0) => {
    return moment().add(addYear, "years").format("YYYY");
};

export const currentDate1 = (addDay = 15) => {
    let financialYears = (localStorage.financial).split("-")
    return moment().subtract(addDay, "days").year(financialYears[0]).format("YYYY-04-01");
};

export const currentDate1Pdf = (addDay = 15) => {
    return moment().subtract(addDay, "days").format("01 - 04 - 2022");
};
export const currentDatePdf = (addDay = 0) => {
    return moment().add(addDay, "days").format("DD - MM - YYYY");
};

//time convertion
export const timeToUnix = (time) => {
    return moment(time, "hh:mm").utcOffset("+5:30").unix();
};
export const IstTime = (time) => {
    return moment(moment.unix(time).utc()._d).format("hh:mm");
};
///////end
export const currentTime = () => {
    return moment().format("HH:mm");
};

export const currentTime1 = () => {
    return moment().format("HH:mm");
};

export const dateFormate = (date) => {
    return moment.unix(date).format("DD-MM-YYYY");
};

export const dateFormateOnlyDM = (date) => {
    // let cardDate=
    return moment.unix(date).format("D MMM");
};

export const dateFormateField = (date) => {
    return moment(date, "DD-MM-YYYY").format("YYYY-MM-DD");
};

export const currencyFormate = (currency) => {
    // if (!currency) return "00";
    // let x = currency.toString();
    // let lastThree = x.substring(x.length - 3);
    // let otherNumbers = x.substring(0, x.length - 3);
    // if (otherNumbers != "") lastThree = "," + lastThree;
    // return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;

    // return Number(currency).toLocaleString("en-IN", {
    //     maximumFractionDigits: 2,
    // });

    //Intl.NumberFormat
    return Number(currency).toLocaleString("en-IN", {
        maximumFractionDigits: 2,
        style: "currency",
        currency: "INR",
    }).replace('₹', '₹ ');
};


// const num1 = 1000;
// const num2 = 129943;
// const num3 = 76768798;
// const toIndianCurrency = (num) => {
//    const curr = num.toLocaleString('en-IN', {
//       style: 'currency',
//       currency: 'INR'
//    });
// return curr;
// };
// //console.log(toIndianCurrency(num1));
// //console.log(toIndianCurrency(num2));
// //console.log(toIndianCurrency(num3));

// export const currencyFormateNew = (currency) => {
//     // if (!currency) return "00";
//     // let x = currency.toString();
//     // let lastThree = x.substring(x.length - 3);
//     // let otherNumbers = x.substring(0, x.length - 3);
//     // if (otherNumbers != "") lastThree = "," + lastThree;
//     // return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;

//     return 'xx'
// };

export const sortWord = (property) => {
    var sortOrder = 1;
    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a, b) {
        /* next line works with strings and numbers, 
         * and you may want to customize it to your needs
         */
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

var a = [
    "",
    "one ",
    "Two ",
    "Three ",
    "Four ",
    "Five ",
    "Six ",
    "Seven ",
    "Eight ",
    "Nine ",
    "Ten ",
    "Eleven ",
    "Twelve ",
    "Thirteen ",
    "Fourteen ",
    "Fifteen ",
    "Sixteen ",
    "Seventeen ",
    "Eighteen ",
    "Nineteen ",
];
var b = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
];

export const priceInWord = (num) => {
    if ((num = num.toString()).length > 9) return "overflow";
    let n = ("000000000" + num)
        .substr(-9)
        .match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return;
    var str = "";
    str +=
        n[1] != 0 ?
            (a[Number(n[1])] || b[n[1][0]] + " " + a[n[1][1]]) + "Crore " :
            "";
    str +=
        n[2] != 0 ?
            (a[Number(n[2])] || b[n[2][0]] + " " + a[n[2][1]]) + "Lakh " :
            "";
    str +=
        n[3] != 0 ?
            (a[Number(n[3])] || b[n[3][0]] + " " + a[n[3][1]]) + "Thousand " :
            "";
    str +=
        n[4] != 0 ?
            (a[Number(n[4])] || b[n[4][0]] + " " + a[n[4][1]]) + "Hundred " :
            "";
    str +=
        n[5] != 0 ?
            (str != "" ? "and " : "") +
            (a[Number(n[5])] || b[n[5][0]] + " " + a[n[5][1]]) +
            "Only " :
            "";
    return str;
};

export const timestamp = (date) => {
    return moment(date).unix();
};

export const setIdToLocal = (name, id) => {
    return localStorage.setItem(name, JSON.stringify(id));
};
export const getIdToLocal = (name) => {
    return Number(localStorage.getItem(name));
};

export const allStates = [
    { value: "andhra", label: "Andhra Pradesh" },
    { value: "arunachal", label: "Arunachal Pradesh" },
    { value: "assam", label: "Assam" },
    { value: "bihar", label: "Bihar" },
    { value: "chhattisgarh", label: "Chhattisgarh" },
    { value: "goa", label: "Goa" },
    { value: "gujarat", label: "Gujarat" },
    { value: "haryana", label: "Haryana" },
    { value: "himachal", label: "Himachal Pradesh" },
    { value: "jharkhand", label: "Jharkhand" },
    { value: "karnataka", label: "Karnataka" },
    { value: "kerala", label: "Kerala" },
    { value: "madhya", label: "Madhya Pradesh" },
    { value: "maharashtra", label: "Maharashtra" },
    { value: "manipur", label: "Manipur" },
    { value: "meghalaya", label: "Meghalaya" },
    { value: "mizoram", label: "Mizoram" },
    { value: "nagaland", label: "Nagaland" },
    { value: "odisha", label: "Odisha" },
    { value: "punjab", label: "Punjab" },
    { value: "rajasthan", label: "Rajasthan" },
    { value: "sikkim", label: "Sikkim" },
    { value: "tamil Nadu", label: "Tamil Nadu" },
    { value: "telangana", label: "Telangana" },
    { value: "tripura", label: "Tripura" },
    { value: "uttar Pradesh", label: "Uttar Pradesh" },
    { value: "uttarakhand", label: "Uttarakhand" },
    { value: "west Bengal", label: "West Bengal" },
];