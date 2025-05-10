import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import styles from "../styles/AuthModal.module.css";
import {registerWithEmail,loginWithGoogle} from "../services/AuthService.jsx";
import { useNavigate } from "react-router-dom";

const RegisterModal = ({ isOpen, onClose, switchToLogin }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError]=useState("");
  const [loading,setLoading]=useState(false);
  const navigate=useNavigate();
  const handelSubmit=async (e)=>{
     e.preventDefault();
     setLoading(true);
     setError("");
     try{
      const message=await registerWithEmail(email,password,fullName);
      onClose();
      switchToLogin();
      //console.log(message);

     }catch(error){
       setError(error.message)
        console.log(error);
     }finally{
      setLoading(false);
     }
     
  }
  const handelGoogleAuth=async()=>{
     setLoading(true);
     setError("");
     try{
      const message=await loginWithGoogle();
      setEmail("");
      setPassword("");
      onClose();

     }catch(error){
       setError(error.message)
        console.log(error);
     }finally{
      setLoading(false);
     }
     
  }

  if (!isOpen) return null;

  return (
    <div
      className={`${styles.overlay} ${isOpen ? styles.show : ""}`}
      onClick={onClose}
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>
          X
        </button>
        <h2>Register</h2>
        {error && <p>{error}</p>}
        <form onSubmit={handelSubmit}>

          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            required
          />
          <button type="submit" disabled={loading}>
            { loading ? "Registering.." : "Register"}
          </button>
        </form>

        <button onClick={handelGoogleAuth} className={styles.googleBtn}>
          <FcGoogle /> Register with Google
        </button>

        <p onClick={switchToLogin}>Already have an account? Login</p>
      </div>
    </div>
  );
};

export default RegisterModal;