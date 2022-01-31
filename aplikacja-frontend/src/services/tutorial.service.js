import http from "../http-common";

class TutorialDataService {
  getAll() {
    return http.get((process.env.REACT_APP_API_ADDRESS.length ? process.env.REACT_APP_API_ADDRESS : 'http://localhost:8000') + "/api/oferty");
  }

  get(id) {
    return http.get((process.env.REACT_APP_API_ADDRESS.length ? process.env.REACT_APP_API_ADDRESS : 'http://localhost:8000') + `/api/oferty/${id}/`);
  }

  create(data) {
    return http.post((process.env.REACT_APP_API_ADDRESS.length ? process.env.REACT_APP_API_ADDRESS : 'http://localhost:8000') + "/api/oferty", data);
  }

  update(id, data) {
    return http.put((process.env.REACT_APP_API_ADDRESS.length ? process.env.REACT_APP_API_ADDRESS : 'http://localhost:8000') + `/api/oferty/${id}/`, data);
  }

  delete(id) {
    return http.delete((process.env.REACT_APP_API_ADDRESS.length ? process.env.REACT_APP_API_ADDRESS : 'http://localhost:8000') + `/api/oferty/${id}`);
  }

  deleteAll() {
    return http.delete((process.env.REACT_APP_API_ADDRESS.length ? process.env.REACT_APP_API_ADDRESS : 'http://localhost:8000') + `/api/oferty`);
  }

  findByTitle(title) {
    return http.get((process.env.REACT_APP_API_ADDRESS.length ? process.env.REACT_APP_API_ADDRESS : 'http://localhost:8000') + `/api/oferty/?search=${title}`);
  }
  getById(id) {
    return http.get((process.env.REACT_APP_API_ADDRESS.length ? process.env.REACT_APP_API_ADDRESS : 'http://localhost:8000') + `/api/oferty/?search=${id}`);
  }
}

export default new TutorialDataService();