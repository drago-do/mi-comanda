import { useState } from "react";
import axios from "axios";

//Obtener variable de entorno
const API_URL = process.env.API_URL;

export function useUsers() {
  const [users, setUsers] = useState(null);

  const getUsers = async () => {
    try {
      const cachedUsers = JSON.parse(localStorage.getItem("usuarios"));
      if (cachedUsers) {
        setUsers(cachedUsers);
      } else {
        const response = await axios.get(`${API_URL}user`);
        const nuevosUsers = response.data;
        localStorage.setItem("usuarios", JSON.stringify(nuevosUsers));
        setUsers(nuevosUsers);
      }
    } catch (error) {
      console.error(error);
      setUsers(null);
    }
  };

  return { users, getUsers };
}
