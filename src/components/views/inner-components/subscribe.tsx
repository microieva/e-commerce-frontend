import { FC } from "react"
import Button from "../../shared/button"

export const Subscribe:FC = () => {
    const onSubmit=()=> {
        console.log('subscr')
    }

    return (
        <div className='subscribe'>   
            <h1>Be the first to know about our new products!</h1>
            <h2 className="text typewriter">Subscribe to our newsletter!</h2>
            <form onSubmit={onSubmit}>
                <input type="email" placeholder="Your email address" aria-label="Subscribe, add your email address"/>
                <Button text="Subscribe" width="50%" onClick={onSubmit}/>
            </form>
        </div>
    )
}