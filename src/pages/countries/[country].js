import Navbar from "components/Navbar"
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
                <section className="detailed-info-box">
                    <section className="main-info-box">
                        <div className="main-info">
                            <div className="info-title">
                                Population
                            </div>
                            <div className="info-description">
                                {data[0].population}
                            </div>
                        </div>
                        <div className="main-info">
                            <div className="info-title">
                                Area
                            </div>
                            <div className="info-description">
                                {data[0].area}㎢
                            </div>
                        </div>
                        <div className="main-info">
                            <div className="info-title">
                                Capital
                            </div>
                            <div className="info-description">
                                {data[0].capital}
                            </div>
                        </div>
                        <div className="main-info">
                            <div className="info-title">
                                Timezones
                            </div>
                            <div className="info-description">
                                {data[0].timezones.length}
                            </div>
                        </div>


                    </section>
                    <section>
                        <div className="details-box">
                            <div>Region: <span>{data[0].region}</span></div>
                            <div>Subregion: <span>{data[0].subregion}</span></div>
                            <div>Demonym: <span>{data[0].demonym}</span></div>
                            <div>Gini: <span>{data[0].gini}</span></div>

                            <div>{data[0].callingCodes.length > 1 ? <>Calling codes: <span>{data[0].callingCodes[0] + ", " + data[0].callingCodes[1]}</span></> : <>Calling code: <span>{data[0].callingCodes[0]}</span></>} </div>
                            <>
                                {
                                    data[0].currencies ?
                                    <div>{data[0].currencies.length > 1 ? <>Currencies: <span>{data[0].currencies[0].name + " | " + data[0].currencies[1].name}</span></> : <>Currency: <span>{data[0].currencies[0].name}</span></>} </div> :
                                    <></>
                                }

                            </>

                            <div>Domain: <span>{data[0].topLevelDomain[0]}</span></div>
                        </div>
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
                country: obj.name.toLowerCase()
            }
        }
    })

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps(ctx) {
    const { country } = ctx.params

    const res = await fetch(`https://restcountries.com/v2/name/${country}?fullText=true`)
    const data = await res.json()

    return {
        props: {
            data: data
        }
    }

}