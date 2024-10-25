import React, { useContext, useState } from 'react';
import styles from './AuthForm.module.css';
import axiosInstance from '../api/axios';
import { AuthContext } from '../auth/AuthContext';


function AuthForm() {
  const { login, addrole,addid,user,role,id} = useContext(AuthContext);


  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signupSucss, setSignupSucss] = useState(null);
  const [signupSucssMsg, setSignupSucssMsg] = useState('');
  
  const toggleForm = () => {
    setIsLogin(!isLogin);
    // Reset form state when toggling
    setEmail('');
    setPassword('');
    setName('');
    setConfirmPassword('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      // Handle login logic
      try {
      const response = await axiosInstance.post('/login', {  email, password });
      console.log('Login:', response.data);
      login(response.data.username)
      addrole(response.data.role)
      addid(response.data.user_id)
      setSignupSucssMsg('login sucsses')
      console.log('Login:',user,id,role);
      
      
        
      } catch (error) {
        console.error('Error during signup:', error);
        setSignupSucss(false)
      setSignupSucssMsg('no:-(   no:-(   no:-( !')
      }






    } else {
      // Handle sign-up logic
      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }else{
        try {
          const response = await axiosInstance.post('/register', { name, email, password });
          console.log('Signup successful', response.data);
          setSignupSucss(true)
          setSignupSucssMsg('account created :)')
          console.log(response.data.message);
          
          setIsLogin(!isLogin);
        } catch (error) {
          console.error('Error during signup:');
          setSignupSucss(false)
          setSignupSucssMsg(error.message)
          
        }
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.authBox}>
        <h2>{isLogin ? 'Log In' : 'Sign Up'}</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          {!isLogin && (
            <div className={styles.inputGroup}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
          {!isLogin && (
            <div className={styles.inputGroup}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}
        <small className={signupSucss ? styles.errer : styles.sucss}>
  {signupSucssMsg}
</small>


          <button type="submit" className={styles.btn}>
            {isLogin ? 'Log In' : 'Sign Up'}
          </button>
        </form>
        <p className={styles.toggleText}>
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <span onClick={toggleForm} className={styles.toggleLink}>
            {isLogin ? 'Sign Up' : 'Log In'}
          </span>
        </p>
      </div>

      
    </div>
  );
}

export default AuthForm;
