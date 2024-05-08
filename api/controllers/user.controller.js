import User from '../models/user.model.js'
import { errorHandler } from '../utils/error.js';
import bcryptjs from 'bcryptjs';



export const test =  (req,res) => {
    res.json({
        message: 'API is working'
    });
};


//update user
// Assuming req.body.currentPassword is the password the user entered in the form
export const updateUser = async(req, res, next) => {
  if (req.user.id !== req.params.id) {
      return next(errorHandler(401, 'You can update only your account!'));
  }
  try {
      const user = await User.findById(req.params.id);
      const isMatch = await bcryptjs.compare(req.body.currentPassword, user.password);
      if (!isMatch) {
          return next(errorHandler(403, 'Current password is incorrect'));
      }

      if (req.body.newPassword) {
          req.body.password = bcryptjs.hashSync(req.body.newPassword, 10);
      }

      const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          {
            $set: {
              username: req.body.username,
              email: req.body.email,
              password: req.body.password,
              profilePicture: req.body.profilePicture,
              bio: req.body.bio,
            },
          },
          { new: true }
      );
      const { password, ...rest } = updatedUser._doc;
      res.status(200).json(rest);
  } catch (error) {
      next(error);
  }
}

//delete user

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, 'You can delete only your account!'));
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json('User has been deleted...');
  } catch (error) {
    next(error);
  }
}