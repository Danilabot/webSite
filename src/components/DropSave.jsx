import { useDroppable } from '@dnd-kit/core'
import styles from './styles/Drom.module.css'
export function DropSave({ id, children, title }) {
  const { isOver, setNodeRef } = useDroppable({
    id,
    data: {
      type: 'dropzone',
      containerId: id,
    },
  })
  const style = {
    backgroundColor: isOver ? 'green' : undefined,
  }

  return (
    <div ref={setNodeRef} style={style} className={styles.drop}>
      <h2 className={styles.save_text}>Сохранненые посты</h2>
      <div className={styles.child}>{children}</div>
    </div>
  )
}
