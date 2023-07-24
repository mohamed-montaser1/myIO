import dbConnect from "@/utils/dbConnect";
import User from "@/models/user";
import cookies from "@/utils/cookies";
import emailValidation from "@/utils/emailValidation";

const hanlder = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(400).json({
      success: false,
      message: "Please Make Sure That Request Method Is POST",
    });
  }
  await dbConnect();
  const { name, email, password } = req.body;
  let validEmail = emailValidation(email);
  if (!validEmail) {
    return res
      .status(400)
      .json({ success: true, message: "Please Enter A Valid Email" });
  }

  try {
    const user = await User.create({ name, email, password });
    const result = user.signJwt();
    res.cookie("accessToken", result.token, { httpOnly: true });
    res.status(200).json({
      success: true,
      message: "Sign Up Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: `Error While Saving The User - Register Process: ${error}`,
    });
  }
};

export default cookies(hanlder);
