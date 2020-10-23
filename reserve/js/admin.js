window.addEventListener("load", () => {
  firebase
    .database()
    .ref("ABCC/currentWeek")
    .once("value", (snapshot) => {
      let array = [];
      snapshot.forEach((child) => {
        array.push(child.toJSON());
      });
      array.map((item, index) => {
        $("#tab").append(
          "<tr> <td style='text-align: center'>" +
            item.seatNumber +
            "</td><td style='text-align: center; text-transform: capitalize;'>" +
            item.name +
            "</td> <td style='text-align: center'>" +
            item.service +
            "</td> <td style='text-align: center'>" +
            item.phone +
            "</td>  <td style='text-align: center'>" +
            item.city +
            `</td> <td style="text-align: center">${new Date(
              item.date
            )}</td> </tr>`
        );
      });
    });
});

function sortby(arg) {
  console.log("sortby");
  document.getElementById("tab").innerHTML = "";
  document.getElementById("tab").innerHTML = "";
  firebase
    .database()
    .ref("ABCC/currentWeek")
    .once("value", (snapshot) => {
      let array = [];
      snapshot.forEach((child) => {
        if (child.toJSON().service == arg) {
          array.push(child.toJSON());
        }
      });
      array.map((item, index) => {
        $("#tab").append(
          "<tr> <td style='text-align: center'>" +
            item.seatNumber +
            "</td><td style='text-align: center; text-transform: capitalize;'>" +
            item.name +
            "</td> <td style='text-align: center'>" +
            item.service +
            "</td> <td style='text-align: center'>" +
            item.phone +
            "</td>  <td style='text-align: center'>" +
            item.city +
            `</td> <td style="text-align: center">${new Date(
              item.date
            )}</td> </tr>`
        );
      });
    });
}

document.getElementById("print").addEventListener("click", () => {
  var url =
    "data:application/vnd.ms-excel," +
    encodeURIComponent($("#tablewrap").html());
  location.href = url;
  return false;
});

document.getElementById("reset").addEventListener("click", () => {
  console.log("reseting ...");
  document.getElementById("reset").innerHTML = "Loading";
  document.getElementById("reset").setAttribute("disabled", "true");
  // alert("Database id reseting")
  firebase
    .database()
    .ref("seatlayout")
    .update({
      seatlayout: JSON.stringify({
        lay: [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          16,
          17,
          18,
          19,
          20,
          21,
          22,
          23,
          24,
          25,
          26,
          27,
          28,
          29,
          30,
          31,
          32,
          33,
          34,
          35,
          36,
          37,
          38,
          39,
          40,
          41,
          42,
          43,
          44,
          45,
          46,
          47,
          48,
          49,
          50,
          51,
          52,
          53,
          54,
          55,
          56,
          57,
          58,
          59,
          60,
          61,
          62,
          63,
          64,
          65,
          66,
          67,
          68,
          69,
          70,
          71,
          72,
          73,
          74,
          75,
          76,
          77,
          78,
          79,
          80,
        ],
      }),
    });
  firebase
    .database()
    .ref("ABCC/currentWeek")
    .once("value", (snapshot) => {
      firebase
        .database()
        .ref("ABCC/pastWeeks")
        .push(snapshot.val())
        .then(() => {
          firebase.database().ref("ABCC/currentWeek").remove();
        });
    })
    .then(() => {
      // alert("Database id reseting")
      document.getElementById("reset").innerText = "Reset";
      document.getElementById("reset").removeAttribute("disabled");
    });
});

document.getElementById("clear").addEventListener("click", () => {
  console.log("clearing ...");
  document.getElementById("clear").innerHTML = "Loading";
  document.getElementById("clear").setAttribute("disabled", "true");
  // alert("Database id clearing")
  firebase
    .database()
    .ref("seatlayout")
    .update({
      seatlayout: JSON.stringify({
        lay: [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          16,
          17,
          18,
          19,
          20,
          21,
          22,
          23,
          24,
          25,
          26,
          27,
          28,
          29,
          30,
          31,
          32,
          33,
          34,
          35,
          36,
          37,
          38,
          39,
          40,
          41,
          42,
          43,
          44,
          45,
          46,
          47,
          48,
          49,
          50,
          51,
          52,
          53,
          54,
          55,
          56,
          57,
          58,
          59,
          60,
          61,
          62,
          63,
          64,
          65,
          66,
          67,
          68,
          69,
          70,
          71,
          72,
          73,
          74,
          75,
          76,
          77,
          78,
          79,
          80,
        ],
      }),
    });
  firebase
    .database()
    .ref("ABCC/currentWeek")
    .remove()
    .then(() => {
      // alert("Database id clearing")
      document.getElementById("clear").innerText = "clear";
      document.getElementById("clear").removeAttribute("disabled");
    });
});
