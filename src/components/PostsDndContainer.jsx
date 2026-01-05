import { DndContext } from '@dnd-kit/core'
import { PostList } from './PostList'
import { DropSave } from './DropSave'
import { PostItem } from './PostItem'

export const PostsDndContainer = ({
  onDragEnd,
  sortedAndSearchedPosts,
  sortedAndSearchedSavePosts,
  addPost,
  postDelete,
  changePost,
  postSaveDelete,
  changeSavePost,
  savePosts,
}) => {
  return (

    <DndContext onDragEnd={onDragEnd}>
        <DropSave id="saved-posts">
          {savePosts.length === 0
            ? null
            : sortedAndSearchedSavePosts.map((post) => (
                <PostItem
                  key={post.id}
                  isSaved={true}
                  post={post}
                  postDelete={postSaveDelete}
                  onChange={changeSavePost}
                />
              ))}
        </DropSave>
      
        <PostList
          addPost={addPost}
          posts={sortedAndSearchedPosts}
          postDelete={postDelete}
          changePost={changePost}
        />
      
    </DndContext>
  )
}
