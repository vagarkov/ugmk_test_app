import { Months, Factories, FilterOptions } from './consts';
import { parse } from 'date-fns';
export const getDateTimestamp = date => {
  const formatPattern = 'dd/MM/yyyy';
  const parsedDate = parse(date, formatPattern, new Date());

  return parsedDate && parsedDate instanceof Date ? parsedDate.getTime() : 0;
};

export const getLabels = products => {
  const filteredProducts = products.filter(product => product.date);
  const productsSortedByDate = filteredProducts.sort(
    ({ date: dateA }, { date: dateB }) => {
      const aMilliseconds = getDateTimestamp(dateA);
      const bMilliseconds = getDateTimestamp(dateB);
      return aMilliseconds - bMilliseconds;
    }
  );

  return productsSortedByDate.reduce((labels, product) => {
    const [, monthNumber] = product.date.split('/');
    const monthLabel = Months[monthNumber];

    if (labels.at(-1) !== monthLabel) labels.push(monthLabel);

    return labels;
  }, []);
};
export const getData = ({ factoryId, productType, products }) => {
  const currentMonths = getLabels(products);
  const isAllProducts = productType === 'All';

  const productTypeKey = isAllProducts
    ? ''
    : FilterOptions.find(fo => fo.value === productType)?.key || '';

  const filteredProductValues = products.filter(
    product => product.factory_id === factoryId && product.date
  );

  const calculatedProducts = filteredProductValues.map(product => {
    let productWeight = product[productTypeKey];
    if (isAllProducts) {
      productWeight = product.product1 + product.product2 + product.product3;
    }

    const productWeightInTon = productWeight / 1000;

    return {
      date: product.date,
      value: productWeightInTon,
    };
  });

  return currentMonths.map(month => {
    const monthNumber = getMonthNumber(month);

    return {
      month: month,
      value: calculatedProducts.reduce((sum, current) => {
        if (current.date.split('/')[1] === monthNumber) sum += current.value;
        return +sum.toFixed(2);
      }, 0),
    };
  });
};
export const serializeProductsBarChart = (products, productType) => {
  return {
    labels: getLabels(products),
    datasets: Factories.map(({ backgroundColor, id, label }) => ({
      backgroundColor,
      label,
      data: getData({ factoryId: id, productType, products }).map(
        ({ value }) => value
      ),
    })),
  };
};
export const serializeProductsPieChart = data => {
  return {
    labels: [FilterOptions[1].label, FilterOptions[2].label],
    datasets: [
      {
        label: 'value',
        data,
        backgroundColor: ['#007413', '#ff9a23'],
      },
    ],
  };
};
export const getMonthNumber = month => {
  return Object.keys(Months).find(key => Months[key] === month);
};
