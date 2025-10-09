import { getApi } from "@/app/api/config/appConfig"

export const postRecipeComment = async (cocktailId: number, content: string) => {
  try {
      const res = await fetch(`${getApi}/cocktails/${cocktailId}/comments`, {
        method: 'POST',
        headers:{'Content-Type':'application/json'},
        credentials: 'include',
      body:JSON.stringify({content})
      })
    const text = await res.text()
    if (!res.ok) throw new Error('댓글 작성 실패')
    const data = JSON.parse(text)
  return data 
  }
  catch (err) {
    console.error(err)
  }
 
  }