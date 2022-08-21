import Head from "next/head"
import type { GetStaticProps, NextPage } from "next"

import Product from "@/components/Product"
import prisma from "@/lib/prisma"
import type { ProductWithCategory } from "@/types/prisma"

type Props = {
  products: ProductWithCategory[]
}

const HomePage: NextPage = ({ products }: Props) => {
  return (
    <div>
      <Head>
        <title>PlanetScale Next.js Quickstart</title>
        <meta name="description" content="PlanetScale Quickstart for Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-10 mx-auto max-w-4xl">
        <h1 className="text-6xl font-bold mb-4 text-center">
          PlanetScale Next.js Starter
        </h1>
        <p className="mb-20 text-xl text-center">
          🔥 Shop from the hottest items in the world 🔥
        </p>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 justify-items-center  gap-4">
          {products.map((product) => (
            <Product product={product} key={product.id} />
          ))}
        </div>
      </main>

      <footer></footer>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await prisma.product.findMany({
    include: {
      category: true,
    },
  })

  //convert decimal value to string to pass through as json
  const products = data.map((product) => ({
    ...product,
    price: product.price.toString(),
  }))

  return {
    props: { products },
  }
}

export default HomePage
