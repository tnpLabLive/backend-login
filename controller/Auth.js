var jwt = require("jsonwebtoken");

const dbuser = [
  { email: "sumit@gmail.com", password: "12345" },
  { email: "amain@gmail.com", password: "123455" },
];

const Login = (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email && !password) {
      return res.status(200).json({ message: "enter email and password" });
    }

    const findEmail = dbuser.find((value) => value.email === email);

    if (findEmail) {
      const userDetail = findEmail.password === password;
      if (userDetail) {
        const token = jwt.sign(findEmail, "12345dwewewe67", {
          expiresIn: "1day",
        });
        
        return res.status(200).json({ token, email: findEmail.email });
      } else {
        return res.status(200).json({ message: "Password incorrect" });
      }
    } else {
      return res.status(200).json({ userDetail: "Not find user" });
    }
  } catch (error) {
    return res.status(200).json({ data: "Dee" });
  }
};

module.exports = { Login };
