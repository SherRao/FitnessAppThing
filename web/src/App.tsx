import React from "react";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from "chart.js";
import { Bar } from "react-chartjs-2";
import "./App.css";

ChartJS.register(BarElement, CategoryScale, LinearScale);

function App() {
    const [weightDataset, setWeightDataset] = React.useState([]);

    React.useEffect(() => {
        const fetchData = async () => {
            const data: Array<any> = await( await fetch("http://localhost:5170")).json();
            const result: Array<Array<number>> = [];
            for(let i = 0; i < data.length; i++) {
                const currentWorkout = [];
                for(const entry in data[i]["sets"]) {
                    currentWorkout.push(data[0]["sets"][entry]["weight"]);
                }

                result.push(currentWorkout);
            }

            setWeightDataset(result);
        };

        fetchData();
    }, []);

    const barCharts: Array<Bar> = [];
    weightDataset.forEach((workout) => {
        barCharts.push(
            <Bar
                data={{
                    labels: ["Set 1", "Set 2", "Set 3", "Set 4", "Set 5", "Set 6"],
                    datasets: [{
                        label: "Weight",
                        data: workout, //[12, 19, 3, 5, 2, 3],
                        borderWidth: 1,
                    }]
                }}

                options={{
                    borderColor: "#bb264b",
                    backgroundColor: [
                        "rgb(255, 99, 132)",
                        "rgb(54, 162, 235)",
                        "rgb(255, 205, 86)"
                    ],

                    scales: {
                        yAxes:{
                            grid: {
                                color: "#abcdef",
                            },
                            ticks:{
                                color: "#abcdef",
                            }
                        },
                        xAxes: {
                            grid: {
                                color: "#abcdef",
                            },
                            ticks:{
                                color: "#abcdef",
                            }
                        },
                        
                    }
                }}
            />
        );
    });

    return (
        <div>
            {barCharts}
        </div>
    );
}

export default App;
