window.addEventListener("load", async () => {
  firebase
    .database()
    .ref("ABCC/week7")
    .once("value", (snapshot) => {
      let arrayF = [];
      snapshot.forEach((child) => {
        arrayF.push(child.toJSON());
      });

      // document.getElementById("loading").style.display = "none";

      $(".progress-container").append(
        `<div class="progress">
            <div
              class="progressgreen"
              style="
                background-color: #2a265f;
                width: ${arrayF.length}%;
                height: 5px;
                border-radius: 10px;
              "
            ></div>
          </div>
          <span class="progress-text"> ${arrayF.length}/80 attendees </span>`
      );
    });

  await fetch("https://love-cc-a4806.firebaseio.com/seatlayout/seatlayout.json")
    .then((response) => response.json())
    .then((data) => {
      let d = JSON.parse(data).lay;
      $("#seats").append(`
        <select class="input" name="seat" id="seat">
        ${d.map((seat) => {
          return `<option value=${seat}>${seat}</option>;`;
        })}
        
        </select>
        `);
    });
});

var sss = [];

let reg1 = document.getElementById("reg1");

reg1.addEventListener("submit", (event) => {
  event.preventDefault();
  document.getElementById("sub1").innerHTML = "Loading";
  document.getElementById("sub1").setAttribute("disabled", "true");

  let name = event.target[0].value;
  let seat = event.target[1].value;
  let city = event.target[2].value;
  let phone = event.target[3].value;
  let section = event.target[4].value;

  console.log(name, city, phone);

  let run = () => {
    console.log("Double registration");
    alert("Sorry your Name is already registered");
    document.getElementById("sub1").innerHTML = "Submit";
    document.getElementById("sub1").removeAttribute("disabled");
    document.getElementById("error").classList.remove("show");
  };

  firebase
    .database()
    .ref("ABCC/week7")
    .once("value", (snapshot) => {
      let array2 = [];
      snapshot.forEach((child) => {
        array2.push(child.toJSON().name);
      });
      array2.includes(name.toLowerCase())
        ? run()
        : firebase
            .database()
            .ref("ABCC/week7")
            .push()
            .set(
              {
                section: section,
                name: name.toLowerCase(),
                city: city,
                phone: phone,
                service: section,
                date: Date.now(),
                seatNumber: seat,
              },
              (error) => {
                if (error) {
                  alert(error.message);
                } else {
                  document.getElementById("error").classList.add("show");

                  let runn = async () => {
                    await fetch(
                      "https://love-cc-a4806.firebaseio.com/seatlayout/seatlayout.json"
                    )
                      .then((response) => response.json())
                      .then((data) => {
                        console.log(data);

                        let array = JSON.parse(data).lay;

                        const result = array.filter((arr) => arr != seat);

                        console.log(seat);
                        console.log(result);

                        firebase
                          .database()
                          .ref("seatlayout")
                          .set({ seatlayout: JSON.stringify({ lay: result }) })
                          .then(() => {
                            var storageId = "parms" + String(Date.now());
                            sessionStorage.setItem(
                              storageId,
                              JSON.stringify({ data: seat })
                            );

                              window.open(
                                "./booking/thank.html" + "?sid=" + seat,
                                "_self"
                              );
                          });
                      });
                  };

                  runn();
                }
              }
            );
    });
});

let tesst = () => {
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
};
