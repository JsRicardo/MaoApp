import Mongoose, { Schema } from "mongoose";
import { Movie } from "../entities/Movie";

interface IMovie extends Movie, Mongoose.Document { }

const movieSchema = new Mongoose.Schema<IMovie>(
  {
    name: String,
    types: [String],
    areas: [String],
    timeLong: Number,
    isHot: Boolean,
    isClassical: Boolean,
    isComing: Boolean,
    description: String,
    poster: String,
  },
  {
    versionKey: false,
  },
);

export default Mongoose.model<IMovie>("Movie", movieSchema)