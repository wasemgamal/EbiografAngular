import { ICinemahall } from 'src/app/Interface/ICinemahall';
import { IMovie } from 'src/app/Interface/IMovie';
import { ICinemaSeat } from "./ICinemaSeat";

export interface IShow {
  showID: string,
  date: Date,
  startTime: Date,
  endTime: Date,
  movie: IMovie,
  cinemaHall: ICinemahall,
  availableSeats?:ICinemaSeat[]
}
