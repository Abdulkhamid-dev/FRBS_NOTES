import { message } from "antd";
import { auth, firestore } from "../config/firebase";
import {
  collection,
  getDocs,
  addDoc,
  getFirestore,
  setDoc,
  doc,
} from "firebase/firestore";
import firebase from "firebase/compat/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { IUserInfo } from "../pages/Auth/SignUp";
import { toast } from "react-toastify";

export interface ITodo {
  title: string;
  description: string;
  userId?: string;
  id?: string;
}
const fetchTodos = async () => {
  try {
    const data = await firestore.collection("todos").get();
    const allTodos = data.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return allTodos;
  } catch (err: any) {
    toast.error(err?.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
};
const fetchUsers = async () => {
  try {
    const data = await firestore.collection("users").get();
    const allUsers = data.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return allUsers;
  } catch (err: any) {
    toast.error(err?.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
};
const addTodo = async (payload: ITodo) => {
  const { title, description, userId } = payload;

  try {
    const todos = await firestore.collection("todos").add({
      title,
      description,
      userId,
    });
    return todos;
  } catch (err: any) {
    toast.error(err?.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
};

const updateTodo = async (payload: ITodo) => {
  const { title, description, userId, id } = payload;
  try {
    await firestore.collection("todos").doc(id).update({
      title,
      description,
      userId,
    });
    const doc = await firestore.collection("todos").doc(id).get();
    return doc;
  } catch (err: any) {
    toast.error(err?.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
};

const deleteTodo = async (id?: string) => {
  try {
    await firestore.collection("todos").doc(id).delete();
    return true;
  } catch (err: any) {
    toast.error(err?.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
};

const signIn = async (data: IUserInfo) => {
  const { email, password } = data;
  try {
    const { user } = await auth.signInWithEmailAndPassword(email, password);
    return user;
  } catch (err: any) {
    toast.error(err?.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
};

const getAllUsers = async () => {
  try {
    const users = await firestore.collection("users").get();
    const sortedUsers = users.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return sortedUsers;
  } catch (err: any) {
    toast.error(err?.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
};
const signUp = async (userInfo: IUserInfo) => {
  const { email, password, role, fullName } = userInfo;
  try {
    const { user } = await auth.createUserWithEmailAndPassword(email, password);
    await user?.updateProfile({
      displayName: fullName,
      photoURL: role,
    });
    const updatedUser = auth.currentUser;
    const data = await firestore.collection("users").add({
      role: updatedUser?.photoURL,
      fullName: updatedUser?.displayName,
      email: updatedUser?.email,
    });
    return updatedUser;
  } catch (err: any) {
    toast.error(err?.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
};

export {
  fetchTodos,
  fetchUsers,
  signUp,
  signIn,
  getAllUsers,
  addTodo,
  updateTodo,
  deleteTodo,
};
