import Image from "next/image";

const HeroBanner = () => {
  return (
    <div className="max-w-[1600px] mx-auto">
      <div className="relative w-full h-[250px] sm:h-[300px] lg:h-[360px] xl:h-[500px]">
        <Image
          src="/hero.jpg"
          alt="hero banner"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default HeroBanner;
