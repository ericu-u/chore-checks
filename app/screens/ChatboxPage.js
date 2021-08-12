//@refresh _reset

import React, { useState, useEffect, useCallback } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StyleSheet, TextInput, View, Button } from 'react-native'
import * as firebase from 'firebase'
import 'firebase/firestore'





const firebaseConfig = {
  apiKey: "AIzaSyBXrzMPWBxF9GBbtxLL1rqGeSVmz7C1KKw",
  authDomain: "chores-97427.firebaseapp.com",
  projectId: "chores-97427",
  storageBucket: "chores-97427.appspot.com",
  messagingSenderId: "409040868260",
  appId: "1:409040868260:web:f017bd7c65851944802731",
  measurementId: "G-4NVH0ELYEG"
}

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}



const db = firebase.firestore()
const chatsRef = db.collection('chats')

export default function App() {
  const [user, setUser] = useState(null)
  const [name, setName] = useState('')
  const [messages, setMessages] = useState([])

  useEffect(() => {
    readUser()
    const unsubscribe = chatsRef.onSnapshot((querySnapshot) => {
      const messagesFirestore = querySnapshot
        .docChanges()
        .filter(({ type }) => type === 'added')
        .map(({ doc }) => {
          const message = doc.data()
          
          return { ...message, createdAt: message.createdAt.toDate() }
        })
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      appendMessages(messagesFirestore)
    })
    return () => unsubscribe()
  }, [])

  const appendMessages = useCallback(
    (messages) => {
      setMessages((previousMessages) => GiftedChat.append(previousMessages, messages))
    },
    [messages]
  )

  async function readUser() {
    const user = await AsyncStorage.getItem('user')
    if (user) {
      setUser(JSON.parse(user))
    }
  }
  async function handlePress() {
    const _id = Math.random().toString(36).substring(7)
    const user = { _id, name }
    await AsyncStorage.setItem('user', JSON.stringify(user))
    setUser(user)
  }
  async function handleSend(messages) {
    const writes = messages.map((m) => chatsRef.add(m))
    await Promise.all(writes)
  }

 
  if (!user) {
    return (
      <View alignitmes= "center">
        <TextInput placeholder="Future google signin" value={name} onChangeText={setName} />
        <Button onPress={handlePress} title="type here" />
      </View>
    )
  }
  

  return <GiftedChat
   messages={messages} 
   user={user} onSend={handleSend} 
   renderUsernameOnMessage
   renderAvatarOnTop
   messagesContainerStyle={{ backgroundColor: '#7ab5ca' }} />
}
