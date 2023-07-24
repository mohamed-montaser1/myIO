import dbConnect from "@/utils/dbConnect";
import User from "@/models/user";
import cookies from "@/utils/cookies";

const hanlder = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(400).json({
      success: false,
      message: "Please Make Sure That Request Method Is POST",
    });
  }
  await dbConnect();
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      success: true,
      message: "There is no User With This Email",
    });
  }
  if (!user.comparePassword(password)) {
    return res.status(400).json({
      success: true,
      message: "Password Is Wrong",
    });
  }
  const result = user.signJwt();
  res.cookie("accessToken", result.token, { httpOnly: true });
  res.status(200).json();
};

export default cookies(hanlder);
