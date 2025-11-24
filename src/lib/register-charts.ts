import {
  ArcElement,
  BarController,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";

let registered = false;

export function ensureChartsRegistered() {
  if (registered) return;
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    BarController,
    ArcElement,
    Title,
    Tooltip,
    Legend,
  );
  registered = true;
}
