import axiosClient from "./axiosClient";

class CallApi {
  static getInfoTicket({ bookingCode, userLanguage }) {
    const url = `/vnapaylater/pnrinfo/${bookingCode}/${userLanguage}`;
    return axiosClient.get(url);
  }
}

export default CallApi;
