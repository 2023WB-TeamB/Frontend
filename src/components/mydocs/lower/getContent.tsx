import axios from 'axios'

const getContent = async (id: number, apiUrl: string) => {
  try {
    // API 호출, 엑세스 토큰
    const access = localStorage.getItem('accessToken')
    const response = await axios.get(`${apiUrl}/${id}`, {
      headers: { Authorization: `Bearer ${access}` },
    })
    const { content } = response.data.data
    return content
  } catch (error) {
    // API 호출 실패
    console.error('API Error: ', error)
  }
  return null
}

export default getContent
