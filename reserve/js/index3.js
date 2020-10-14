let reg3 = document.getElementById("reg3");

reg3.addEventListener("submit", (event) => {
  event.preventDefault();
  document.getElementById("sub3").innerHTML = "Loading";
  document.getElementById("sub3").setAttribute("disabled", "true");

  let name = event.target[0].value;
  let city = event.target[1].value;
  let phone = event.target[2].value;

  console.log(name, city, phone);

  let run = () => {
    console.log("Double registration");
    alert("Sorry your Name is already registered");
    document.getElementById("sub3").innerHTML = "Submit";
    document.getElementById("sub3").removeAttribute("disabled");
    document.getElementById("error").classList.remove("show");
  };

  firebase
    .database()
    .ref("ABCC/week7")
    .once("value", (snapshot) => {
      let array2 = [];
      snapshot.forEach((child) => {
        if (child.toJSON().service === "third") {
          array2.push(child.toJSON().name);
        }
      });
      array2.includes(name.toLowerCase())
        ? run()
        : firebase
            .database()
            .ref("ABCC/week7")
            .push()
            .set(
              {
                name: name.toLowerCase(),
                city: city,
                phone: phone,
                service: "third",
                date: Date.now(),
                seatNumber: array2.length + 1
              },
              (error) => {
                if (error) {
                  alert(error.message);
                } else {
                  document.getElementById("error").classList.add("show");
                  firebase
                    .database()
                    .ref("ABCC/week7")
                    .once("value", (snapshot) => {
                      let array = [];
                      snapshot.forEach((child) => {
                        if (child.toJSON().service === "third") {
                          array.push(child.toJSON());
                        }
                      });
                      var storageId = "parms" + String(Date.now());
                      sessionStorage.setItem(
                        storageId,
                        JSON.stringify({ data: array.length })
                      );
                      if (array.length < 100) {
                        window.open(
                          "../booking/thank.html" + "?sid=" + storageId,
                          "_self"
                        );
                      } else {
                        alert("Third Service is currently full");
                      }
                    });
                }
              }
            );
    });
});
