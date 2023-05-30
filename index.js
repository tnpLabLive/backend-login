const express = require("express");
const app = express();

// this is for cookies
const cookieParser = require("cookie-parser");

// this is for creating(signature) and verify jwt signature
var jwt = require("jsonwebtoken");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



app.post("/createjwt", (req, res) => {
  const body = req.body;

  try {
      // sign methods takes at first: data, and second: secret Key, third: expiry date
    const data = jwt.sign(body, "kjdfngkljdfgdfgb", {
      expiresIn:"1day"
    });

    res.status(200).json({ data});
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.post("/verifyjwt", (req, res) => {
  const body = req.body;

  try {
    // verify method to verify jwt token, first param: jwt token, second: secret Key
    const data = jwt.verify(body.data, "kjdfngkljdfgdfgb");

    // this is used for cookie
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      secure: true,
      httpOnly: true,
      sameSite: "none",
      path: "/",
    };

    // Here, we are making and storing in cookie. cookie first param: Keyname, second param: data, third is option
    res.status(200).cookie("Deepak", data, options ).json({ status:"true", data });

  } catch (error) {
    res.status(500).json({ error });
  }
});

app.post("/clearcookie", (req, res) => {
  try {
    // this is for clear clear cookie
    res.status(200).clearCookie("Deepak").json({ status:"true" });
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.listen(5005, () => {
  console.log("server running");
});
