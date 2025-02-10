import { Line } from "react-chartjs-2";
import Button from "../UI/Button/Button";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Link, useNavigate } from "react-router";
import { paths } from "../router/paths";
import { useDispatch, useSelector } from "react-redux";
import { updatePlayers } from "../store/slices/playersSlice";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Results() {
  const { players } = useSelector((state) => state.players);
  const { isAuth } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const data = {
    labels: players.map((player) => player.user),
    datasets: [
      {
        label: "Scores",
        data: players.map((player) => player.score),
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: "Game Statistics",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Players",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Scores",
        },
      },
    },
  };

  const whip = () => {
    dispatch(updatePlayers([]));
    navigate(paths.MAIN);
  };

  return (
    <section className="results">
      <h1>Results</h1>
      {players.map((player) => (
        <div key={player.id} className="result">
          <p>{player.user}</p>
          <p>Score: {player.score}</p>
        </div>
      ))}
      {players.length > 0 && (
        <div className="chart">
          <Line data={data} options={options} />
        </div>
      )}
      {!isAuth && (
        <Link to={paths.ENTRY}>
          <Button variant={"classic"}>To the main menu</Button>
        </Link>
      )}
      {isAuth && (
        <Button variant={"classic"} clickHandler={whip}>
          To the main menu
        </Button>
      )}
    </section>
  );
}
