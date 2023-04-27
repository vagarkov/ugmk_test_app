import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Pie } from 'react-chartjs-2';
import {
  serializeProductsPieChart,
  pieChartOptions,
  Months,
  getMonthNumber,
  getData,
  Factories,
  FilterOptions,
} from '../../utils';

import './index.css';

function Details() {
  const { factory_id, month_number } = useParams();

  const [chartData, setChartData] = useState(null);

  const products = useSelector(store => store.products.products);

  useEffect(() => {
    const productsData = Factories.map(({ filterOptionIndex }) =>
      getData({
        factoryId: Number(factory_id),
        productType: FilterOptions[filterOptionIndex].value,
        products,
      })
    );

    const filteredProductsData = productsData.map(data =>
      data.filter(({ month }) => getMonthNumber(month) === month_number)
    );

    setChartData(serializeProductsPieChart(filteredProductsData.flat(1)));
  }, [products, factory_id, month_number]);

  return (
    <div className="details-container">
      <div className="pie-chart">
        <h1>
          Статистика Фабрики {factory_id === 1 ? 'А' : 'Б'} за{' '}
          {Months[month_number]}
        </h1>
        {chartData && <Pie data={chartData} options={pieChartOptions} />}
      </div>
    </div>
  );
}

export default Details;
