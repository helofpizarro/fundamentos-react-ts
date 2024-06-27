import styles from './Comment.module.css'
import {ThumbsUp, Trash} from 'phosphor-react'
import { Avatar } from './Avatar'
import {useState} from 'react'


interface Comment {
  content: string
  onDeleteComment: (comment: string) => void
}

export function Comment({content, onDeleteComment}: Comment) {
    const [likeComment, setLikeComment] = useState(0)

  function handleDeleteComment() {  
      onDeleteComment(content)
  }

  function handleLikeComment() {
    setLikeComment((state) => {
      return state + 1
    })
  }

  return (
    <div className={styles.comment}>
      <Avatar hasBorder={false} src='https://github.com/helofpizarro.png' alt=''/>

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
           <header>
            <div className={styles.authorAndTime}>
              <strong>Maria Heloisa</strong>
              <time title='11 de Maio as 8h13' dateTime='2023-05-11 08:13:00'>Publicado há 1h atrás</time>
            </div>
            <button onClick={handleDeleteComment} title='Deletar comentário'>
              <Trash size={24}/>
            </button>
           </header>

           <p>{content}</p> 
        </div> 
        <footer>
          <button onClick={handleLikeComment}>
          <ThumbsUp />
            Aplaudir <span>{likeComment}</span>
          </button>
        </footer>       
      </div>
    </div>
  )
}