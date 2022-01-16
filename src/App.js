import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios'
import User from './components/User'
import Form from './components/Form'

const initialFormVal = {
  name: '',
  email:'',
  password:''
}



function App() {
  const [user, setUser] = useState([])
  const [originalFormValues, setFormValues] = useState(initialFormVal)

  const getUser = () =>{
    axios.get('https://reqres.in/api/users')
    .then(res =>{
      setUser(res.data.data)
    })
    .catch(err=>{
      console.log(err)
    })
  }

  const postUser = newUser =>{
    axios.post("https://reqres.in/api/users",newUser)
    .then(res=>{
      setUser([res.data, ...user])
      setFormValues(initialFormVal)
    })
    .catch(err=>{
      console.log(err)
    })
  }
  const onChange = (name, value)=>{
  setFormValues({
    ...originalFormValues,
    [name]: value
  })
  }

  const onSubmit = ()=>{
    const newUser ={
      name:originalFormValues.name.trim(),
      email:originalFormValues.email.trim(),
      password: originalFormValues.password.trim()
    }
    postUser(newUser)
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <div className="App">
      <header className='App-header'>
        <Form 
        onChange={onChange}
        value= {originalFormValues}
        submit ={onSubmit}
    />
      </header>
    {
      user.map(user=>{
        return(
          <User key={user.id} values={user} />
        )
      })
    }
    </div>
  );
}

export default App;
