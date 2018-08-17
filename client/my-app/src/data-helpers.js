
export const createDataPoint = (res,time = Date.now(), magnitude = 1000, offset = 0) => {
  return [
time + offset * magnitude,res
    //Math.round((Math.random() * 100) * 2) / 2
  ];
};

export const createRandomData = (res=10,time, magnitude, points = 100) => {
  const data = [];
  let i = (points * -1) + 1;
  for (i; i <= 0; i++) {
    data.push(createDataPoint(time, magnitude, i));
  }
  return data;
};

export const addDataPoint = (data,res, toAdd) => {
if (!toAdd) toAdd = createDataPoint(res);
  const newData = data.slice(0); // Clone
  newData.push(toAdd);
  return newData;
};
