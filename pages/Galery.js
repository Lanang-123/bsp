import React from "react";
import Image from "next/image";

const Galery = () => {
  const dataFoto = [
    {
      id:1,
      foto:"./assets/galery/psa/psa1.jpg"
    },
    {
      id:2,
      foto:"./assets/galery/psa/psa2.jpg"
    },
    {
      id:3,
      foto:"./assets/galery/psa/ps4.jpg"
    },
    {
      id:5,
      foto:"./assets/galery/psa/psa5.jpg"
    },
    {
      id:6,
      foto:"./assets/galery/psa/psa6.jpeg"
    },
    {
      id:7,
      foto:"./assets/galery/psa/psa7.jpeg"
    },
    {
      id:8,
      foto:"./assets/galery/psa/psa8.jpeg"
    },
    {
      id:9,
      foto:"./assets/galery/ss/ss1.jpg"
    },
    {
      id:10,
      foto:"./assets/galery/ss/ss2.jpg"
    },
    {
      id:11,
      foto:"./assets/galery/ss/ss3.jpg"
    },
    {
      id:12,
      foto:"./assets/galery/ss/ss4.jpg"
    },
    {
      id:13,
      foto:"./assets/galery/ss/ss5.jpg"
    },
    {
      id:14,
      foto:"./assets/galery/ss/ss6.jpg"
    },
    {
      id:15,
      foto:"./assets/galery/ss/ss7.jpeg"
    },
    {
      id:16,
      foto:"./assets/galery/ss/ss8.jpg"
    },
    {
      id:17,
      foto:"./assets/galery/ss/ss9.jpg"
    },
    {
      id:18,
      foto:"./assets/galery/ss/ss10.jpg"
    },
  ]


  return (
    <div>
      <section className="overflow-hidden text-gray-700 ">
        <div className="container px-5 py-2 mx-auto lg:pt-12 lg:px-32">
          <h1 className="text-center text-slate-700 text-5xl mb-10">
            Gallery Bali Surya Pratama
          </h1>
        </div>
      </section>

      <div className="container grid grid-cols-4 gap-5 mx-auto justify-center my-5">
      {dataFoto.map(data => (
          <div className="w-full rounded" key={data.id}>
            <Image 
              src={data.foto}
              alt="image" 
              width={380} 
              height={380} 
            />
          </div>
      ))}
      
      </div>
    </div>
  );
};

export default Galery;
