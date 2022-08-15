import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import {
  FaEdit,
  FaShapes,
  FaLaptop,
  FaSyncAlt,
  FaNetworkWired,
  FaSeedling,
} from "react-icons/fa";
import { AiFillPicture } from "react-icons/ai";
import { motion } from "framer-motion";

const KategoriName = () => {
  const router = useRouter();
  const { name } = router.query;

  const dataProduk = [
    {
      id: 1,
      title: "Filter Tank",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
      img: {
        produk: "../assets/img/produk1.jpg",
        bahanBaku: "",
      },
    },
    {
      id: 2,
      title: "Compact Refining System",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
      img: {
        produk: "../assets/img/produk2.jpg",
        bahanBaku: "",
      },
    },
    {
      id: 3,
      title: "Fume Scrubber",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
      img: {
        produk: "../assets/img/produk3.jpg",
        bahanBaku: "",
      },
    },
    {
      id: 4,
      title: "Chemical Refinery",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
      img: {
        produk: "../assets/img/produk4.jpg",
        bahanBaku: "",
      },
    },
    {
      id: 5,
      title: "BASP Enviro Microorganisme",
      desc: "Kumpulan bermacam microorganisme yang sangat berguna dalam mengurai senyawa organic pada air limbah. Dengan metode dan komposisi yang tepat mampu menurunkan nilai BOD dan COD sesuai nilai baku mutu yang diijinkan",
      img: {
        produk: "../assets/img/produk5.jpg",
        bahanBaku: "",
      },
    },
    {
      id: 6,
      title: "BASP Consmable Media",
      desc: "Merupakan nutrisi yang terbuat dari bahan organik. Sangat dibutuhkan oleh microorganisme untuk tumbuh dan beradaptasi dilingkungan yang baru",
      img: {
        produk: "../assets/img/produk6.jpg",
        bahanBaku: "",
      },
    },
  ];

  const fadeUp = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
  };

  const addData = (...data) => data;
  let result = [];
  if (name == "Fabrikasi Mesin") {
    const data1 = dataProduk.find((data) => data.id == "1");
    const data2 = dataProduk.find((data) => data.id == "4");

    result = addData(data1, data2);
  }else if(name == "Pengolahan Udara") {
    const dataUdara = dataProduk.find((data)=>data.id == "3");
    result = addData(dataUdara);
  }

  console.log(result)

  return (
    <section className="text-gray-600 body-font">
      <h1 className="text-center text-6xl font-semibold my-5 text-green-900 md:text-7xl">
        {name}
      </h1>

      {/* //Introduce */}
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20 bg-green-50">
        <div className="grid grid-cols-2 gap-5 row-gap-5 sm:grid-cols-3 lg:grid-cols-4">
          <div className="text-center">
            <div className="flex items-center justify-center w-10 h-10 mx-auto mb-4 rounded-full bg-green-600 sm:w-12 sm:h-12 hover:animate-bounce">
              <FaEdit className=" text-white sm:w-10 sm:h-10" />
            </div>
            <h6 className="mb-2 text-sm font-bold leading-5 tracking-wider uppercase">
              Assesment
            </h6>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center w-10 h-10 mx-auto mb-4 rounded-full bg-green-600 sm:w-12 sm:h-12 hover:animate-bounce">
              <AiFillPicture className=" text-white sm:w-10 sm:h-10" />
            </div>
            <h6 className="mb-2 text-sm font-bold leading-5 tracking-wider uppercase">
              Design
            </h6>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center w-10 h-10 mx-auto mb-4 rounded-full bg-green-600 sm:w-12 sm:h-12 hover:animate-bounce">
              <FaShapes className=" text-white sm:w-10 sm:h-10" />
            </div>
            <h6 className="mb-2 text-sm font-bold leading-5 tracking-wider uppercase">
              Fabrikasi
            </h6>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center w-10 h-10 mx-auto mb-4 rounded-full bg-green-600 sm:w-12 sm:h-12 hover:animate-bounce">
              <FaLaptop className=" text-white sm:w-10 sm:h-10" />
            </div>
            <h6 className="mb-2 text-sm font-bold leading-5 tracking-wider uppercase">
              Monitoring
            </h6>
          </div>
        </div>

        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="grid gap-12 row-gap-8 lg:grid-cols-2">
            <div className="flex flex-col justify-center">
              <div className="max-w-xl mb-6">
                <motion.h2
                  className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none"
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 1.5 }}
                >
                  Special Purposes
                  <br className="hidden md:block" />
                  <span
                    className="inline-block text-green-600"
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 1.5 }}
                  >
                    Equipment
                  </span>
                </motion.h2>
              </div>
              <div className="grid gap-8 row-gap-8 sm:grid-cols-2 group">
                <div>
                  <div className="flex items-center justify-center w-10 h-10 mb-4 rounded-full bg-green-600 p-3">
                    <FaSyncAlt className="w-10 h-10 text-white" />
                  </div>
                  <h6 className="mb-2 font-semibold leading-5">
                    Pengolahan Limbah Domestik
                  </h6>
                  <p className="text-sm text-gray-900">
                    yang berpotensi mencemari dan menurunkan kualitas air
                    dilingkungan
                  </p>
                </div>
                <div>
                  <div className="flex items-center justify-center w-10 h-10 mb-4 rounded-full bg-green-600 p-3">
                    <FaNetworkWired className="w-10 h-10 text-white" />
                  </div>
                  <h6 className="mb-2 font-semibold leading-5">
                    Design System
                  </h6>
                  <p className="text-sm text-gray-900">
                    dengan merekayasa beberapa teknologi yang tepat dalam
                    mengkonversi limbah domestik
                  </p>
                </div>
                <div>
                  <div className="flex items-center justify-center w-10 h-10 mb-4 rounded-full bg-green-600 p-3">
                    <FaSeedling className="w-10 h-10 text-white" />
                  </div>
                  <h6 className="mb-2 font-semibold leading-5">Output</h6>
                  <p className="text-sm text-gray-900">
                    yang dihasilkan sesuai dengan baku mutu lingkungan yang
                    berlaku
                  </p>
                </div>
              </div>
            </div>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 1.5 }}
            >
              {name == "Fabrikasi Mesin" && (
                <Image
                  className="object-cover w-full h-56 rounded shadow-lg sm:h-96"
                  src="../assets/kategori/mesin.jpg"
                  alt="Fabrikasi Mesin"
                  width={600}
                  height={500}
                />
              )}
              {name == "Pengolahan Udara" && (
                <Image
                  className="object-cover w-full h-56 rounded shadow-lg sm:h-96"
                  src="../assets/kategori/udara.jpg"
                  alt="Fabrikasi Mesin"
                  width={600}
                  height={500}
                />
              )}
            </motion.div>
          </div>
        </div>

        <div className="py-16">
          <div className="container m-auto  text-gray-600 md:px-12 xl:px-6">
            <h1 className="text-5xl text-center text-green-800 font-semibold my-12">
              Produk {name}
            </h1>
            <div className="grid gap-12 lg:grid-cols-2">
              {result.map((data) => (
                <div
                  className="p-1 rounded-xl group sm:flex space-x-10 bg-white bg-opacity-50 shadow-xl shadow-green-200 hover:rounded-2xl"
                  key={data.id}
                >
                  <Image
                    src={data.img.produk}
                    alt={data.title}
                    loading="lazy"
                    width={400}
                    height={250}
                    className="h-56 sm:h-full w-full sm:w-5/12 object-cover object-top md:h-26 rounded-lg transition duration-500 group-hover:rounded-xl"
                  />
                  <div className="sm:w-7/12 pl-0 p-5">
                    <div className="space-y-2">
                      <div className="space-y-4">
                        <h4 className="text-2xl font-semibold text-green-700">
                          {data.title}
                        </h4>
                        <p className="text-gray-600 text-sm leading-6 indent-5">
                          {data.desc}
                        </p>
                      </div>
                      <Link href="https://wa.me/628978946123">
                        <a
                          type="button"
                          className="px-2 flex justify-center items-center  bg-green-500 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full"
                          target="_blank"
                        >
                          <h5 className="-mt-4">
                            <i className="fa fa-whatsapp whatsapp-icon text-2xl mr-1"></i>
                            Whatsapp
                          </h5>
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KategoriName;
