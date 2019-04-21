import { NewModel } from './new-model';
export interface ApiResponse {
  status:string,
  totalResults:number,
  articles: NewModel[];

}
