import { ICinemaSeat } from "./ICinemaSeat";
import { IShow } from "./IShow";

export interface ICinemahall
{
  cinemaHallID:string;
  name:string,
  cinemaSeats:ICinemaSeat[],
  shows:IShow[],
}
