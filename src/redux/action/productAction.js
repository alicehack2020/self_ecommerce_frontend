import { SET_PRODUCT} from "../type"
import { getRequest,getRequestWithoutToken } from "../../service/request"

export const getProduct = (data) => {
    return async (dispatch) => {
        await getRequestWithoutToken({ url: 'api/product/listProducts' }).then((data) => {
            dispatch(setProducts(data.data))
        })
        
    }  
}

export const setProducts = (data) => {
    return {
        type: SET_PRODUCT,
        data:data
    }
}