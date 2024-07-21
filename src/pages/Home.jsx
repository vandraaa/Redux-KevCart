import { useState } from "react"
import Footer from "../layout/Footer"
import Navbar from "../layout/Navbar"
import Product from "../layout/Product"

const HomePage = () => {
    const [isLoaded, setIsLoaded] = useState(false)
    document.title = "KevCart"

    return (
        <>
            <Navbar />
            <Product setIsLoaded={setIsLoaded} />
            <Footer />
        </>
    )
}

export default HomePage