import React,{useEffect,createContext,useReducer,useContext} from 'react';
import NavBar from './components/Navbar'
import "./App.css"
import {BrowserRouter,Route,useHistory} from 'react-router-dom'
import Home from './components/screens/Home'
import SignUp from './components/screens/SignUp'
import Profile from './components/screens/Profile'
import Signin from './components/screens/Signin'
import CreatePost from './components/screens/CreatePost'
import { reducer,initialstate } from './reducers/userReducers'
import UserProfile from './components/screens/UserProfile'
import SubscribedUserPosts from './components/screens/SubscribedUserPost'

export const userContext= createContext()




const Routing =()=>{
  const history= useHistory()
  const{state,dispatch}=useContext(userContext)
  useEffect(() =>{
    const user = JSON.parse(localStorage.getItem("user"));

    if(user){
      dispatch({type:"USER",payload:user}); //update the info
      //history.push('/');
    }
    else{
      history.push('/signin');
    }
    //console.log(user);
  },[])
  return(
     <switch>
   
    <Route exact path="/">
       <Home />
     </Route>


     <Route path="/signup">
      <SignUp/>
     </Route>

     <Route path="/signin">
       <Signin/>
      </Route>

     <Route exact path="/profile">
       <Profile/>
     </Route>

     <Route path="/createpost">
       <CreatePost/>
     </Route>

     <Route path="/profile/:userid">
       <UserProfile/>
     </Route>
     <Route path="/myfollowingpost">
       < SubscribedUserPosts/>
     </Route>
     </switch>
  )
}

function App(){
   const [state,dispatch]= useReducer(reducer,initialstate)
  return(
    <userContext.Provider value ={{state,dispatch}}>
    <BrowserRouter>
 
   <NavBar/>
   <Routing/>
    
    
    </BrowserRouter>
    </userContext.Provider>
  );
  
}

export default App



