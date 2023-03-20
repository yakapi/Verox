import {auth} from "../../firebase-config"
 function Tester(){
    console.log(auth);
    console.log(process.env.NEXT_PUBLIC_FIREBASE_API_KEY);
    return(
        <div>
            tester
        </div>
    )
}


export default Tester