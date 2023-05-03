import { GET_CART,UPDATE_CART} from "../type"

export const getCart = () => {
    return {
        type: GET_CART
    }
}

export const updateCart = () => {
    return {
        type: UPDATE_CART
    }
}