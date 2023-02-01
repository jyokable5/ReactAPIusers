import React, { Component } from 'react';

class App extends Component{

constructor(props){
  super(props)
  this.state = {
    users:[],isLoading:true,isError:false
  }
}

//async function -- GET request

async componentDidMount(){
  this.setState({isLoading:true})

  const response = await fetch("https://jsonplaceholder.typicode.com/users")

  let users = ({});

  if(response.ok){
    const users = await response.json()
    console.log(users)
    this.setState({users,isLoading:false})
  }
  else{
    this.setState({isError:true,isLoading:false})
  }
}

renderTableHeader = () => {
    return Object.keys(this.state.users[0]).map(attr => <th key={attr}>
      {attr.toUpperCase()}
    </th>)
}
renderTableRows = () => {
   return this.state.users.map(user => {
    return (
      <tr key={user.id}>
        <td>{user.id}</td>
        <td>{user.name}</td>
        <td>{user.username}</td>
        <td>{user.email}</td>
        <td>
          {`${user.address.street},${user.address.city}`}
        </td>
        <td>{user.phone}</td>
        <td>{user.website}</td>
        <td>{user.company.name}</td>
      </tr>
    )
   })
}


  render(){
    const {users,isLoading,isError} = this.state
    
    if(isLoading){
      return <div>Loading.....</div>
    }

    if(isError){
      return <div>Error.....</div>
    }
   
    return users.length>0? ( 
         <table>
          <th>
           <tr>
            {this.renderTableHeader()}
            </tr> 
          </th>
          <tbody>
            {this.renderTableRows()}
          </tbody>
         </table>
    ) : (
           <div>No users</div>
    )
  }
}
export default App