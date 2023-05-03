import { SET_PRODUCT} from "../type"
import { getRequest } from "../../service/request"

export const getProduct = (data) => {
    return async (dispatch) => {
        await getRequest({ url: 'api/product/listProducts' }).then((data) => {
            //   console.log(data.data.list)
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