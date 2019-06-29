import axios from "axios";
const URL = "http://localhost:8080";

class CourseDataService {
  //=================GET=======================================

  getCustomer() {
    return axios.get(`${URL}/customer`);
  }
  getCustomerUID(id) {
    return axios.get(`${URL}/customer/${id}`);
  }
  getRepair(id) {
    return axios.get(`${URL}/statusRepair/${id}`);
  }
  getCaseRepair() {
    return axios.get(`${URL}/caseRepair`);
  }
  getStatusManage(id) {
    return axios.get(`${URL}/statusManage/${id}`);
  }
  getStatusSuccessfulRepair(id) {
    return axios.get(`${URL}/statusSuccessfulRepair/${id}`);
  }
  getHistory(id) {
    return axios.get(`${URL}/history/${id}`);
  }

  getHistory2(id) {
    return axios.get(`${URL}/historyPoint/${id}`);
  }
  getImg(id) {
    return axios.get(`${URL}/api/files/${id}`);
  }
  getImgAll() {
    return axios.get(`${URL}/api/files/getidImgaa`);
  }
  getTechnicPointss(id){
    return axios.get(`${URL}/technicPointss/${id}`);
  }
  getTechnic(){
    return axios.get(`${URL}/technic/`);
  }

  //=================POST=======================================
  postSuccessfully(id) {
    return axios.post(`${URL}/newhistory/${id}`);
  }
  postRepair(comments,name,uid,caserepair){
    return axios.post(`${URL}/repair/${comments}/${name}/${uid}/${caserepair}`);
  } 

  //=================PUT=======================================
  putSuccessfully(id) {
    return axios.put(`${URL}/upstatushistory/${id}`);
  }  
} 

export default new CourseDataService();
