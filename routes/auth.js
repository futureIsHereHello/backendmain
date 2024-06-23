const { Router } = require("express");
const User = require("../modals/user");
const { validateSignup } = require("../utils/validateAuth");
const get_response_dict = require("../utils/response");
const bcrypt = require("bcryptjs");

const router = Router();

router.post("/signup", async (req, res) => {
  const result = validateSignup(req.body);
  if (result.error) {
    const response = get_response_dict(
      400,
      result.error.details[0].message,
      null
    );
    return res.status(400).json(response);
  }
  const {
    value: { username, email, password },
  } = result;
  try {
    const emailExist = await User.findOne({ email });
    const usernameExist = await User.findOne({ username });

    if (emailExist) {
      return res
        .status(400)
        .json(
          get_response_dict(400, "User with this email alredy exist!", null)
        );
    }
    if (usernameExist) {
      return res
        .status(400)
        .json(
          get_response_dict(400, "User with this username alredy exist!", null)
        );
    }
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let user = new User({ username, email, password: hashedPassword });
    await user.save();

    return res
      .status(400)
      .json(get_response_dict(201, "Succesfully registed!", null));
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error" });
  }
});

module.exports = router;
