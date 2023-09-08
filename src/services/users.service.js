import userModel from '../dao/models/user.model.js'

export const getUserService = async (user) => {

    if (!user || typeof user !== 'object' || !user.email || !user.first_name || !user.last_name || !user.role) {
        throw new Error("Invalid user data");
    }
    
    const userData = {
        email: user.email,
        name: user.first_name,
        surname: user.last_name,
        role: user.role,
    };

    return userData
}