import React, { useState } from 'react'

export default function Main() {
    const [num, setNum] = useState(undefined);
    const [result, setResult] = useState();
    const [requestedNum, setRequestedNum] = useState();

    const inputValidation = num === undefined || isNaN(num);

    const postNum = async () => {
        const result = await fetch('https://fibonacci-backend123.herokuapp.com/api/numbers/', {
            method: "POST",
            body: JSON.stringify({
                num
            }),
            headers: {
                "Content-type": "application/json"
            }
        });
        return result.json();
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const { result: answer, num: yourNum } = await postNum();
        setResult(answer);
        setRequestedNum(yourNum);
        setNum('');
    };

    return (
        <div className="main-container">
            <form onSubmit={(e) => submitHandler(e)}>
                <label htmlFor="numberField">Enter your number</label>
                <input id="numberField" type="number" value={num} onChange={({target}) => setNum(target.value)} />
                {result &&
                    <>
                        <p>Your number: {requestedNum}</p>
                        <p>Answer: {result}</p>
                    </>
                }
                <button disabled={inputValidation} className={inputValidation ? 'disabled' : 'run-button'} type="submit">Run</button>
            </form>
        </div>
    )
}
