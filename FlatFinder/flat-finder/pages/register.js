import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function RegisterScreen() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [result, setResult] = useState({
        result : ''
    })

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            // Send the form data to the server
            const response = await fetch('http://127.0.0.1:5000/add_account', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email : formData.email, password : formData.password, name : formData.name, admin : false })
            });
            const result = await response.json();
            console.log(result)
            if (result['result'] == 'Success') {
                console.log('Success')
                router.push('/loginScreen');
                
            } else {
                console.log('Error')
            }
        }
        catch{
            console.log('Error')
        }
    };

    const handleChange = (e) => { //Sets form data when it is changed 
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div class={styles.PageC}>
            <div class={styles.loginContainer}>
                <h2>SIGN UP</h2>
                <div class={styles.loginBox}>
                    <form class={styles.formAlign} onSubmit={handleSubmit} >
                        <label className={styles.label} for='Name'> Name :</label><br></br>
                        <input className={styles.input} type='text' id='EmployeeName' placeholder='Full Name' name='name' value={formData.name} onChange={handleChange}></input><br></br>
                        <label className={styles.label} for='userName'> Email :</label><br></br>
                        <input className={styles.input} type='email' id='userName' placeholder='Email@FDM.com' name='email' value={formData.email} onChange={handleChange}></input><br></br>
                        <label className={styles.label} for='password'> Password : </label><br></br>
                        <input type='password' id='password' placeholder="*****************" className={styles.input} value={formData.password} onChange={handleChange} name='password'></input><br></br>
                        <button class={styles.button} type='submit'>Register</button> <br></br>
                    </form>
                    <br></br>
                    <Link href='/loginScreen'>Existing User?</Link>


                </div>
            </div>
            <img class={styles.logoImg} src="https://upload.wikimedia.org/wikipedia/commons/1/13/Fdm-logo-black.jpg" alt="FDM" width="250" height="250" />
        </div>
    );
}