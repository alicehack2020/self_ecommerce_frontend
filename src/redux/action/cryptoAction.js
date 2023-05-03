import { SET_CRYPTO} from "../type"
import { getRequest } from "../../service/request"
export const getData = (data) => {
    return async (dispatch) => {
          await getRequest({ url: 'api/product/listProducts' }).then((data) => {
            console.log(data.data)
            dispatch(setProducts(data.data))
        })
        
    }  
}

export const setProducts = (data) => {
    return {
        type: SET_CRYPTO,
        data:data
    }
}