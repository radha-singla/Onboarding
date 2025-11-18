const Model = require("../model");
const Message = require("../constant/message").en;
//const { sendEmail } = require("../utils/mailer");
// const { sendEmail } = require("../utils/mailer");

const { createToken } = require("../utils/createToken");
const { resetToken } = require("../utils/createToken");
const { expireDoc } = require("../utils/expires");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports.signup = async (data) => {
  try {
    const { fullName, gender, password, email, phone, countryCode } = data;

    const checkExistinguser = await Model.users.findOne({ email });
    if (checkExistinguser) {
      throw new Error(Message.THIS_EMAIL_ALREADY_EXIST);
    }

    const tempExisting = await Model.tempUser.findOne({ email });
    if (tempExisting) {
      await Model.tempUser.deleteOne({ email });
    }

    const token = await createToken({ email });
    const expiryTime = expireDoc();

    // await Model.tempUser.create({
    //   fullName,
    //   gender,
    //   email,
    //   password,
    //   phone,
    //   countryCode,
    //   token,
    //   expireAt: expiryTime,
    // });
    // await sendEmail(email, token);

    await Model.users.create({
      fullName,
      gender,
      email,
      password,
      phone,
      countryCode,
      isVerified: true,
    });

    return {
      // message: Message.VERIFICATION_LINK_SENT,
      message : Message.SUCCESS
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports.verify = async (token1) => {
  try {
    const decoded = jwt.verify(token1, process.env.SECRET_KEY);

    const { email } = decoded.tokenData;
    const findUser = await Model.users.findOne({ email });
    if (findUser) {
      throw new Error(Message.ALREADY_VERIFIED);
    }

    const tempUser = await Model.tempUser.findOne({ email });

    if (!tempUser) {
      throw new Error(Message.NO_VERIFICATION_RECORD_FOUND_OR_LINK_EXPIRED);
    }

    const userData = await Model.users.create({
      fullName: tempUser.fullName,
      gender: tempUser.gender,
      email: tempUser.email,
      password: tempUser.password,
      phone: tempUser.phone,
      countryCode: tempUser.countryCode,
      isVerified: true,
    });

    await Model.tempUser.findByIdAndDelete(tempUser._id);

    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
    await Model.sessions.create({
      userId: userData._id,
      expiresAt,
    });

    const tokenData = {
      id: userData._id,
    };
    const token = await createToken(tokenData);

    return {
      message: Message.VERIFY_SUCCESSFULLY,
      _id: userData._id,
      token,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports.updateProfile = async (id, data) => {
  try {
    const { fullName, email, phone, countryCode, password, gender } = data;

    await Model.users.findByIdAndUpdate(id, data, { new: true });

    return {
      message: Message.PROFILE_UPDATED_SUCCESSFULY,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports.login = async (data) => {
  try {
    const { email, phone, countryCode, password } = data;

    const identifier = email ? { email } : { phone };

    const findUser = await Model.users.findOne(identifier);
    if (!findUser) {
      throw new Error(Message.EMAIL_PASSWORD_INCORRECT);
    }
    if (email) {
      if (findUser.isVerified !== true) {
        throw new Error(Message.EMAIL_NOT_VERIFIED);
      }
    }
    if (phone) {
      if (findUser.isPhoneNoVerified !== true) {
        throw new Error(Message.PHONENO_IS_NOT_VERIFIED);
      }
    }
    console.log(findUser.password);

    const isMatch = await bcrypt.compare(password, findUser.password);

    console.log(isMatch);

    if (!isMatch) {
      throw new Error(Message.EMAIL_PASSWORD_INCORRECT);
    }

    const tokenData = {
      id: findUser._id,
    };
    const token = await createToken(tokenData);
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
    await Model.sessions.create({
      userId: findUser._id,
      expiresAt,
    });

    return {
      message: Message.LOGIN,
      _id: findUser._id,
      token,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports.logout = async (id) => {
  try {
    const findLoginuser = await Model.sessions.findOneAndDelete(id);
    if (!findLoginuser) {
      throw new Error(Message.USER_ALREADY_LOGOUT);
    }
    console.log(88);

    return {
      message: Message.LOGOUT,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports.forgot = async (data) => {
  try {
    const { email, phone } = data;

    if (!email && !phone) {
      throw new Error(Message.PLEASE_PROVIDE_EMAIL_OR_PHONENO);
    }
    const findUser = await Model.users.findOne({ $or: [{ email }, { phone }] });
    if (!findUser) {
      throw new Error(Message.THIS_EMAIL_AS_NO_ACCOUNT);
    }

    if (email) {
      if (email && findUser && findUser.isVerified !== true) {
        throw new Error(Message.EMAIL_NOT_VERIFIED);
      }
    }
    const otp = 1234;
    if (findUser) {
      await Model.otps.create({
        email,
        phone,
        otp,
      });
    }

    return {
      message: Message.OTP_SEND,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
module.exports.verifyOtp = async (data) => {
  try {
    const { email, otp } = data;
    const checkOtp = await Model.otps.findOne({ email, otp });

    if (!checkOtp) {
      throw new Error(Message.INVALID_OTP);
    }
    const tokenData1 = {
      email: checkOtp.email,
    };
    const token1 = await resetToken(tokenData1);
    await Model.otps.findByIdAndDelete(checkOtp._id);

    return {
      message: Message.VERIFY_SUCCESSFULLY,
      token1,
    };
  } catch (error) {
    console.log();
    throw error;
  }
};

module.exports.resetPassword = async (email, data) => {
  try {
    const { password, confirmPassword } = data;
    if (password !== confirmPassword) {
      throw new Error(Message.PASSWORD_AND_CONFIRMPASSWORD_INCORRECT);
    }
    const user = await Model.users.findOne({ email });
    if (!user) {
      throw new Error("user not found");
    }
    const hashPwd = await bcrypt.hash(password, 10);

    await Model.users.findOneAndUpdate(
      { email },
      { $set: { password: hashPwd } }
    );

    return {
      message: Message.RESET,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
