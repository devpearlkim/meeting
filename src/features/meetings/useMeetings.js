// import { useQuery } from '@tanstack/react-query'
// import { useParams } from 'react-router-dom'
// import { addPost } from '../../services/apiPost'

// export function useMeeting() {
//   const { formData } = useParams()

//   const { isLoading, data, error } = useQuery({
//     queryKey: ['meeting', formData],
//     queryFn: () => addPost,
//     retry: false,
//   })

//   return { isLoading, error, data }
// }
