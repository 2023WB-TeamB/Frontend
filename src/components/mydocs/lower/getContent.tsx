import axios from 'axios'

const getContent = async (id: number, apiUrl: string) => {
  try {
    // API 호출, 엑세스 토큰
    const access = localStorage.getItem('accessToken')
    const response = await axios.get(`${apiUrl}/${id}`, {
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
