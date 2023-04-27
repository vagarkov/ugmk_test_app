import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import { sagaActions } from './store/sagaActions';
import Home from './pages/Home/Home';
import Details from './pages/Details/Details';
import Error from './pages/Error/Error';

import './index.css';

const routes = {
  MAIN_PAGE: '/',
  DETAILS_PAGE: '/details/:factory_id/:month_number',
};

Chart.register(ChartDataLabels, ...registerables);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: sagaActions.FETCH_PRODUCTS });
  }, [dispatch]);

  return (
    <div>
      <Routes>
        <Route path={routes.MAIN_PAGE} element={<Home />} />
        <Route path={routes.DETAILS_PAGE} element={<Details />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
