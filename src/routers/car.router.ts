import { Router } from "express";

import { carController } from "../controllers/car.controller";
import { EUserRoles } from "../enums";
import { authMiddleware } from "../middlewares/auth.middleware";
import { carMiddleware } from "../middlewares/car.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { CarValidator } from "../validators/car.validator";

const router = Router();

router.get(
  "/",
  commonMiddleware.isQueryValid(5, "createdAt"),
  carController.getAll,
);

router.post(
  "/",
  authMiddleware.checkAccessToken,
  commonMiddleware.isBodyValid(CarValidator.create),
  carController.createCar,
);

router.get(
  "/car-cards-moderation",
  authMiddleware.checkRole([EUserRoles.Administrator, EUserRoles.Manager]),
  commonMiddleware.isQueryValid(5, "createdAt"),
  carController.getAllInactiveCars,
);

router.get(
  "/:carId",
  commonMiddleware.isIdValid("carId"),
  carMiddleware.getByIdOrThrow,
  carController.getById,
);

router.put(
  "/:carId",
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("carId"),
  commonMiddleware.isBodyValid(CarValidator.update),
  carController.updateCar,
);

router.delete(
  "/:carId",
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("carId"),
  carController.deleteCar,
);

export const carRouter = router;
