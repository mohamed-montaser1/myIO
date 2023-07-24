import User from "@/models/user";
import auth from "@/utils/auth";
import emailValidation from "@/utils/emailValidation";

const handler = async (req, res) => {
  if (req.method !== "POST") return res.status(400).json();
  const { name, email } = req.body;
  let validEmail = emailValidation(email);
  if (!validEmail) {
    return res
      .status(400)
      .json({ success: true, message: "Please Enter A Valid Email" });
  }
  try {
    await User.findByIdAndUpdate(req.user.id, { name, email });
    res.status(200).json();
  } catch (error) {
    res.status(400).json();
  }
};

export default auth(handler);
