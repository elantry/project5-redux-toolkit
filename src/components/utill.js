export default function formatCurrency(num) {
  return "$" + Number(num).toFixed(0).toLocaleString() + " ";
}
