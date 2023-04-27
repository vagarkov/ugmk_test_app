import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchData } from './products';
import { sagaActions } from './sagaActions';

let getProductsFromAPI = async url => {
  return await axios.get(url);
};

export function* getProducts() {
  try {
    let result = yield call(() =>
      getProductsFromAPI('http://localhost:3001/products')
    );
    yield put(fetchData(result.data));
  } catch (error) {
    yield put({ type: 'FETCH_PRODUCTS_FAILED', error });
  }
}

export default function* rootSaga() {
  yield takeEvery(sagaActions.FETCH_PRODUCTS, getProducts);
}
