import React, { useState, useEffect } from 'react';
import styles from '../styles/AccountSettings.module.css'
import Link from 'next/link';
import ProfilePage from './profilePage';

  const AccountSettings = () => {
    const [accountName, setAccountName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
  
    const handleAccountNameChange = (event) => {
      setAccountName(event.target.value);
    };

    const handlePhoneNumberChange = (event) => {
      setPhoneNumber(event.target.value);
    };

    const handleCurrentPasswordChange = (event) => {
      setCurrentPassword(event.target.value);
    };
  
    const handleNewPasswordChange = (event) => {
      setNewPassword(event.target.value);
    };
  
    const handleConfirmPasswordChange = (event) => {
      setConfirmPassword(event.target.value);
    };
  
    const handleFormSubmit = (event) => {
      event.preventDefault();
  
      // Code to submit form data to server
      console.log(`Account name: ${accountName}`);
      console.log(`Phone number: ${phoneNumber}`);
      console.log(`Current password: ${currentPassword}`);
      console.log(`New password: ${newPassword}`);
      console.log(`Confirm password: ${confirmPassword}`);
      
    };
    // try{
    //     // Send the form data to the server
    //     const response = await fetch('http://127.0.0.1:5000/edit_account', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({ phoneNum : phoneNumber, name : accountName, password : newPassword })
    //     });
    //     const result = await response.json();
    //     console.log(result)
    //     if (result['result'] == 'Success') {
    //         console.log('Success')
    //         router.push('/profilePage');
            
    //     } else {
    //         console.log('Error')
    //     }
    // }
    // catch{
    //     console.log('Error')
    // }

return (
  <div class = {styles.settingContainer}>
    <Link href={'/profilePage'}>Back</Link>
    <h1 class = {styles.header}>Account Settings</h1>
    <form onSubmit={handleFormSubmit}>
      <label class = {styles.formAlign}>
        Account Name:
        <input type="text" value={accountName} onChange={handleAccountNameChange} />
      </label>
      <br />
      <label class = {styles.formAlign}>
        Phone Number:
        <input type="tel" value={phoneNumber} onChange={handlePhoneNumberChange} />
      </label>
      <br />
      <h2 class = {styles.header1}>Change Password</h2>
        <label class = {styles.formAlign}>
          Current Password:
          <input type="password" value={currentPassword} onChange={handleCurrentPasswordChange} />
        </label>
        <br />
        <label class = {styles.formAlign}>
          New Password:
          <input type="password" value={newPassword} onChange={handleNewPasswordChange} />
        </label>
        <br />
        <label class = {styles.formAlign}>
          Confirm Password:
          <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
        </label>
        <br />
      <br />
      <button type="submit" class = {styles.button}>Update Changes</button>
    </form>
  </div>
);
};

export default AccountSettings;
