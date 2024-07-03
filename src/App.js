import React, {useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';




function App() {
  const [albums, setAlbums] = useState([]);
  const [newUserID, setNewUserID] = useState("")
  const [newID, setNewID] = useState("")
  const [newTitle, setNewTitle] = useState("")

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/albums")
    .then(response => response.json())
    .then(json => setAlbums(json))
  }, [])

 
    
    const addAlbum =() => {
      const userId = newUserID.trim()
      const id = newID.trim()
      const title = newTitle.trim()
      fetch("https://jsonplaceholder.typicode.com/albums", {
        method: "POST",
        body: JSON.stringify({
          userId,
          id,
          title,
        }),
        
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
  
      .then (response => response.json())
    .then(data => {
      setAlbums([...albums, data])
      setNewUserID("")
      setNewID("")
      setNewTitle("")
    })
  }

  const updateAlbum = id => {
    fetch (`https://jsonplaceholder.typicode.com/albums/${id}`, {
    method: "PUT",
 })
  .then(response => response.json())
   .then(alert("updated successfully!"))
 }

  const deleteAlbum = id => {
     fetch (`https://jsonplaceholder.typicode.com/albums/${id}`, {
     method: "DELETE",
  })
   .then(response => response.json())
    .then(() => {
      setAlbums(values => {
        return values.filter(item => item.id !== id)
      })
    })
  }

   
  
  return (
    <div className='App'>
      
      <h1>The Albums</h1>
      <a href='https://jsonplaceholder.typicode.com/albums/1' title='Link to first album'>First Album</a>
      <br></br>
     
      <br></br>
      
    <table className='table table-dark table-striped table-responsive'>
      
      <thead>
        <tr className='title'>
          <th>UserID</th>
          <th>ID</th>
          <th>Title</th>
          <th>Actions</th>

        </tr>
      </thead>
      <tbody>
        {albums.map((album) => (
        
              <tr key={album.id}>
              <td>{album.userId}</td>
              <td>{album.id}</td>
              <td>{album.title}</td>
              <td>
                <button onClick={() => updateAlbum(album.id)} className='btn btn-outline-warning'>
                  Update
                </button>
                &nbsp;
                &nbsp;
                <button  onClick={() => deleteAlbum(album.id)}className='btn btn-outline-danger'>Delete</button>
              </td>
            </tr>
        ))}
      
      
      </tbody>
      
    <tfoot>
        <tr>
          <td></td>
          <td>
            <input  onChange={e => setNewUserID(e.target.value)}placeholder='add userId here...'
            />
          </td>
          <td>
            <input  onChange={e => setNewID(e.target.value)}placeholder='add id here...'
            />
          </td>
          <td>
            <input  onChange={e => setNewTitle(e.target.value)}placeholder='add title here...'
            />
          </td>
          <td>
            <button className="btn btn-outline-success" onClick={addAlbum}>
              Add Album
            </button>
          </td>
        </tr>
      </tfoot>
    

      
    </table>
   
    
  </div>
  )
}

export default App;