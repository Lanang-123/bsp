import '../styles/globals.css'
import Navbar from "../components/Navbar.js"
import Footer from "../components/Footer.js"
import Chatbot from '../components/Chatbot/Chatbot.js'


function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
      <Chatbot />
    </>
    )
}

export default MyApp
