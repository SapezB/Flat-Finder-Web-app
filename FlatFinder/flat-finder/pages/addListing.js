import React from 'react';
import styles from '../styles/addListings.module.css'
import Link from 'next/link';
import Search from '../components/Search/Search';
import { ReactSession } from 'react-client-session';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function addListing() {

    const uid = ReactSession.get('uid')
    const router = useRouter();

    const [formData, setFormData] = useState({
        Address: '',
        description: '',
        Price : '',
        numBathroom: '',
        numBedroom: '',
        letType:'',
        availableDate: '',
        furnishType : '',
        image : ''
    });
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Send the form data to the server
        try {
            const response = await fetch('http://127.0.0.1:5000/add_listing', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ Address: formData.Address, description: formData.description, Price: formData.Price, numBathroom: formData.numBathroom, numBedroom: formData.numBedroom, letType: formData.letType, availableDate : formData.availableDate, furnishType : formData.furnishType, uid : parseInt(uid), image: formData.image })
            })
            const result = await response.json();

            if (result['result'] === 'Success') {
                console.log('Success');
                router.push('/favOwnedListingPage')
            } else {
                console.log('Error');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => { //Sets form data when it is changed 
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

  return (
    <div className={styles.container}>
      <Search></Search>

      <div  className={styles.selections}>
        <div className={styles.box}>
        <form className = {styles.form} onSubmit={handleSubmit}>

          <label for= 'Address'>Enter Address:</label><br/>
          <input type='text' name = 'Address' onChange={handleChange} required></input><br/>

          <label for= 'description'>Enter Description:</label><br/>
          <input type='text' name ='description' onChange={handleChange} required></input><br/>
          
          <label for= 'date'>Enter Available Date:</label><br/>
          <input type='date' name='availableDate' onChange={handleChange} required></input><br/>
          
          <label for= 'letType'>Choose let type:</label><br/>
          <select name='letType' onChange={handleChange} required>
            <option value = "">None</option>
            <option>Assured Shorthold Tenancy (AST)</option>
            <option>Renting a room</option>
            <option>House Share</option>
          </select><br/>

          <label for= 'furnishType'>Choose Furnish Type</label><br/>
          <select name='furnishType' onChange={handleChange} required>
            <option value = "">None</option>
            <option>Unfurnished</option>
            <option>Semi-Furnished</option>
            <option>Fully-Furnished</option>
          </select><br/>

          <label for= 'Price'>Enter price:</label><br/>
          <input type='text' name='Price' onChange={handleChange} required></input><br/>

          <label for= 'noBedroom'>Choose number of Bedrooms</label><br/>
          <select name='numBedroom' onChange={handleChange} required>
              <option value = "">None</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>

            </select><br/>
                
          <label for= 'noBath'>Choose number of bathrooms:</label><br/>
          <select name='numBath' onChange={handleChange} required>
            <option value = "">None</option>
            <option>0</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select><br/>
          <label for= 'image'>Enter image url:</label><br/>
          <input type='text' name ='image' onChange={handleChange} required></input><br/>   
          <input type="submit"></input>
        </form>
        </div>
      </div>
    </div>
  );
    return (
        <div className={styles.container}>
          <Search></Search>
    
          <div  className={styles.selections}>
            <div className={styles.box}>
            <form className = {styles.form} onSubmit={handleSubmit}>
    
              <label for= 'Address'>Enter Address:</label><br/>
              <input type='text' name = 'Address' onChange={handleChange} required></input><br/>
    
              <label for= 'description'>Enter Description:</label><br/>
              <input type='text' name ='description' onChange={handleChange} required></input><br/>
              
              <label for= 'date'>Enter Available Date:</label><br/>
              <input type='date' name='availableDate' onChange={handleChange} required></input><br/>
              
              <label for= 'letType'>Choose let type:</label><br/>
              <select name='letType' onChange={handleChange} required>
                <option value = "">None</option>
                <option>Assured Shorthold Tenancy (AST)</option>
                <option>Renting a room</option>
                <option>House Share</option>
              </select><br/>
    
              <label for= 'furnishType'>Choose Furnish Type</label><br/>
              <select name='furnishType' onChange={handleChange} required>
                <option value = "">None</option>
                <option>Unfurnished</option>
                <option>Semi-Furnished</option>
                <option>Fully-Furnished</option>
              </select><br/>
    
              <label for= 'Price'>Enter price:</label><br/>
              <input type='text' name='Price' onChange={handleChange} required></input><br/>
    
              <label for= 'noBedroom'>Choose number of Bedrooms</label><br/>
              <select name='numBedroom' onChange={handleChange} required>
                  <option value = "">None</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
    
                </select><br/>
                    
              <label for= 'noBath'>Choose number of bathrooms:</label><br/>
              <select name='numBatroom' onChange={handleChange} required>
                <option value = "">None</option>
                <option>0</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select><br/>
              <label for= 'image'>Enter image url:</label><br/>
              <input type='text' name ='image' onChange={handleChange} required></input><br/>   
              <input type="submit"></input>
            </form>
            </div>
          </div>
        </div>
      );
}

/*Address
  Description
  available date
  let type

  furnish type
  price
  no. bathroom
  no.bedrtooom
  image
  
*/