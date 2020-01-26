import axios from 'axios'

const genPostReq = url => (...params) => axios.post(`/api${url}`, ...params)

export default {

}
