import { RequestHandler } from "express";
import * as bannerService from "../services/bannerService.js";

export const getActiveBanner: RequestHandler = async (_req, res, next) => {
  try {
    const banner = await bannerService.getActiveBanner();
    res.json({ banner });
  } catch (err) {
    next(err);
  }
};

export const setBanner: RequestHandler = async (req, res, next) => {
  try {
    const banner = await bannerService.setActiveBanner(req.body);
    res.status(201).json({ banner });
  } catch (err) {
    next(err);
  }
};

export const removeBanner: RequestHandler = async (_req, res, next) => {
  try {
    await bannerService.removeBanner();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
