const Model = require("../model");
const Validation = require("../validation");
const Message = require("../constant/message").en;
const { sendEmail } = require("../utils/mailer");
const { createToken } = require("../utils/createToken");

module.exports.signup = async (data) => {
  try {
    const { email, phone, countryCode } = data;

    let otp;
    if (email) {
      const finduser1 = await Model.users.findOne({ email });
      if (finduser1) {
        throw new Error(Message.THIS_EMAIL_ALREADY_EXIST);
      }
      otp = Math.floor(1000 + Math.random() * 9000);
      console.log(otp);
      await sendEmail(email, otp);
    } else if (phone) {
      const findUser = await Model.users.findOne({ phone });
      if (findUser) {
        throw new Error(Message.THIS_PHONENO_ALREADY_EXIST);
      }
      otp = 1234;
    }
    const saveOtp = await Model.otps.create({
      email,
      phone,
      countryCode,
      otp,
    });

    return {
      message: Message.OTP_SEND,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports.verify = async (data) => {
  try {
    const { email, phone, countryCode, password, otp } = data;

    const identifier = email ? { email } : { phone };

    const findOtp = await Model.otps.findOne(identifier);
    console.log(findOtp);

    if (!findOtp || findOtp.otp != otp) {
      throw new Error(Message.INVALID_OTP);
    }

    const findUser = await Model.users.findOne(identifier);
    if (findUser) {
      throw new Error(Message.ALREADY_VERIFIED);
    }

    const userData = await Model.users.create({
      email,
      phone,
      countryCode,
      password,
    });
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
    await Model.sessions.create({
      userId: userData._id,
      expiresAt,
    });
    const verified = await Model.users.findByIdAndUpdate(userData.id, {
      $set: email ? { isEmailVerified: true } : { isPhoneNoVerified: true },
    });

    const tokenData = {
      id: userData._id,
    };
    const token = await createToken(tokenData);

    await Model.otps.findByIdAndDelete(findOtp._id);

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
      if (!findUser.isEmailVerified === true) {
        throw new Error(Message.EMAIL_NOT_VERIFIED);
      }
    }
    if (phone) {
      if (!findUser.isPhoneNoVerified === true) {
        throw new Error(Message.PHONENO_IS_NOT_VERIFIED);
      }
    }

    const isMatch = await findUser.isPaswordMatch(password);
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
    const findUser = await Model.users.findOne({ $or: [{ email }, { phone }] });

    let otp;
    if (email) {
      if (!findUser.isEmailVerified === true) {
        throw new Error(Message.EMAIL_NOT_VERIFIED);
      }
      otp = Math.floor(1000 + Math.random() * 9000);
      console.log(otp);
      await sendEmail(email, otp);
    } else if (phone) {
      if (!findUser.isPhoneNoVerified === true) {
        throw new Error(Message.PHONENO_IS_NOT_VERIFIED);
      }
      otp = 1234;
    } else {
      throw new Error("Email or phone required");
    }
    const saveOtp = await Model.otps.create({
      email,
      phone,
      otp,
    });

    return {
      message: Message.OTP_SEND,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
