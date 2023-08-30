import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { rejects } from "assert";

//Obtener variable de entorno
const API_URL = process.env.API_URL;

export function useUsers() {
  const [users, setUsers] = useState(null);

  const getUsers = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const cachedUsers = JSON.parse(localStorage.getItem("usuarios"));
        if (cachedUsers) {
          setUsers(cachedUsers);
          resolve(cachedUsers);
        } else {
          const response = await axios.get(`${API_URL}user`);
          const nuevosUsers = response.data;
          localStorage.setItem("usuarios", JSON.stringify(nuevosUsers));
          setUsers(nuevosUsers);
          resolve(nuevosUsers);
        }
      } catch (error) {
        console.error(error);
        setUsers(null);
        reject(error);
      }
    });
  };

  const openUserSesion = (user) => {
    return new Promise(async (resolve, reject) => {
      try {
        Cookies.set("username", user.username);
        Cookies.set("role", user.role);
        Cookies.set("id", user._id);
        Cookies.set("avatar", user.avatar);
        resolve(true);
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });
  };

  const closeUserSesion = () => {
    return new Promise(async (resolve, reject) => {
      try {
        Cookies.remove("username");
        Cookies.remove("id");
        Cookies.remove("avatar");
        Cookies.remove("role");
        resolve(true);
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });
  };

  const userIsOnSesion = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const username = Cookies.get("username");
        const role = Cookies.get("role");
        const id = Cookies.get("id");
        if (username && role && id) {
          resolve(true);
        } else {
          resolve(false);
        }
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });
  };

  return { users, getUsers, closeUserSesion, openUserSesion, userIsOnSesion };
}
