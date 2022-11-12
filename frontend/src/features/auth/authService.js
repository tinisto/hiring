import axios from "axios"
const URL = "auth"

// registerUser _____________________________________________________________________________________
const registerUser = async (userData) => {
  const response = await axios.post(URL + "/register", userData)
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data))
    return response.data
  }
}

// login User _____________________________________________________________________________________
const loginUser = async (formData) => {
  const response = await axios.post(URL + "/login", formData)
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data))
    return response.data
  }
}

// updateUser _____________________________________________________________________________________
const updateUser = async (userData) => {
  const response = await axios.post(URL + "/update", userData)
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data))
    return response.data
  }
}

// logout User _____________________________________________________________________________________
const logoutUser = () => {
  localStorage.removeItem("user")
}

const authService = { registerUser, loginUser, updateUser, logoutUser }
export default authService
