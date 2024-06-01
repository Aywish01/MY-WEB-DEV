import { useState } from 'react';
import { Paper, Box, Button, Typography, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useRouter } from 'next/router';

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
  formTitle: {
    color: '#FF69B4',
    marginBottom: theme.spacing(2),
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
    marginTop: theme.spacing(2),
    backgroundColor: '#FF69B4',
    color: '#FFFFFF',
    '&:hover': {
      backgroundColor: '#F06292',
    },
  },
}));

const SignupSchema = Yup.object().shape({
  firstname: Yup.string().required('Company name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const SignupForm = () => {
  const router = useRouter();
  const classes = useStyles();
  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <Box className={classes.container}>
      <Paper className={classes.formWrapper}>
        <Box className={classes.form}>
          <Formik
            initialValues={{ firstname: '', email: '', password: '' }}
            validationSchema={SignupSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                await axios.post('/api/signup', values);
                setIsSuccess(true);
              } catch (error) {
                console.error('Signup error', error);
              }
              setSubmitting(false);
            }}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form>
                <Typography variant="h5" className={classes.formTitle}>
                  Signup
                </Typography>
                <Field
                  as={TextField}
                  name="firstname"
                  label="Company Name"
                  fullWidth
                  error={touched.firstname && !!errors.firstname}
                  helperText={touched.firstname && errors.firstname}
                />
                <Field
                  as={TextField}
                  name="email"
                  label="Email"
                  fullWidth
                  error={touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                />
                <Field
                  as={TextField}
                  name="password"
                  label="Password"
                  type="password"
                  fullWidth
                  error={touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                />
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  className={classes.button}
                  disabled={isSubmitting || isSuccess}
                >
                  {isSuccess ? 'Signup Successful!' : 'Signup'}
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
        <Box className={classes.prompt}>
          <Typography variant="body1">
            Already have an account?
          </Typography>
          <Button
            onClick={() => router.push('/login')}
            variant="contained"
            className={classes.button}
          >
            Login
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default SignupForm;
