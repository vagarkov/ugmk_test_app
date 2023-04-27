import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Bar, getDatasetAtEvent, getElementAtEvent } from 'react-chartjs-2';

import { Factories, FilterOptions } from '../../utils';
import {
  serializeProductsBarChart,
  getMonthNumber,
  barChartOptions,
} from '../../utils';

import './index.css';

const initialProductType = localStorage.getItem('productType') || 'All';

function Home() {
  const navigate = useNavigate();

  const chartRef = useRef();

  const [chartData, setChartData] = useState(null);
  const [productType, setProductType] = useState(initialProductType);

  const products = useSelector(store => store.products.products);

  useEffect(() => {
    const serializedProducts = serializeProductsBarChart(products, productType);
    setChartData(serializedProducts);
  }, [products, productType]);

  const onChangeProductType = event => {
    setProductType(event.target.value);
    localStorage.setItem('productType', event.target.value);
  };

  const getFactory = dataset => {
    if (!dataset.length) return;

    const datasetIndex = dataset[0].datasetIndex;
    return chartData.datasets[datasetIndex].label;
  };

  const getMonth = element => {
    if (!element) return;

    const { index } = element;
    return chartData.labels[index];
  };

  const onClick = event => {
    const { current: chart } = chartRef;
    if (!chart) return;
    const [interactionItem] = getElementAtEvent(chart, event);
    if (!interactionItem) return;

    const interactionItems = getDatasetAtEvent(chart, event);
    const factoryLabel = getFactory(interactionItems);
    const month = getMonth(interactionItem);

    const factory = Factories.find(({ label }) => label === factoryLabel);
    const monthNumber = getMonthNumber(month);

    navigate(`/details/${factory?.id}/${monthNumber}`);
  };

  return (
    <div className="home-container">
      <div className="bar-chart ">
        <div className="bar-chart__border">
          <span className="label">Фильтр по типу продукции</span>
          <select
            defaultValue={productType}
            onChange={onChangeProductType}
            name="products"
          >
            {FilterOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="home-container__border chart">
          {chartData && (
            <Bar
              ref={chartRef}
              data={chartData}
              onClick={onClick}
              options={barChartOptions}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
