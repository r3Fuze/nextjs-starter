import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import Product from "@/components/Product"
import prisma from "@/lib/prisma"

export default function Category({ products }) {
  const router = useRouter()
  const category = router.query.category

  return (
    <div>
      <Head>
        <title>PlanetScale Next.js Quickstart</title>
        <meta name="description" content="PlanetScale Quickstart for Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-10 mx-auto max-w-4xl">
        <h1 className="text-6xl font-bold mb-4 text-center capitalize">
          {category}
        </h1>
        <Link href={`/`}>
          <a>&larr; Go back</a>
        </Link>
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

export async function getStaticProps(context) {
  const data = await prisma.product.findMany({
    where: {
      category: {
        name: context.params.category,
      },
    },
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

export async function getStaticPaths() {
  const data = await prisma.category.findMany()
  const paths = data.map((category) => {
    return {
      params: {
        category: category.name.toLowerCase(),
      },
    }
  })

  return {
    paths,
    fallback: false,
  }
}
