import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const TrainingCalendar = () => {
  const [trainings, setTrainings] = useState([]);
  const localizer = momentLocalizer(moment);

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = () => {
    fetch("https://traineeapp.azurewebsites.net/api/trainings")
      .then(response => {
        if (response.ok)
          return response.json();
        else
          throw new Error("Error in fetch:" + response.statusText);
      })
      .then(data => setTrainings(data.content))
      .catch(err => console.error(err));
  }

  const events = trainings.map(training => ({
    title: training.activity,
    start: new Date(training.date),
    end: moment(training.date).add(training.duration, 'minutes').toDate(),
  }));

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: 'red',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
      border: '0px',
      display: 'block',
    };
    return {
      style: style
    };
  };

  return (
    <div><h1>Calendar</h1>
    <div style={{ height: '90vh', width: '100vw', display: 'flex', flexDirection: 'column' }}>
      <div style={{ alignSelf: 'flex-end', marginRight: '20px', marginBottom: '20px' }}>
        <Button component={Link} to="/FrontDeployment" variant="outlined" color="error" style={{ marginLeft: '20px' }}>
          Customer List
        </Button>
        <Button component={Link} to="/trainings" variant="outlined" color="error" style={{ marginLeft: '20px' }}>
          Training List
        </Button>
        <Button component={Link} to="/statistics" variant="outlined" color="error" style={{ marginLeft: '20px' }}>
          Statistics
        </Button>
      </div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        eventPropGetter={eventStyleGetter}
        style={{ height: '100%', margin: '20px' }}
      />
    </div>
    </div>
  );
};

export default TrainingCalendar;