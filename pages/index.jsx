import Head from 'next/head';
import Image from 'next/image';
import Link from "next/link";
import { sanityClient, urlFor } from "../lib/sanity";

const recipesQuery = `*[_type == "recipe"]{
  _id,
  name,
  slug, 
  mainImage
}`

export default function Home({ recipes }) {

  return (
    <>
      <Head>
        <title>Neelam's Kitchen</title>
        <meta name="description" content="Best HomeMade Recipes here" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Welcome to Neelam's Kitchen</h1>

      <ul className="recipes-list">
        {recipes?.map((recipe) => (
          <li key={recipe._id} className="recipe-card">
            <Link href={`/recipes/${recipe.slug.current}`}>
              <a>
                <img src={urlFor(recipe.mainImage).url()} alt={recipe.name} />
                <span>{recipe.name}</span>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export async function getStaticProps() {

  const recipes = await sanityClient.fetch(recipesQuery)

  return { props: { recipes } };
}