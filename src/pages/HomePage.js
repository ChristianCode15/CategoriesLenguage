import React, { useContext} from 'react';
import {SocketContext} from '../context/SocketContext';
import { CategoryAdd } from '../components/CategoryAdd';
import { CategoryList } from '../components/CategoryList';
import { CategoryChart } from '../components/CategoryChart';




function HomePage() {

  const {online} = useContext(SocketContext);
  
 // const [category, setCategories] = useState([]);

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
        <div className="col">
          <CategoryChart/>
        </div>
      </div>

      <div className="row">
        <div className="col-8">
         <CategoryList/>
        </div>
        <div className="col-4">
          <CategoryAdd/>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
