import axios from 'axios'
import { IResponseData, IResponseError, ISearchCondition, IResponsePageData } from '../commonTypes';

export interface IMovie {
  _id?: string;
  name: string;
  types: string[];
  areas: string[];
  timeLong: number;
  isHot: boolean;
  isComing: boolean;
  isClassical: boolean;
  description?: string;
  poster?: string;
}

export class MovieService {
  public static async add(movie: IMovie): Promise<IResponseData<IMovie> | IResponseError> {
    const { data } = await axios.post("/api/movie", movie);
    return data;
  }

  public static async edit(id: string, movie: IMovie): Promise<IResponseData<string> | IResponseError> {
    const { data } = await axios.put("/api/movie/" + id, movie)
    return data
  }

  public static async delete(id: string): Promise<IResponseData<string> | IResponseError> {
    const { data } = await axios.delete("/api/movie/" + id)
    return data
  }

  public static async getMovieById(id: string): Promise<IResponseData<IMovie | null>> {
    const { data } = await axios.get("/api/movie/" + id);
    return data
  }

  public static async getMovieList(condition: ISearchCondition): Promise<IResponsePageData<IMovie> | IResponseData<null>> {
    const { data } = await axios.get("/api/movie/", {
      params: condition
    });
    return data
  }
}