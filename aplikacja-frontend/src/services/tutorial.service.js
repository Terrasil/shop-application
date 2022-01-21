import http from "../http-common";

class TutorialDataService {
  getAll() {
    return http.get("/oferty");
  }

  get(id) {
    return http.get(`/oferty/${id}/`);
  }

  create(data) {
    return http.post("/oferty", data);
  }

  update(id, data) {
    return http.put(`/oferty/${id}/`, data);
  }

  delete(id) {
    return http.delete(`/oferty/${id}`);
  }

  deleteAll() {
    return http.delete(`/oferty`);
  }

  findByTitle(title) {
    return http.get(`/oferty/?search=${title}`);
  }
  getById(id) {
    return http.get(`/oferty/?search=${id}`);
  }
}

export default new TutorialDataService();