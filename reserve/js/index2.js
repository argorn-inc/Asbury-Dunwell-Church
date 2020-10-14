let reg2 = document.getElementById("reg2");

reg2.addEventListener("submit", (event) => {
  event.preventDefault();
  document.getElementById("sub2").innerHTML = "Loading";
  document.getElementById("sub2").setAttribute("disabled", "true");

  let name = event.target[0].value;
  let city = event.target[1].value;
  let phone = event.target[2].value;

  console.log(name, city, phone);
  let run = () => {
    console.log("Double registration");
    alert("Sorry your Name is already registered");
    document.getElementById("sub2").innerHTML = "Submit";
    document.getElementById("sub2").removeAttribute("disabled");
    document.getElementById("error").classList.remove("show");
  };

  firebase
    .database()
    .ref("ABCC/week7")
    .once("value", (snapshot) => {
      let array2 = [];
      snapshot.forEach((child) => {
        if (child.toJSON().service === "second") {
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
                service: "second",
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
                        if (child.toJSON().service === "second") {
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
                        alert("Second Service is currently full");
                      }
                    });
                }
              }
            );
    });
});
