'use client'
import React from "react"
import { getDocs, collection, doc, addDoc, getDoc } from "firebase/firestore"
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import { getFirestore } from 'firebase/firestore'
import { initializeApp } from 'firebase/app'
import Head from "next/head"
import styles from '../page.module.css'

const CheckUser = async (userName) => {

  try{
    const app = initializeApp(firebaseConfig)
    const db = getFirestore(app)
    const colRef = collection(db, "family")
    const querySnapshot = await getDocs(colRef)
    const data = querySnapshot.docs.map(doc => doc.data())
    const foundUser = data.find((user) => user.userName === userName)


    if (foundUser) {
      const santaRef = collection(db, "santas")
      const santaSnapshot = await getDocs(santaRef)
      const santaData = santaSnapshot.docs.map(doc => doc.data())
      const foundSanta = santaData.find((user) => user.santa === userName)
      if (foundSanta) {
        const secret = foundSanta.secret.toString()
        const santa = foundSanta.santa.toString()

        alert('Hey ' + santa + '! You already have a person to gift to!')
      } else {
        const secret = data[Math.floor(Math.random() * data.length)].userName
        const santa = userName
        await addDoc(santaRef,{
          santa: userName,
          secret: secret
        })
        alert('Write this down, because you will only see it once! Santa: ' + santa + ' Secret: ' + secret)
      }
    } else {
      alert('User not found')
    }
    } catch (e) {
      console.error("Error adding document: ", e)
    }
}


const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}


export default class UserForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userName: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({userName: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    CheckUser(this.state.userName)
    this.setState({userName: ''})
  }

  render() {
    return (

    <div style={{fontFamily: 'Mountains of Christmas'}} className={styles.titlebacking}>
      <h1 className={styles.titleone}>Merry Christmas Family!</h1>
      <div>
        <h2 className={styles.titletwo}>Rules</h2>
        <h3 className={styles.titlethree}>1. Enter only your name (First Last).</h3>
        <h3 className={styles.titlethree}>2. You will only see your secret once.</h3>
        <h3 className={styles.titlethree}>3. Don't enter any one else's name!</h3>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Santa Clause"
            value={this.state.userName}
            onChange={this.handleChange}
            style={{fontFamily: 'Mountains of Christmas'}}
            className={styles.input}
          />
          <button
            type="submit"
            style={{fontFamily: 'Mountains of Christmas'}}
            className={styles.button}>
              Who's my secret?
            </button>
        </form>
      </div>
    </div>
    )
}
}
