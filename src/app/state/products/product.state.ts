
import { IProduct } from 'src/app/products/product';
import * as AppState from '../../state/app.state';



export interface State extends AppState.State {
  products: ProductState;
}
export interface ProductState{
  currentProductId:number | null;
  products:IProduct[];
  error:string;
}

export const initialState:ProductState={
  currentProductId:null,
  products:[],
  error:''
}