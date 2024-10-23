import User from "../model/User.js";
import Bio from "../model/UserBio.js";
import response from "../utils/responceHandler.js";

export const createOrUpdateUserBio = async (req, res) => {
    try {
        const { userId } = req.params;
        const { bioText, liveIn, relationship, workplace, education, phone, hometown } = req.body;

        let bio = await Bio.findOneAndUpdate(
            { user: userId },
            {
                bioText,
                liveIn,
                relationship,
                workplace,
                education,
                phone,
                hometown
            },
            { new: true, runValidators: true },
        )

        // if bio does not exist to create new one
        if (!bio) {
            bio = new Bio({
                user: userId,
                bioText,
                liveIn,
                relationship,
                workplace,
                education,
                phone,
                hometown
            })

            await bio.save();
            await User.findByIdAndUpdate(userId, { bio: bio._id })
        }

        return response(res, 201, 'Bio create or update successfully', bio)

    } catch (error) {
        console.log(error)
        return response(res, 500, 'Internal server error', error.message)
    }
}


export const updateCoverPhoto = async (req, res) => {
    try {
        const { userId } = req.params;
        const file = req.file;
        let coverPhoto = null;


        if (file) {
            coverPhoto = file.path;
        }

        if (!coverPhoto) {
            return response(res, 400, 'failed to upload cover photo')
        }
        //update user profile with cover photo
        await User.updateOne(
            { _id: userId },
            {
                $set: {
                    coverPhoto,
                },
            }
        )
        const updateUser = await User.findById(userId)

        if (!updateUser) {
            return response(res, 404, 'user not found with this id')
        }
        return response(res, 200, 'Cover photo update successfully', updateUser)
    } catch (error) {
        console.log(error)
        return response(res, 500, 'Internal server error', error.message)
    }
}



export const updateUserProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        const { username, gender, dateOfBirth } = req.body;
        const file = req.file;
        let profilePicture = null;

        if (file) {
            profilePicture = file.path;
        }

        //update user profile with cover photo
        await User.updateOne(
            { _id: userId },
            {
                $set: {
                    username,
                    gender,
                    dateOfBirth,
                    ...(profilePicture && { profilePicture })
                },
            }
        )

        const updateUser = await User.findById(userId)

        if (!updateUser) {
            return response(res, 404, 'user not found with this id')
        }

        return response(res, 200, 'user profile update successfully', updateUser)
    } catch (error) {
        console.log(error)
        return response(res, 500, 'Internal server error', error.message)
    }
}

