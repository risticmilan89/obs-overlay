import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {
  const [users, setUsers] = useState([]);
  const [donations, setDonations] = useState([]);

  const getUsersAxios = () => {
    var options = {
      method: "GET",
      url: "https://jsonplaceholder.typicode.com/users",
      params: { case: "lower" },
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        const rndDonations = [];
        const users = response.data;
        setUsers(users);

        for (const user of users) {
          rndDonations.push((Math.random() * 300).toFixed(2));
        }
        setDonations(rndDonations);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(() => {
    getUsersAxios();
  }, []);

  return (
    <div>
      <div className="content-wrapper">
        <div className="content-wrapper-inner main">
          {users.map((item, ix) => (
            <p className="user" key={ix}>
              {item.name} - ${donations[ix]}
            </p>
          ))}
        </div>
        <div className="content-wrapper-inner fake">
          {users.map((item, ix) => (
            <p className="user" key={ix}>
              {item.name} - ${donations[ix]}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
