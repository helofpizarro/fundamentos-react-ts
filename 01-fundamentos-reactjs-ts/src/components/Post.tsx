import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';
import {format, formatDistanceToNow} from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import styles from './Post.module.css';
import {Comment} from './Comment'
import { Avatar } from './Avatar';

interface Author {
  name: string
  role: string
  avatarUrl: string
}

interface ContentProps {
  type: 'paragraph' | 'link'
  content: string

}

interface PostProps {
  author: Author
  publishedAt: Date
  content: ContentProps[]
}

export function Post({author, publishedAt, content}: PostProps) {
    const [comment, setComment] = useState([
      'Post muito bacana, hein?'
    ])

    const [newCommentArea, setNewCommentArea] = useState('')

    const publishedDateFormatted = format(publishedAt, "d 'de' LLL 'ás' HH:mm'h'", {
      locale: ptBR
    } )
    const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
      locale: ptBR,
      addSuffix: true,
    })

    function handleCreateNewComment(event: FormEvent){
      event.preventDefault()


      setComment([...comment, newCommentArea])
      setNewCommentArea('')

    }

    function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
      setNewCommentArea(event.target.value)
      event.target.setCustomValidity('')

    }

    function deleteComment(commentToDelete: string) {
      const commentsWithoutDeleteOne = comment.filter(comments => {
         return comments !==  commentToDelete 
      })
      setComment(commentsWithoutDeleteOne)
    }

    function handleNewCommentinvalid(event: InvalidEvent<HTMLTextAreaElement>){
      event.target.setCustomValidity('Esse campo é obrigatŕio')
    }

    const isNewCommentInputEmpty = newCommentArea.length === 0

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar  src={author.avatarUrl}/>
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>
        <time 
          title={publishedDateFormatted}
          dateTime={publishedAt.toISOString()}>
            {publishedDateRelativeToNow}
        </time>

      </header>
      <div className={styles.content}>
        {
          content.map(line => {
            if(line.type === 'paragraph'){
              return <p key={line.content}>{line.content}</p>
            } else if(line.type === 'link'){
              return <p key={line.content}><a href='#'>{line.content}</a></p>
            }
          })
        }
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu comentário</strong>

        <textarea
          placeholder='Deixe seu comentário'
          name='comment'
          value={newCommentArea}
          onChange={handleNewCommentChange}
          required
          onInvalid={handleNewCommentinvalid}

        />
        <footer>
          <button type='submit' disabled={isNewCommentInputEmpty}>Publicar</button>
        </footer>
      </form>
       <div className={styles.commentList}>
          {
            comment.map(comment => {
              return (
              <Comment key={comment} content={comment} onDeleteComment={deleteComment}/>
              )
            })
          }
       </div>

    </article>
  )
}