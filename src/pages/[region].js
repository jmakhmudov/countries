import Navbar from "components/Navbar"
import { useRouter } from "next/router"

export default function Region({ data }) {
    const router = useRouter()

    const elements = data.map(el => {
        return (
            <div className="country-card" onClick={() => {router.push(`countries/${el.name.toLowerCase()}`)}}>
                <section>
                    <div>{el.name}</div>
                    <img src={el.flag} width="20px"/>
                </section>
                <hr/>
            </div>
        )
    })

    return (
        <>
            <Navbar />
            <div className="grid-countries">
                {elements.map(el => {
                    return el
                })}
            </div>
        </>
    )
}

export async function getStaticPaths() {
    const reg = ['asia', 'europe', 'oceania', 'americas', 'africa']

    const paths = reg.map(obj => {
        return {
            params: {
                region: obj
            }
        }
    })

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps(context) {
    const { region } = context.params

    const res = await fetch(`https://restcountries.com/v2/region/${region}`)
    const data = await res.json()

    return {
        props: {
           data
        }
    }
}

