import bcrypt from 'bcrypt'


export const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
};

export const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password)
};

export const isAdmin = (req, res, next) => {
    const user = req.user;
    let isAdminUser = false;

    if (user.role == "admin") {
        isAdminUser = true
        next()
    } else {
        res.status(403).render("errors/accesDeniedErr", {
            message: "Acces Denied",
        })
    }
}

export const roleAccess = (req, res, next) => {
    const user = req.user;
    let isAdminUser = false;

    if (user.role == "admin") {
        isAdminUser = true;
    }

    res.locals = {
        isAdminUser,
    }
    next()
}