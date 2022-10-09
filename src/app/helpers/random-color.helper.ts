export function getRandomColor() {
  const minValue = 100;
  const maxValue = 256;
  const coef = (maxValue - minValue)

  let x = Math.floor(Math.random() * coef + minValue);
  let y = Math.floor(Math.random() * coef + minValue);
  let z = Math.floor(Math.random() * coef + minValue);
  let color = 'rgb(' + x + ',' + y + ',' + z + ')';

  return color;
}
