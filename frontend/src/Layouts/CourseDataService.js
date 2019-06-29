import axios from "axios";
const URL = "http://localhost:8080";

class CourseDataService {
  //=================GET=======================================

  getCustomer() {
    return axios.get(`${URL}/customer`);
  }
  getMajor() {
    return axios.get(`${URL}/major`);
  }
  getInstitute() {
    return axios.get(`${URL}/institute`);
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

  //=================POST=======================================
  postSuccessfully(id) {
    return axios.post(`${URL}/newhistory/${id}`);
  }
  postRepair(comments, name, uid, caserepair) {
    return axios.post(`${URL}/repair/${comments}/${name}/${uid}/${caserepair}`);
  }

  postCustomer(customerUid, customerIDs, customerName, customerPhone, customerImg, customerEmail, customerGender, majorId, instituteId) {
    return axios.post(`${URL}/addcustomer/${customerUid}/${customerIDs}/${customerName}/${customerPhone}/${customerImg}/${customerEmail}/${customerGender}/${majorId}/${instituteId}`);
  }
  postCustomer2(customerName, customerUid, customerImg, customerEmail) {
    return axios.post(`${URL}/customer/${customerName}/${customerUid}/${customerImg}/${customerEmail}`);
  }

  //=================PUT=======================================
  putSuccessfully(id) {
    return axios.put(`${URL}/upstatushistory/${id}`);
  }

  putCustomer(cusId, customerUid, customerIDs, customerName, customerPhone, customerImg, customerEmail, customerGender, majorId, instituteId) {
    return axios.put(`${URL}/putCustomer/${cusId}/${customerUid}/${customerIDs}/${customerName}/${customerPhone}/${customerImg}/${customerEmail}/${customerGender}/${majorId}/${instituteId}`);

  }
}

export default new CourseDataService();
