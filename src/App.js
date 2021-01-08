import create from "zustand";
import axios from "axios";
import { useEffect } from "react";

const useStore = create((set) => ({
  users: [],
  donations: [],
  setUsers: (users) => set((state) => ({ ...state, users })),
  setDonations: (donations) => set((state) => ({ ...state, donations })),
}));

const App = () => {
  const users = useStore((state) => state.users);
  const donations = useStore((state) => state.donations);
  const setUsers = useStore((state) => state.setUsers);
  const setDonations = useStore((state) => state.setDonations);

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
