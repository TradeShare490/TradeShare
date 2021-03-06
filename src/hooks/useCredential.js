/* istanbul ignore file */
import UserService from '../services/User.service'

export const signUp = async (credentials, store, router) => {
  const response = await UserService.signup(credentials)
  if (response.success) {
    store.dispatch('login', credentials).then(() => {
      router.push({ name: 'BrokerageSignUp' })
    })
  } else {
    throw response.message
  }
  return false
}

export const login = async (credentials, store, _router) => {
  await store
    .dispatch('login', credentials)
    .then(() => {
      window.location.href = window.location.href + '/dashboard'
    })
    .catch(err => {
      throw err.response.data.message
    })
  return true
}

export const logout = async (store, router) => {
  store.dispatch('logout').then(() => {
    router.push({ name: 'Login' })
  })
}

export const brokerageSignUp = async credentials => {
  return credentials
}
