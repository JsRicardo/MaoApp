import Express from "express";
import { MovieService } from "../services/MovieService";
import { ResponseHelper } from "./ResponseHelper";

const router = Express.Router();

// param格式的get请求
router.get("/:id", async (req, res) => {
  try {
    const movieId = req.params.id;
    const movie = await MovieService.findById(movieId);
    ResponseHelper.sendData(movie, res);
  } catch (e) {
    ResponseHelper.sendData(null, res);
  }
});

// query格式的get请求
router.get("/", async (req, res) => {
  try {
    const result = await MovieService.find(req.query);
    ResponseHelper.sendPageData(result, res);
  } catch (e) {
    ResponseHelper.sendData(null, res);
  }
});

router.post("/", async (req, res) => {
  try {
    const result = await MovieService.add(req.body);
    if (Array.isArray(result)) {
      ResponseHelper.sendError(result, res);
    } else {
      ResponseHelper.sendData(result, res);
    }
  } catch (e) {
    ResponseHelper.sendError(e, res);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const result = await MovieService.edit(req.params.id, req.body);
    if (result.length > 0) {
      ResponseHelper.sendError(result, res);
    } else {
      ResponseHelper.sendData("update success", res);
    }
  } catch (e) {
    ResponseHelper.sendError(e, res);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await MovieService.edit(req.params.id, req.body);
    ResponseHelper.sendData("delete success", res);
  } catch (e) {
    ResponseHelper.sendError(e, res);
  }
});

export default router;