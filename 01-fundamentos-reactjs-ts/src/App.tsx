import { Header } from "./components/Header"
import './global.css'
import styles from './App.module.css'
import {Post} from './components/Post'
import { Sidebar } from "./components/Sidebar"

const post = [
  {
    id: 1,
    author: {
      avatarUrl: 'https://github.com/helofpizarro.png',
      name: 'Maria Heloisa',
      role: 'Web Developer',
    },
    content: [
        {type: 'paragraph', content:  'Fala galeraa 👋'},
        {type: 'paragraph', content:  'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀'},
        {type: 'link', content: '👉jane.design/doctorcare'}
    ],
    publishedAt: new Date('2023-01-20 20:00:00')
  },
  {
    id: 2,
    author: {
      avatarUrl: 'https://github.com/maykbrito.png',
      name: 'Mayke Brito',
      role: 'Educator',
    },
    content: [
        {type: 'paragraph', content:  'Fala galeraa 👋'},
        {type: 'paragraph', content:  'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀'},
        {type: 'link', content: '👉jane.design/doctorcare'}
    ],
    publishedAt: new Date('2023-01-19 20:00:00')
  },

]

function App() {
  return (
    <div>
      <Header/>
      <div className={styles.wrapper}>
        <Sidebar/>
        <main>
          {
            post.map(posts => (
              <Post
                key={posts.id}
                author={posts.author}
                content={posts.content}
                publishedAt={posts.publishedAt}
              />
            ))
          }
        </main>
      </div>
    </div>
  )
}

export default App
