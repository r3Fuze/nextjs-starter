import { Category, Product } from "@prisma/client"

type ProductWithCategory = Product & {
  category: Category
}
