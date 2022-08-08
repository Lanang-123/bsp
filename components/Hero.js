import Link from "next/link"
import Image from "next/image"
import {motion} from "framer-motion"


export default function Hero () {
    const fadeUp = {
      hidden:{
        opacity:0
      },
      visible: {
        opacity:1
      }
    }

    return (
      <div>
        <div className="relative h-screen w-full flex items-center justify-start text-left bg-cover bg-center bg-[url('/assets/img/heronew.jpg')]">
          <div className="absolute top-0 right-0 bottom-0 left-0 bg-green-800 opacity-70"></div>

          <main className="px-10 lg:px-24 z-10 flex justify-center items-center w-full relative -mt-10">
            <div className="text-center">
              {/* <Image
                src="/assets/img/logo.png"
                width={250}
                height={220}
                alt="Logo BSP"
              /> */}
              <h2 className="text-7xl tracking-tight leading-12 md:leading-10 font-extrabold sm:text-5xl text-white sm:leading-none md:text-8xl my-5 md:my-12">Bali Surya Pratama</h2>
              <motion.h2
                className="text-3xl tracking-tight leading-10 py-5 font-extrabold sm:text-5xl text-green-600 sm:leading-none md:text-5xl sm:py-5 "
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 1.5 }}
              >
                We Care
                <span className="text-white"> We Share</span>
              </motion.h2>
              <motion.p
                className="mt-3 text-white sm:mt-5 sm:max-w-xl md:mt-2 text-md font-light italic w-full mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </motion.p>
              <div className="mt-5 sm:mt-8 sm:flex justify-center sm:max-w-3xl">
                <div className="rounded-md shadow">
                  <Link href="/#produk">
                    <motion.a
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-green-600 hover:bg-[#F5DF99] focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10 lg:ml-16 md:ml-12"
                      variants={fadeUp}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: 1.5 }}
                    >
                      Produk
                    </motion.a>
                  </Link>
                </div>
              </div>
            </div>
            {/* <div className="w-100 bg-white rounded-md">
                    <h1 className={styles.bgHero}>Halo</h1>
                </div> */}
          </main>
        </div>
      </div>
    );
}