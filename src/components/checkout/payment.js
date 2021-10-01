import React, { useEffect, useState } from 'react';
import '../payment.css'
import { getCarts } from '../reducer';
import { useStateValue } from '../StateProvider';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import Currency from 'react-currency-format';
import http from '../../framework/basic-rest/utils/http'
import { db } from '../firebase';
import { useHistory } from 'react-router-dom';

function Payment (){
    const [{ carts, user }, dispatch ] = useStateValue(),
        stripe = useStripe(),
        element = useElements(),
        history = useHistory(),
        [disabled, setDisabled] = useState(true),
        [error, setError] = useState(null),
        [succeed, setSucceeded] = useState(false),
        [processing, setProcessing] = useState(''), 
        [clientSession, setClient] = useState(true);

    useEffect( () => {
        const getclientSession = async () => {
            const response = await http({
                method : "POST",
                url: `/payments/create?total=${getCarts(carts) * 100 }`
            });
            setClient(response.data.clientSession)
            
        }
        getclientSession()
           
    }, [carts])  

    const handlePayment = async (e) => {
       
        e.preventDefault(); 
        setProcessing(true); 
     //eslint-disable-next-line 
        const payload = await stripe.confirmCardPayment(clientSession, {
            payment_method : {
                card : element.getElement(CardElement)
            }
        }).then(({paymentIntent}) => {
            console.log(paymentIntent)
            setSucceeded(true);
            setError(null)
            setProcessing(false);

            dispatch({
                type : "Empty carts",
            })

        })

    }

    const cardChange = e => {
        setDisabled(e.empty)
        setError(e.error ? e.error.message: '')
    }

    return (
                    
            <div className="payment-method">
                
            <h3>
                   2. Payment Method
                </h3>
                <form className="card" onSubmit={handlePayment}>

                <CardElement onChange={cardChange} />
                <div className="total-payment">
                <Currency renderText={(value) => (
                <>
                <h4>
            Total Amount : <strong>{value}</strong>
                </h4>
                </>
            )} 
            decimalScale={2}
            value={getCarts(carts)}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'$'}/>
            
                <button disabled={processing || disabled || succeed }>Submit</button>

                <span>
                    {processing ? <p>Processing</p> : "Buy Now"}
                    </span>
                </div>
                
                {error && <div>{error}</div>} 
                </form>
                </div>
        )
}

export default Payment