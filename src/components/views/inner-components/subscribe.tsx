import Button from "../../shared/button"

export const Subscribe = () => {
    const onSubmit=()=> {
        console.log('subscr')
    }

    return (
        <div className='subscribe'>   
            <h1>Be the first to know about new products!</h1>
            <div className="subscribe-typed">
                <h2 className="typed">Subscribe to our newsletter!</h2>
            </div>
            <form onSubmit={onSubmit}>
                <input type="email" placeholder="Your email address" aria-label="Subscribe, add your email address"/>
                <Button text="Subscribe" width="50%" onClick={onSubmit}/>
            </form>
        </div>
    )
}