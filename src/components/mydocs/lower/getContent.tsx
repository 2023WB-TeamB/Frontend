import axios from 'axios'
import { useApiUrlStore } from '../../../store/store'

const getContent = async (id: number) => {
  const { apiUrl } = useApiUrlStore() 
  try {
    // API 호출, 엑세스 토큰
    const access = localStorage.getItem('accessToken')
    const response = await axios.get(`${apiUrl}/docs/${id}`, {
      headers: { Authorization: `Bearer ${access}` },
    })
    const { content } = response.data.data
    // console.log(response)
    return content
  } catch (error) {
    // API 호출 실패
    console.error('API Error: ', error)
    alert('API 호출에 실패하였습니다.')
  }
  return null
}

export default getContent
