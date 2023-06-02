var jwt = require("jsonwebtoken");

const dbuser = [
  { email: "sumit@gmail.com", password: "12345", role: "admin" },
  { email: "amain@gmail.com", password: "123455", role: "user" },
];

const dbpost = [
  {
    email: "sumit@gmail.com",
    id: 1,
    title: "delectus aut autem",
    completed: false,
  },
  {
    email: "sumit@gmail.com",
    id: 2,
    title: "quis ut nam facilis et officia qui",
    completed: false,
  },
  {
    email: "amain@gmail.com",
    id: 3,
    title: "fugiat veniam minus",
    completed: false,
  },
  {
    email: "amain@gmail.com",
    id: 4,
    title: "et porro tempora",
    completed: true,
  },
  {
    email: "amain@gmail.com",
    id: 5,
    title: "laboriosam mollitia et enim quasi adipisci quia provident illum",
    completed: false,
  },
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

        // this is used for cookie
        const options = {
          expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          httpOnly: true,
        };

        return res
          .status(200)
          .cookie("token", token, options)
          .json({ token, user: findEmail });
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

const Post = async (req, res) => {
  try {
    const getToken = req.cookies.token;

    if (!getToken) {
      return res.status(200).json({ error: "token not found" });
    }

    const getUser = jwt.verify(getToken, "12345dwewewe67");

    const post = dbpost.filter((value) => value.email === getUser.email);
    return res.status(200).json({ post });
  } catch (error) {
    return res.status(200).json({ error: error.message });
  }
};

const RequestPost = (req, res) => {
  try {
    const body = req.body;

    const getToken = req.header("Authorization")?.replace("Bearer ", "");

    const getUser = jwt.verify(getToken, "12345dwewewe67");

    return res.status(200).json({ data: body });
  } catch (error) {
    return res.status(200).json({ error: error.message });
  }
};

const Logout = async (req, res) => {
  try {
    
    return res.status(200).clearCookie("token").json({
      succes: true,
    });
  } catch (error) {}
};

module.exports = { Login, Post, RequestPost, Logout };
