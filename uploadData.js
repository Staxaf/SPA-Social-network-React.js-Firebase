const firestoreSerivce = require('firestore-export-import')
const serviceAccount = require('./serviceAccountKey.json')

const databaseURL = 'https://social-network-react-redux.firebaseio.com'

firestoreSerivce.initializeApp(serviceAccount, databaseURL)

firestoreSerivce.restore('posts.json')