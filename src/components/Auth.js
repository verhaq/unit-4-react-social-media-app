import {useState} from 'react'
import axios from 'axios'
import { useContext } from 'react'
import AuthContext from '../store/authContext'
 
const Auth = () => {

    
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [register, setRegister] = useState(true)
    
    const authCtx = useContext(AuthContext)
   
   const submitHandler = e => {
       e.preventDefault()
       
       const body = {
           username,
           password
        }
        
        const baseUrl = "https://socialmtn.devmountain.com"

       axios.post(register ? `${baseUrl}/register` : `${baseUrl}/login`, body)
        .then((res) => {
            console.log('AFTER AUTH', res.data)
            authCtx.login(res.data.token, res.data.expiration, res.data.id)
        })
        .catch(err => {
            setPassword('')
            setUsername('')
        })
        
        console.log('submitHandler called')
   }
 
   return (
       <main>
           <h1>Welcome!</h1>
           <form className='form auth-form' onSubmit={submitHandler}>
               <input
                type='text'
                placeholder='Username'
                value={username} 
                onChange={e => setUsername(e.target.value)}
                   className='form-input'/>
               <input
                 type="text"
                placeholder='Password'
               value={password}
               onChange={e => setPassword(e.target.value)}
                   className='form-input'/>
               <button className='form-btn'>
                   {register ? 'Sign Up' : 'Login'}
               </button>
           </form>
           <button className='form-btn'>Need to {register ? 'Login' : 'Sign Up'}?</button>
       </main>
   )
}
 
export default Auth