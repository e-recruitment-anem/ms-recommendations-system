import { Router} from "express"

// Routes
import { offreRoutes } from "./offreRoutes"
import { profileRoutes } from "./profileRoutes"

// Consume routes
const router = Router()
router.use("/offer", offreRoutes)
router.use("/profile", profileRoutes)

export { router } 