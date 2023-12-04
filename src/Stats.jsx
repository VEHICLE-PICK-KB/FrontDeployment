import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const StatisticsPage = () => {
  const [trainingData, setTrainingData] = useState([]);

  useEffect(() => {
    fetchTrainingData();
  }, []);

  const fetchTrainingData = () => {
    fetch("https://traineeapp.azurewebsites.net/api/trainings")
      .then((response) => response.json())
      .then((data) => {
        const processedData = processData(data);
        setTrainingData(processedData);
      })
      .catch((error) => console.error(error));
  };

  const processData = (data) => {
    const activityMap = new Map();

    data.content.forEach((training) => {
      const activity = training.activity;
      const duration = training.duration;

      if (activityMap.has(activity)) {
        activityMap.set(activity, activityMap.get(activity) + duration);
      } else {
        activityMap.set(activity, duration);
      }
    });

    const processedData = Array.from(activityMap).map(([activity, duration]) => ({
      activity,
      duration,
    }));

    return processedData;
  };

  return (
    <div style={{ height: '90vh', width: '100vw', display: 'flex', flexDirection: 'column' }}>
      <div style={{ alignSelf: 'flex-end', marginRight: '20px', marginBottom: '20px' }}>
        <Button component={Link} to="/FrontDeployment" variant="outlined" color="error" style={{ marginLeft: '20px' }}>
          Customer List
        </Button>
        <Button component={Link} to="/trainings" variant="outlined" color="error" style={{ marginLeft: '20px' }}>
          Training List
        </Button>
        <Button component={Link} to="/calendar" variant="outlined" color="error" style={{ marginLeft: '20px' }}>
          Calendar
        </Button>
      </div>
      <div style={{ marginLeft: '20px', marginRight: '20px' }}>
        <h1>Training Statistics</h1>
        <BarChart width={800} height={400} data={trainingData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="activity" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="duration" fill="red" />
        </BarChart>
      </div>
    </div>
  );
};

export default StatisticsPage;