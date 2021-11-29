import React,{useContext} from 'react';
import { Link,useHistory} from 'react-router-dom';
import { userContext } from '../App';
//import Signin from './screens/Signin';


const NavBar = ()=>{
  const{state,dispatch}=useContext(userContext)
  const history = useHistory()
  const renderList=()=>{
    if(state){
      return[
        <li><Link to="/profile">profile</Link></li>,
        <li><Link to="/createpost">createpost</Link></li>,
        <li><Link to="/myfollowingpost">My following Posts</Link></li>,
        <li>
        <button className="btn #d50000 red accent-4 "style={{borderRadius:"7px",margin:"0px 10px"}}
         onClick ={()=>{
           localStorage.clear()
         dispatch({type:"CLEAR"})
         history.push('signin')
      }}
            >Logout

</button>

</li>

      ]
    }else{
      return[
        <li><Link to="/signin">Signin</Link></li>,
          <li><Link to="signup">signup</Link></li>
       

      ]


    }
  }
  return(
    <nav>
      <div className="nav-wrapper white">
        <Link to={state ?"/":"/Signin"} className="brand-logo left">Instagram</Link>
        <ul id="nav-mobile" className="right ">
          {renderList()}
          
        </ul>
      </div>
    </nav>
    )
  }



export default NavBar
