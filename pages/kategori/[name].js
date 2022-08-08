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
    const data2 = dataProduk.find((data) => data.id == "3");
    const data3 = dataProduk.find((data) => data.id == "4");

    result = addData(data1, data2, data3);
  }


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
              <Image
                className="object-cover w-full h-56 rounded shadow-lg sm:h-96"
                src="../assets/kategori/mesin.jpg"
                alt="Fabrikasi Mesin"
                width={600}
                height={500}
              />
            </motion.div>
          </div>
        </div>

        <h1 className="text-5xl text-center text-green-800 font-semibold my-7">
          Produk
        </h1>

        <div className="flex flex-wrap -mx-4">
          {result.map((data) => (
            <div className="w-full md:w-1/2 xl:w-1/3 px-4" key={data.id}>
              <div className="bg-white shadow-md rounded-lg overflow-hidden mb-10">
                <Image
                  src={data.img.produk}
                  alt={data.title}
                  className="w-full"
                  width={600}
                  height={400}
                />
                <div className="p-8 sm:p-9 md:p-7 xl:p-9 text-center">
                  <h3
                    className="
                            font-semibold
                            text-dark text-xl
                            sm:text-[22px]
                            md:text-xl
                            lg:text-[22px]
                            xl:text-xl
                            2xl:text-[22px]
                            mb-4
                            block
                            hover:text-green-600
                            "
                  >
                    {data.title}
                  </h3>

                  <p className="text-base text-body-color leading-relaxed mb-7 line-clamp-4">
                    {data.desc}
                  </p>
                  <Link href={`/kategori/produkkategori/${data.title}`}>
                    <a
                      className="
                        inline-block
                        py-2
                        px-7
                        border border-green-500
                        rounded-full
                        text-base text-green-600
                        font-medium
                        hover:border-primary hover:bg-green-100 hover:text-green-700 
                        transition
                        "
                    >
                      View Details
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KategoriName;
