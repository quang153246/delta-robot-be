
// OTP
export const generateOtp = () => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  let expiry = new Date();
  expiry.setTime(new Date().getTime() + 30 * 60 * 1000); // 30 munites
  return { otp, expiry };
};

// Request OTP

export const onRequestOtp = async (otp: number) => {
  const nodemailer = require("nodemailer");
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "quang153246@gmail.com",
      pass: "quang1403",
    },
  });

  var mailOptions = {
    from: "quang153246@gmail.com",
    to: "quang153246@gmail.com",
    subject: "OTP from Delta Robot backend",
    text: `Your OTP is: ${otp}`,
  };

  await transporter.sendMail(mailOptions, (err:any) => {
    if (err) {
      return console.log("lỗi gửi mail")
    }
    return console.log("Gửi mail thành công")
  });

  // return response;
};
