import React , {useContext, useRef,useState} from "react"
import { useRouter } from 'next/router'

import {UserContext} from "../context/userContext"



import LogLoader from './loader/log_loader'

import {auth, db} from '../../firebase-config'
// import { useNavigate } from 'react-router'
import Cookies from "universal-cookie"


export default function Login(){
//   const navigate = useNavigate()
  const cookies = new Cookies();
  const router = useRouter()
  const {connexion, checkUser, setUserInfo} = useContext(UserContext)
  const [logLoader, setLogLoader] = useState(false)
  const [logResult, setLogResult] = useState(false)
  const inputs = useRef([])
  const addInputs = el => {
    if(el && !inputs.current.includes(el)){
      inputs.current.push(el)
    }
  }
  const closeLogModal = () => {
    setLogResult(false)
    setLogLoader(false)
  }
  const firebaseConnexion = async (e) => {
    e.preventDefault()
    setLogLoader(true)
    try {
      const cred = await connexion(inputs.current[0].value, inputs.current[1].value)
      // formRef.current.reset()
      let array_first_cred = [cred.user.email,cred.user.uid]
      try {
        const cred2 = await checkUser(array_first_cred[1])
        let userState = {
          "uid": array_first_cred[1],
          "email": array_first_cred[0],
          "name": cred2.name,
          "type": cred2.type,
          "plugins": cred2.allow
        }
        cookies.set('infoUser', userState, {path: '/'})
        setUserInfo(userState)
        setLogResult(false)
        setLogLoader(false)
        // navigate("/manager")
        router.push("/manager")
      } catch (e) {
        setLogResult('Erreur2')

      }

    } catch (err) {
      //Mot de passe erreur
      console.log(err);
      setLogResult('Erreur')
    }
  }
  return(
    <div className="home_container" >
      {logLoader ? <LogLoader close={closeLogModal} result={logResult}/> : ""}
      <div className="enc_logo">
        <p>hello</p>
      </div>

      <form onSubmit={firebaseConnexion} className="log_form">
        <div className="field_log">
          <div className="enc_field_icon">
            <p>user mail</p>
          </div>
          <input ref={addInputs} type="text" placeholder="Votre identifiant"/>
        </div>
        <div className="log_form_line"></div>
        <div className="field_log">
          <div className="enc_field_icon">
            <p>user password</p>
          </div>
          <input ref={addInputs} type="password" placeholder="Votre mot de passe"/>
        </div>
        <div className="log_form_line"></div>
        <div className="valid_entry">
          <p>mot de passe oublié?</p>
          <input className="link_green" type="submit" value="valider"/>
        </div>
      </form>
    </div>
  )
}
