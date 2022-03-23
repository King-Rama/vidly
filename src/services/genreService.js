import http from "./httpService";
import config from '../config.json'

export async function getGenres() {
  return await http.get(config.apiEndPoint+"/api/genres");
}

