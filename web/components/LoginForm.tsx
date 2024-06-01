import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Typography, Paper } from '@material-ui/core';
import axios from 'axios';
import { useRouter } from 'next/router';
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
    padding: theme.spacing(4),
  },
  button: {
    marginTop: theme.spacing(2),
    backgroundColor: '#FF69B4',
    '&:hover': {
      backgroundColor: '#FFC0CB',
    },
  },
  formTitle: {
    color: '#FF69B4',
    marginBottom: theme.spacing(2),
  },
}));

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const LoginForm = () => {
  const router = useRouter();
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Paper className={classes.formWrapper}>
        <Typography variant="h5" className={classes.formTitle}>
          Login
        </Typography>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const response = await axios.post('/api/login', values);
              localStorage.setItem('token', response.data.token);
              router.push('/profile');
            } catch (error) {
              console.error('Login error', error);
            }
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <Box mb={2}>
                <Field
                  as={TextField}
                  name="email"
                  label="Email"
                  fullWidth
                  error={touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                />
              </Box>
              <Box mb={2}>
                <Field
                  as={TextField}
                  name="password"
                  label="Password"
                  type="password"
                  fullWidth
                  error={touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                />
              </Box>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                className={classes.button}
                disabled={isSubmitting}
              >
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
};

export default LoginForm;
