import React, {useState} from 'react'
import {useHistory, Link} from 'react-router-dom'
import {axiosWithAuth} from '../utils/axiosWithAuth'
import {TextField,Button} from '@material-ui/core'

const initalCredentials = {
    username: '',
    password: ''
  }




const Login = () =>{
    const [ credentials, setCredentials ] = useState(initalCredentials)
const history = useHistory();

const onInputChange = evt => {
        const name = evt.target.name
        const value = evt.target.value

        setCredentials({
            ...credentials,
            [name]: value 
        })
    }

    const login = () => {
        axiosWithAuth()
            .post('/api/login ', credentials)
            .then((res) => {
                window.localStorage.setItem('username', credentials.username);
                window.localStorage.setItem('token', res.data.token);
            
            })
            .catch(err => console.log(err))
        }    

    return (
      
          <form className='login' style={{display:'flex',flexDirection:'column', justifyItems:'center',alignItems:'center', width:'100%',marginTop:'15%', }} >
          <TextField 
                id='outlined-basic' 
                label='USERNAME' 
                variant='outlined'
                name='username'
                value={credentials.username}
                onChange={onInputChange}/>
                
                <TextField style={{marginTop:'1rem'}}
                id='outlined-basic' 
                label='PASSWORD' 
                type="password"
                variant='outlined'
                name='password'
                value={credentials.password}
                onChange={onInputChange}/>
                <Button style={{marginTop:'1rem'}} onClick={login} variant='contained'>
                        Login    
                </Button>
               <p>Not Registered? Sign Up <Link to ="/sign-up">Here</Link></p>
          </form>
        
    )

}

export default Login