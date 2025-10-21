import { useState } from "react";

export type SizeType = "XS" | "S" | "M" | "L" | "XL" | "XXL";

export default function TecnoTshirt() {
  const [size, setSize] = useState<SizeType | null>(null);
  const [quantity, setQuantity] = useState<number>(0); // quantity counter

  return (
    <div className="min-h-screen w-full bg-black text-white">
      <div>
        <div className="relative flex items-center justify-center bg-black">
          <img
            src="/merch/TecnoTshirt1.svg"
            alt="T-shirt"
            className="w-[320px] md:w-[400px] rounded-md shadow-lg"
          />

          <img
            src="/merch/ConnectorPhone.svg"
            alt="Connector"
            className="absolute top-[70%] left-[60%] w-[7.5rem] md:w-[80px]"
          />
        </div>
      </div>

      <div>
        <div className="flex justify-center items-center">
          <img
            src="/merch/Partition.svg"
            alt="Partition"
            className="block w-[90%] md:hidden pt-5"
          />
        </div>

        <div className="flex flex-col justify-center items-center p-6 md:p-8 w-full max-w-lg mx-auto lg:max-w-none lg:mx-0">
          <h2 className="text-[1.875rem] sm:text-2xl font-bold tracking-wider font-bankGothik">
            DETAILS
          </h2>
          <p className="text-[1.125rem] font-bankGothik text-justify">
            Not just a T-shirt. This is a limited-edition Tron-inspired drop
            built for comfort, style, and pure futuristic vibes. Glow with the
            energy of Tecno Fest — once it’s gone, it’s gone.
          </p>
        </div>

        <div className="flex justify-center items-center">
          <img
            src="/merch/Partition.svg"
            alt="Partition"
            className="block w-[90%] md:hidden"
          />
        </div>

        {/* size SECTION */}
        <div className="flex flex-col items-center py-5">

          <div className="flex flex-col items-center">
            <p className="text-[1.875rem] sm:text-2xl font-bold tracking-wider font-bankGothik">
              SIZE
            </p>

            <div className="flex gap-4">
              {(["XS", "S", "M", "L", "XL", "XXL"] as SizeType[]).map((s) => {
                const active = size === s;
                return (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className="relative w-11 h-11 flex items-center justify-center"
                    style={{
                      clipPath:
                        "polygon(15% 0%, 85% 0%, 100% 15%, 100% 85%, 85% 100%, 15% 100%, 0% 85%, 0% 15%)",
                      background: "white",
                      padding: "3px",
                    }}
                  >
                    <div
                      className="w-full h-full flex items-center justify-center text-sm font-bankGothik"
                      style={{
                        clipPath:
                          "polygon(15% 0%, 85% 0%, 100% 15%, 100% 85%, 85% 100%, 15% 100%, 0% 85%, 0% 15%)",
                        background: active ? "white" : "black",
                        color: active ? "black" : "white",
                        transition: "background 0.2s, color 0.2s",
                      }}
                    >
                      {s}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>


        <div className="flex justify-center items-center">
          <img
            src="/merch/Partition.svg"
            alt="Partition"
            className="block w-[90%] md:hidden"
          />
        </div>

        {/* QUANTITY SECTION */}
        <div className="flex flex-col items-center pt-4">
          <h2 className="text-[1.875rem] sm:text-2xl font-bold tracking-wider font-bankGothik">
            QUANTITY
          </h2>

          <div className="mt-3">
            <div
              className="flex items-center justify-between px-4 py-2"
              style={{
                backgroundColor: "#8A6BE4",
                clipPath:
                  "polygon(0% 50%, 10% 0%, 90% 0%, 100% 50%, 90% 100%, 10% 100%)",
                width: "110px",
              }}
            >
              <button
                type="button"
                onClick={() => setQuantity(0)}
                className="text-black text-xl font-bold select-none"
              >
                −
              </button>

              <input
                type="text"
                name="quantity"
                readOnly
                value={quantity}
                className="text-black text-xl font-bold text-center bg-transparent w-6 outline-none"
              />

              <button
                type="button"
                onClick={() => setQuantity(1)}
                className="text-black text-xl font-bold select-none"
              >
                +
              </button>
            </div>
          </div>
        </div>
        {/* QUANTITY END  */}

        {/* ORDER NOW BUTTON*/}
        <div className="flex justify-center items-center py-10">
          <button
            type="submit"
            className="text-black text-2xl font-bankGothik font-bold tracking-wide px-2 py-3 transition-transform active:scale-95"
            style={{
              backgroundColor: "#8A6BE4",
              clipPath:
                "polygon(0% 50%, 5% 0%, 95% 0%, 100% 50%, 95% 100%, 5% 100%)",
              width: "220px",
            }}
          >
            ORDER NOW
          </button>
        </div>
        {/* ORDER NOW END */}
      </div>
    </div>
  );
}
