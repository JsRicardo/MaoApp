// 数据库
// express
// 验证  class-validator

import { Movie } from "./entities/Movie";
import { validate } from "class-validator";

const movie = new Movie();
movie.areas = ["asdad"];
movie.isComing = false;
movie.isHot = false;
movie.name = "sdasd";
movie.poster = "daseda";
movie.timeLong = 2;
movie.types = ["asdasd"];

validate(movie).then(err => {
  console.log(err)
})