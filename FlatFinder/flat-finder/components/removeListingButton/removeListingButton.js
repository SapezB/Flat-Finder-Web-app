import styles from './listings.module.css';
import { use, useState } from 'react';


export default function removeListingButton({listingId}){
    const listId = listingId
    const [result, setResult] = useState()

    function deleteListing(){
        fetch('http://127.0.0.1:5000/remove_listing', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id : listId})
        })
            .then(response => response.json())
            .then(data =>{
                CurrResult = result.slice() 
                currResult.push(data)
                setResult(currResult)
            })
            .catch(error => console.error(error))
        console.log(result)

    }

    return(
        <div>
            <button className = {styles.removeBtn}onClick={deleteListing}>Remove Listing</button>
        </div>
        )

}
