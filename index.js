import smalls from "./small.js";
let logInJSON = { lowLevel: false, userName: "xxxx", secret: "xxxx" };

fetch("http://xxxx:xxxx/ccos/api/auth/admin", {
  method: "POST",
  body: JSON.stringify(logInJSON),
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) => response.json())
  .then((json) => {
    console.log(json);
    console.log(json.session.sessionId);
    const authToken = json.session.sessionId;
    let index = 0;

    for (let i = 45001; i <= smalls.length; i++) {
      let newSmall = [{ ...smalls[i] }];
      newSmall.forEach((small) => {
        fetch("http://xxxx:xxxx/ccos/api/internal/users", {
          method: "POST",
          body: JSON.stringify(small),
          headers: {
            "Content-Type": "application/json",
            Cookie: `JSESSIONID=${authToken}`,
          },
        })
          .then((response) => response.json())
          .then((json) => {
            console.log(json);
            console.log(small.firstName + " " + small.lastName);
            console.log(index++);
          })
          .catch((error) => {
            console.error("error: ", error.message);
          });
      });
    }
  });
