import Navbar from "components/Navbar"
import MiniSearch from 'minisearch'
import Head from 'next/head'
import { useState } from 'react'
import Link from 'next/link'

export default function Home({ data }) {
  const [result, setResult] = useState([])

  let miniSearch = new MiniSearch({
    fields: ['name'], // fields to index for full-text search
    searchOptions: {
      boost: { name: 2 }
    }
  })

  miniSearch.addAll(data)

  function search(e) {
    const input = e.target.value

    setResult(miniSearch.search(input, { prefix: true }))
  }



  return (
    <>
      <Head>
        <title>Countries</title>
        <meta name="description" content="Explore the diversity of the world" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main>
        <div>
          <Navbar />
          <section className='hero-box'>
            <div className='flex-box'>
              <div className="hero-text">
                Explore the diversity of the world
              </div>
              <div className="search-box">
                <input className='search-country' type="text" placeholder='Country name' onChange={(e) => search(e)} />
                <div className="found">
                  {result.map(res => <Link href={`countries/${res.id.toLowerCase()}`} key={res.id}>{res.id}</Link>)}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}

export async function getStaticProps() {
  const res = await fetch("https://restcountries.com/v2/all")
  const data = await res.json()

  data.forEach(obj => {
    obj.id = obj.name
  })

  return {
    props: {
      data: data
    }
  }
}
