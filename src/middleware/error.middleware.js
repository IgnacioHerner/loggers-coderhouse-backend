import EErros from '../services/errors/enums.js'

export default (error, req, res, next) => {
    console.log(error.cause)

    switch(error.code) {
        case EErros.INVALID_TYPES_ERROR:
            res.code(400).send({status: "error", error: error.name})
            break;
        case EErros.ERROR_ADD_TO_CART:
            res.code(500).send({status: "error", error: error.name})
            break
        case EErros.ERROR_GET_CARTS:
            res.code(500).send({status: "error", error: error.name})
            break
        case EErros.ERROR_POST_CARTS:
            res.code(500).send({status: "error", error: error.name})
            break
        case EErros.ERROR_REMOVE_FROM_CART:
            res.code(500).send({status: "error", error: error.name})
            break
        case EErros.ERROR_UPDATE_CART_QTY:
            res.code(500).send({status: "error", error: error.name})
            break
        case EErros.ERROR_GENERATING_TICKET:
            res.code(500).send({status: "error", error: error.name})
            break        
        default:
            res.send({status: "error", error: "Unhadled error"})
            break;
    }
}