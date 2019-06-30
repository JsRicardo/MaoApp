// 数据库
// express
// 验证  class-validator

import "reflect-metadata";
import Express from 'express';
import MovieRoute from './routes/MovieRoute';
import UploadRoute from './routes/UploadRoute';

const app = Express()

app.use(Express.json()) //使用中间件解析请求消息体中的JSON参数

app.use("/api/movie", MovieRoute)
app.use("/api/upload", UploadRoute)
app.use("/upload", Express.static("public/upload"))

app.listen(12306)
