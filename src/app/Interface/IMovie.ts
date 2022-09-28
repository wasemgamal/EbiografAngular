import { ICinemahall } from 'src/app/Interface/ICinemahall';
import { ICinemaSeat } from './ICinemaSeat';
import { IGenre } from "./IGenre";

export interface IMovie
{
    movieID:string,
    title:string,
    imgLink:string,
    description:string,
    duration:number,
    language:number,
    releaseDate:Date,
    trailerLink:string,
    // cinemaHall?: ICinemahall,
    // availableSeats?:ICinemaSeat[]
}
