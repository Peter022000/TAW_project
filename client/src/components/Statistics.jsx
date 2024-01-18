import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import { useSelector } from "react-redux";
import { Chart, registerables } from 'chart.js';
import {MDBBtn} from "mdb-react-ui-kit";
Chart.register(...registerables);
Chart.defaults.font.size = 18;
Chart.defaults.font.weight = "bold";

const Statistics = (props) => {
    const [statistics, setStatistics] = useState([]);
    const [startIndex, setStartIndex] = useState(0);

    const token = useSelector((state) => state.auth.token);

    const fetchData = async () => {
        try {
            const response = await axios.get(
                `http://192.168.1.2:8080/statistics/getStatistics`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = response.data;
            setStatistics(data.dishes || []);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const displayStatistics = statistics.slice(startIndex, startIndex + 10);

    const chartData = {
        labels: displayStatistics.map((item) => item.name),
        datasets: [
            {
                label: "Ilość",
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)",
                borderWidth: 1,
                hoverBackgroundColor: "rgba(75,192,192,0.4)",
                hoverBorderColor: "rgba(75,192,192,1)",
                data: displayStatistics.map((item) => item.quantity),
            },
        ],
    };

    const handleScroll = (direction) => {
        setStartIndex((prevIndex) => {
            const newIndex = direction === "up" ? prevIndex - 10 : prevIndex + 10;
            return Math.max(Math.min(newIndex, statistics.length - 10), 0);
        });
    };

    return (
        <div className="page-container" style={{ textAlign: "center" }}>
            <h1 style={{ textAlign: 'center', marginTop: "1rem" }}>Statystyki</h1>
            <Bar
                data={chartData}
                options={{
                    scales: {
                        x: {
                            type: "category",
                            labels: displayStatistics.map((item) => item.name),
                            },
                        y: {
                            beginAtZero: true,
                            },
                    },
                }}
                height={100} // Adjust the height as needed
                style={{padding: "3rem"}}
            />
            <div>
                <MDBBtn
                    style={{ margin: "0.5rem", }}
                    className="button"
                    onClick={() => handleScroll("up")} disabled={startIndex === 0}>
                    Cofnij
                </MDBBtn>

                <MDBBtn
                    style={{ margin: "0.5rem", marginRight: "0.5rem" }}
                    className="button"
                    onClick={() => handleScroll("down")} disabled={startIndex === statistics.length - 10}>
                    Dalej
                </MDBBtn>
            </div>
        </div>
    );
};

export default Statistics;
