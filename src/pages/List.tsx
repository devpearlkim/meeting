import { useLocation } from 'react-router-dom'
import MeetingSearchFrom from '../features/meetings/MeetingSearchForm'

const List = () => {
  const location = useLocation()
  console.log('stae확인')
  console.log(location.state)

  return (
    <div>
      리스트 페이지 입니다.
      <MeetingSearchFrom />
    </div>
  )
}

export default List
