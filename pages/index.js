import Head from "next/head";
import Hero from "../components/Hero.js";
import About from "../components/About.js";
import Benefit from "../components/Benefit.js";
import Kategori from "../components/Kategori.js";
import Customer from "../components/Customer.js";
import Contact from "../components/Contact.js";
import Footer from "../components/Footer.js";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Bali Surya Pratama</title>
        <meta name="Bali Surya Pratama BSP" content="Bali Surya Pratama BSP" />
        <link rel="icon" href="/assets/img/logo.png" />
      </Head>

      <Hero />
      <About />
      <Benefit />
      <Kategori />
      <Customer />
      <Contact /> 
      <script
        defer
        src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"
      ></script>
    </div>
  );
}
