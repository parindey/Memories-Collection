import React, { useEffect, useState, useContext } from 'react'

import { userContext } from '../../App'
import { useParams } from 'react-router-dom'

const Profile = () => {
    const [userProfile, setProfile] = useState(null)
   
    const { state, dispatch } = useContext(userContext)
    const { userid } = useParams()
    const[showfollow,setshowfollow]=useState(state?!state.following.includes(userid):true)
    //    console.log(userid)
    useEffect(() => {
        fetch('/user/' + userid, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
             //   console.log(result)
            
                setProfile(result)
            })
    }, [])


   /* const followUser = () => {
        fetch('/follow', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                followId: userid
            })
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
                localStorage.setItem("user",JSON.stringify(data))
                setProfile((prevState)=>{
                    return {
                        ...prevState,
                         user:{
                            ...prevState.user,
                            followers:[...prevState.user.followers,data._id]
                        }
                    }
                })
                setshowfollow(false)
            })
    }


            
    const unfollowUser = () => {
        fetch('/follow', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                unfollowId: userid
            })
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
                localStorage.setItem("user",JSON.stringify(data))
                setProfile((prevState)=>{
                    return {
                        ...prevState,
                         user:{
                            ...prevState.user,
                            followers:[...prevState.user.followers,data._id]
                        }
                    }
                })
             
            })
    }*/

    const followUser = () => {
        fetch('/follow',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization" : "Bearer " + localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                followId:userid
            })
        }).then(res => res.json())
        .then(data => {

            //console.log(data);
            dispatch({type:"UPDATE",payload:{
                following:data.following,
                followers:data.followers
            }})

            localStorage.setItem("user",JSON.stringify(data));
           
            setProfile((prevState) => {
                return {
                    ...prevState,
                    user:{
                        ...prevState.user,
                        followers:[...prevState.user.followers,data._id]
                    }
                }
            })
            setshowfollow(false);
            
        }).catch(err => {
            console.log(err);
        })
    }

    //unfollow user
    const unfollowUser = () => {
        fetch('/unfollow',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization" : "Bearer " + localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                unfollowId:userid
            })
        }).then(res => res.json())
        .then(data => {

            //console.log(data);
            dispatch({type:"UPDATE",payload:{
                following:data.following,
                followers:data.followers
            }})

            localStorage.setItem("user",JSON.stringify(data));

            

            setProfile((prevState) => {
                const newFollower = prevState.user.followers.filter(item=>item !== data._id)
                return {
                    ...prevState,
                    user:{
                        ...prevState.user,
                        followers:newFollower
                    }
                }
            })
            setshowfollow(true);
            
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <>
            {userProfile ?

                <div style={{ maxWidth: "520px", margin: " 0px auto" }}>
                    <div style={{
                        display: "flex",
                        justifyContent: "space-around",
                        margin: "80px 0px",
                        borderBottom: "1.5px solid grey"
                    }}>
                        <div>
                            <img style={{ width: "160px", height: "160px", borderRadius: "80px" }}
                                src={userProfile.user.pic}
                            />

                        </div>
                        <div>
                            <h4>{userProfile.user.name}</h4>
                            <h5>{userProfile.user.email}</h5>
                            <div style={{ display: "flex", justifyContent: "space-between", width: "104%" }}>
                                <h6>{userProfile.posts.length} posts</h6>
                                <h6>{userProfile.user.followers.length} followers</h6>
                                <h6>{userProfile.user.following.length} following</h6>
                            </div>
                            {showfollow ?   
                             <button style={{
                                 margin:"10px"
                             }} className="btn waves-effect waves-light #42a5f5 blue brighten-1"
                             onClick={() => followUser()}
                         >Follow

                         </button>
                         :
                         <button style={{
                            margin:"10px"
                        }} className="btn waves-effect waves-light #42a5f5 blue brighten-1"
                                onClick={() => unfollowUser()}
                            >unfollow

                            </button>
                        
                        }

                            
                           


                        </div>
                    </div>
                    <div className="gallery">
                        {
                            userProfile.posts.map(item => {
                                return ([
                                    <img key={item._id} className="item" src={item.photo} alt={item.title} />
                                ])
                            })
                        }

                    </div>


                </div>


                : <h2 style={{ top: "50px", textAlign: "center" }}>loading...!</h2>

            }

        </>
    )
}


export default Profile

