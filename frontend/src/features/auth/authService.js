import axios from "axios"
const URL = "auth"

// router.get("/me"

// registerUser
const registerUser = async (userData) => {
  const response = await axios.post(URL + "/register", userData)
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data))
    return response.data
  }
}

// updateUser
const updateUser = async (userData) => {
  const response = await axios.post(URL + "/update", userData)
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data))
    return response.data
  }
}

// logout User
const logoutUser = () => {
  localStorage.removeItem("user")
}

// login User
const loginUser = async (formData) => {
  const response = await axios.post(URL + "/login", formData)
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data))
    return response.data
  }
}

const authService = { registerUser, logoutUser, loginUser, updateUser }
export default authService
