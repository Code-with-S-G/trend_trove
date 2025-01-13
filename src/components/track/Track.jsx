import image1 from "../../assets/track/image1.jpeg";
import image2 from "../../assets/track/image2.jpg";
import image3 from "../../assets/track/image3.avif";
const Track = () => {
    return (
        <section>
            <div className="mx-auto px-5 py-10 md:py-14">
                {/* main */}
                <div className="flex flex-wrap -m-4 text-center">
                    {/* Track 1 */}
                    <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
                        <div className="border-2 hover:shadow-xl hover:shadow-gray-200 border-amber-200 bg-white px-4 py-6 rounded-lg dark:hover:shadow-none md:min-h-[345px] lg:min-h-fit hover:scale-105 transition-all duration-300 ease-in-out">
                            <img src={image1} alt="Apparel" className="w-24 h-24 mb-3 inline-block rounded-full" />
                            <h2 className="title-font font-medium text-xl text-gray-900">Premium Quality Apparel</h2>
                            <p className="leading-relaxed text-sm text-black">Crafted with care and precision, our clothing ensures you look and feel your best, every day.</p>
                        </div>
                    </div>

                    {/* Track 2 */}
                    <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
                        <div className="border-2 hover:shadow-xl hover:shadow-gray-200 border-amber-200 bg-white px-4 py-6 rounded-lg dark:hover:shadow-none md:min-h-[345px] lg:min-h-fit hover:scale-105 transition-all duration-300 ease-in-out">
                            <img src={image2} alt="Furniture" className="w-24 h-24 mb-3 inline-block rounded-full" />
                            <h2 className="title-font font-medium text-xl text-gray-900">Top-Notch Furniture</h2>
                            <p className="leading-relaxed text-sm text-black">Experience the blend of style and durability with our collection of quality furniture that lasts.</p>
                        </div>
                    </div>

                    {/* Track 3 */}
                    <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
                        <div className="border-2 hover:shadow-xl hover:shadow-gray-200 border-amber-200 bg-white px-4 py-6 rounded-lg dark:hover:shadow-none md:min-h-[345px] lg:min-h-fit hover:scale-105 transition-all duration-300 ease-in-out">
                            <img src={image3} alt="Smartphone" className="w-24 h-24 mb-3 inline-block rounded-full object-cover" />
                            <h2 className="title-font font-medium text-xl text-gray-900">Smartphones You Can Trust</h2>
                            <p className="leading-relaxed text-sm text-black">Featuring the latest technology, our smartphones combine functionality, design, and value for money.</p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default Track;
