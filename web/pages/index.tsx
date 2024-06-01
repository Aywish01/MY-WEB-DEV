import React, { useState } from 'react';
import { Tabs, Tab, Box, Paper, Button } from '@material-ui/core';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFEBEE', // Light pink background
  },
  formWrapper: {
    display: 'flex',
    flexDirection: 'column',
    boxShadow: theme.shadows[5],
    maxWidth: 400,
    width: '100%',
    backgroundColor: '#FFF3E0', // Light peach background for the form
  },
  form: {
    padding: theme.spacing(4),
  },
  tabContent: {
    padding: theme.spacing(2),
  },
  prompt: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(4),
    backgroundColor: '#F8BBD0', // Light pink background for the prompt
  },
  button: {
    backgroundColor: '#F48FB1', // Pastel pink button
    color: '#FFFFFF', // White text
    '&:hover': {
      backgroundColor: '#F06292', // Darker pastel pink on hover
    },
  },
  tab: {
    color: '#F48FB1', // Pastel pink text for tabs
    '&.Mui-selected': {
      color: '#F06292', // Darker pastel pink for selected tab
    },
  },
}));

const Home = () => {
  const classes = useStyles();
  const [tabIndex, setTabIndex] = useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Box className={classes.container}>
      <Paper className={classes.formWrapper}>
        <Box className={classes.form}>
          <Tabs value={tabIndex} onChange={handleChange} centered>
            <Tab label="Login" className={classes.tab} />
            <Tab label="Signup" className={classes.tab} />
          </Tabs>
          <Box className={classes.tabContent}>
            {tabIndex === 0 && <LoginForm />}
            {tabIndex === 1 && <SignupForm />}
          </Box>
        </Box>
        <Box className={classes.prompt}>
          {tabIndex === 0 ? (
            <>
              <h3>Don't have an account?</h3>
              <Button
                onClick={() => setTabIndex(1)}
                variant="contained"
                className={classes.button}
              >
                Sign Up
              </Button>
            </>
          ) : (
            <>
              <h3>Already have an account?</h3>
              <Button
                onClick={() => setTabIndex(0)}
                variant="contained"
                className={classes.button}
              >
                Login
              </Button>
            </>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default Home;
