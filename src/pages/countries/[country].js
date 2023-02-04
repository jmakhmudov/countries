import Navbar from "@/components/Navbar"
import { useRouter } from "next/router"

export default function Country({ data }) {
    const router = useRouter()

    if (router.isFallback) {
        return (
            <>
                <Navbar />
            </>
        )
    }


    return (
        <>
            <Navbar />
            <div className="country-info-box">
                <section className="country-title">
                    <div className="native-name">{data[0].nativeName}</div>
                    <section className="country-name">
                        <h1>{data[0].name}</h1>
                        <img src={data[0].flag} alt="flag" />
                    </section>
                </section>
                

            </div>
        </>
    )
}

export async function getStaticPaths() {
    const res = await fetch("https://restcountries.com/v2/all")
    const data = await res.json()

    const paths = data.map(obj => {
        return {
            params: {
                country: obj.name
            }
        }
    })

    return {
        paths,
        fallback: true
    }
}

export async function getStaticProps(ctx) {
    const { country } = ctx.params

    const res = await fetch(`https://restcountries.com/v2/name/${country}`)
    const data = await res.json()

    return {
        props: {
            data: data
        }
    }

}