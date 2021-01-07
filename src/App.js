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
          />
        </div>
        <div className="col-4">
          <CategoryAdd/>
        </div>
      </div>
    </div>
  );
}

export default App;
