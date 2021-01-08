import React, { useEffect, useState } from 'react';
import { CategoryAdd } from './components/CategoryAdd';
import { CategoryList } from './components/CategoryList';
import io from 'socket.io-client';

const connectSocketServer = () => {
  const socket = io.connect('http://localhost:8080', {
    transports: ['websocket']
  });
  return socket;
}

function App() {

  const [socket] = useState(connectSocketServer())
  const [online, setOnline] = useState(false);
  const [category, setCategories] = useState([]);

  useEffect( () => {
    console.log(socket);
    setOnline(socket.connected);
  }, [socket]);

  useEffect( () => {
    socket.on('connect', () => {
      setOnline(true);
    })
  }, [socket])

  useEffect( () => {
    socket.on('disconnect', () => {
      setOnline(false);
    })
  }, [socket])

  useEffect( () => {
    socket.on('category-list', (data) => {
      setCategories(data);
    })
  })

  const votes = (id) => {
    socket.emit('category-vote', id);
  }

  const deleteCategory = (id) => {
    socket.emit('category-delete', id);
  }

  const EditName = (id, name) => {
    socket.emit('category-edit', {id, name});
  }

  const addData = (name) => {
    socket.emit('category-add', name);
  }

  return (
    <div className="container">
      <div className="alert">
        <p>
          Service Status: 
          {
            online
            ?
            <span className="text-success">Online</span>
            :
            <span className="text-danger">Offline</span>
          }
        </p>
      </div>

      <h1> Categories Lenguage  </h1>
      <hr/>

      <div className="row">
        <div className="col-8">
          <CategoryList
          data = {category}
          votes = {votes}
          deleteCategory = {deleteCategory}
          EditName = {EditName}
          />
        </div>
        <div className="col-4">
          <CategoryAdd
          addData={addData}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
