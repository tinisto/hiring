import axios from "axios"
const URL = "/search"

// getSearch _____________________________________________________________________________________
const getSearch = async (search) => {
  const response = await axios.get(`${URL}/?search_query=${search}`)
  if (response.data) {
    return response.data
  }
}

const searchService = {
  getSearch,
}

export default searchService
