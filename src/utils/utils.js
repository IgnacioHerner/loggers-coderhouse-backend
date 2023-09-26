import bcrypt from 'bcrypt'
import logger from './logger.js'
import { faker } from '@faker-js/faker'
import { createProductDB } from './createProducts.DB.js'
import productModel from '../dao/models/product.model.js'
import mockingModel from '../dao/models/mocking.model.js'


export const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
};

export const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password)
};

// export const isAdmin = (req, res, next) => {
//     const user = req.user;
//     let isAdminUser = false;

//     if (user.role == "admin") {
//         isAdminUser = true
//         next()
//     } else {
//         res.status(403).render("errors/accesDeniedErr", {
//             message: "Acces Denied",
//         })
//     }
// }

// // export const roleAccess = (req, res, next) => {
// //     const user = req.user;
// //     let isAdminUser = false;

// //     if (user.role == "admin") {
// //         isAdminUser = true;
// //     }

// //     res.locals = {
// //         isAdminUser,
// //     }
// //     next()
// // }

export const generateProductsMocking = async () => {
    const existingMocking = await mockingModel.countDocuments()

    if(!existingMocking){
        for (let i = 0; i < 100; i++){
            const mockingProducts = await mockingModel.insertMany([
                {
                    title: faker.commerce.productName(),
                    description: faker.commerce.productDescription(),
                    price: faker.commerce.price(),
                    status: true,
                    code: faker.string.uuid(),
                    stock: faker.number.int({ min: 1, max: 15 }),
                    category: faker.commerce.department(),
                    thumbnail: [faker.image.urlPicsumPhotos()],
                }
            ])
        }

        logger.info("Generating products mocking")
    }
}

export const generateProducts = async (req, res) => {
    const existProducts = await productModel.countDocuments()

    if(!existProducts){
        logger.info("Generating products")
        createProductDB();
    }
}

export const generateRandomString = (num) => { // el argumento trae la cantidad (16)
    return [...Array(num)] // crea un array de 16 elementos
      .map(() => { // mapea cada elemento para cambiarlo
        const randomNum = ~~(Math.random() * 36); // ~~ convierte a entero
        return randomNum.toString(36); // convierte a string
      })
      .join("") // unir todos los elementos
      .toUpperCase();
  };
  