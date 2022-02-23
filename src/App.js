import './App.css';
import { useFormik } from 'formik'

function App() {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: values => {
      console.log('form: ', values)
      window.alert('Login Successful')
    },
    validate: values => {
      let errors = {}
      let emailErrors = validateEmail(values.email)
      let passwordErrors = validatePassword(values.password)
      
      if(emailErrors) errors.email = emailErrors;
      if(passwordErrors) errors.password = passwordErrors;
      console.log('errors: ', errors)
      return errors
    }
  });
  
  function validateEmail(email) {
    return validateFieldHasValue(email) || isEmailFormat(email);
  }

  function validatePassword(password) {
    return validateFieldHasValue(password)
  }

  function validateFieldHasValue(value) {
    return !value ? 'Field required' : undefined;
  }

  function isEmailFormat(email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) ? 
    undefined : 'Username should be an email'
  }

  return (
    <div>
        <form onSubmit={formik.handleSubmit}>
          <div>Username</div>
          <input id="emailField" name="email" type="text" onChange={formik.handleChange} value={formik.values.email}/>
          {formik.errors.email ? 
            <div id="emailError" style={{color: 'red'}}>{formik.errors.email}</div> : null}

          <div>Password</div>
          <input id="pswField" name="password" type="text" onChange={formik.handleChange} value={formik.values.password}/>  
          {formik.errors.password ? 
            <div id="pswError" style={{color: 'red'}}>{formik.errors.password}</div>: null}

          <button id="submitBtn" type="submit">Submit</button>    
      </form>
    </div>
  );
}

export default App;
