export const generateUserErrorInfo = (user) => {
    return `
        One or more properties are incomplete or invalid.
        List of mandatory properties:
      - first_name: Must be a string (${user.first_name})
      - last_name: Must be a string (${user.last_name})
      - email: Must be a string (${user.email})
      - age: Must be a number (${user.age})
      - password: Must be a string
    `;
};

export const getCartsErrorInfo = (carts) => {
    return `
        Error getting cart from database
    `
};

export const postCartsErrorInfo = (carts) => {
    `
    Error posting cart to database

    `;
}

export const addToCartErrorInfo = (productId) => {
    `
      Error adding item to cart (${productId})
    `;
};

export const removeFromCartInfo = (productId) => {
    `
      Error removing item from cart (${productId})  
    `;
};

export const updateCartQtyErrorInfo = (productId) => {
    `
      Error updating cart quantity (${productId})
    `;
};

export const generateTicketErrorInfo = (ticket) => {
    `
      Error generating ticket
    `;
}