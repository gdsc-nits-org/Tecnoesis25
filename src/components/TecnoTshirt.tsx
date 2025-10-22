'use client';

import { useState } from "react";

// Type definitions
export type SizeType = "XS" | "S" | "M" | "L" | "XL" | "XXL";
type TshirtType = "tecnoesis" | "spark";

interface TshirtState {
  size: SizeType | null;
  quantity: number;
}

interface TshirtSectionProps {
  title: string;
  imageSrc: string;
  description: string;
  size: SizeType | null;
  quantity: number;
  onSizeChange: (size: SizeType) => void;
  onQuantityChange: (quantity: number) => void;
}

// Mobile component for displaying a T-shirt section
function TshirtSectionMobile({
  title,
  imageSrc,
  description,
  size,
  quantity,
  onSizeChange,
  onQuantityChange,
}: TshirtSectionProps) {
  return (
    <div className="mb-10">
      <div>
        <div className="relative flex items-center justify-center bg-black">
          <img
            src={imageSrc}
            alt={`${title} T-shirt`}
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
            {title}
          </h2>
          <p className="text-[1.125rem] font-bankGothik text-justify">
            {description}
          </p>
        </div>

        <div className="flex justify-center items-center">
          <img
            src="/merch/Partition.svg"
            alt="Partition"
            className="block w-[90%] md:hidden"
          />
        </div>

        {/* SIZE SECTION */}
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
                    onClick={() => onSizeChange(s)}
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
              className="flex items-center justify-between px-8 py-3"
              style={{
                backgroundColor: "#8A6BE4",
                clipPath:
                  "polygon(8% 0%, 40% 0%, 43% 12%, 70% 12%, 73% 0%, 92% 0%, 95% 15%, 100% 50%, 95% 85%, 92% 100%, 73% 100%, 70% 88%, 30% 88%, 27% 100%, 8% 100%, 5% 85%, 0% 50%, 5% 15%)",
                width: "200px",
                height: "60px",
              }}
            >
              <button
                type="button"
                onClick={() => onQuantityChange(Math.max(0, quantity - 1))}
                className="text-black text-3xl font-bold select-none w-10 h-10 flex items-center justify-center hover:scale-110 transition-transform"
              >
                −
              </button>
              <input
                type="text"
                name="quantity"
                readOnly
                value={quantity}
                className="text-black text-3xl font-bold text-center bg-transparent w-12 outline-none"
              />
              <button
                type="button"
                onClick={() => onQuantityChange(Math.min(1, quantity + 1))}
                className="text-black text-3xl font-bold select-none w-10 h-10 flex items-center justify-center hover:scale-110 transition-transform"
                disabled={quantity >= 1}
                style={{ opacity: quantity >= 1 ? 0.5 : 1 }}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Desktop component for displaying a T-shirt section with glassmorphism
function TshirtSectionDesktop({
  title,
  imageSrc,
  description,
  size,
  quantity,
  onSizeChange,
  onQuantityChange,
}: TshirtSectionProps) {
  return (
    <div className="grid grid-cols-2 gap-80 items-start mb-10">
      {/* LEFT SIDE - Image and Price */}
      <div className="flex flex-col items-center">
        <div className="relative flex items-center justify-center">
          <img
            src={imageSrc}
            alt={`${title} T-shirt`}
            className="w-[500px] rounded-md shadow-lg"
          />
          <img
            src="/merch/ConnectorPhone.svg"
            alt="Connector"
            className="absolute top-[70%] left-[60%] w-[100px]"
          />
        </div>
        {/* Price Card */}
      </div>

      {/* RIGHT SIDE - Glassmorphism Panel */}
      <div 
        className="rounded-lg p-8 flex flex-col gap-6 max-w-sm"
        style={{
          background: "rgba(138, 107, 228, 0.08)",
          border: "1px solid rgba(138, 107, 228, 0.25)",
          backdropFilter: "blur(40px)",
          WebkitBackdropFilter: "blur(40px)",
        }}
      >
        {/* DETAILS Section */}
        <div>
          <div className="flex justify-center items-center mb-4">
            <img
              src="/merch/Partition.svg"
              alt="Partition"
              className="w-full"
            />
          </div>
          <h3 className="text-2xl font-bold font-bankGothik mb-4 uppercase tracking-wider" style={{ color: "#8A6BE4" }}>
            DETAILS
          </h3>
          <p className="text-sm font-bankGothik text-gray-200 leading-relaxed uppercase">
            {description}
          </p>
        </div>

        {/* SIZE Section */}
        <div>
          <div className="flex justify-center items-center mb-4">
            <img
              src="/merch/Partition.svg"
              alt="Partition"
              className="w-full"
            />
          </div>
          <h3 className="text-2xl font-bold font-bankGothik mb-4 uppercase tracking-wider" style={{ color: "#8A6BE4" }}>
            SIZE
          </h3>
          <div className="flex gap-4 flex-wrap justify-center">
            {(["XS", "S", "M", "L", "XL", "XXL"] as SizeType[]).map((s) => {
              const active = size === s;
              return (
                <button
                  key={s}
                  onClick={() => onSizeChange(s)}
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

        {/* QUANTITY Section */}
        <div>
          <h3 className="text-2xl font-bold font-bankGothik mb-4 uppercase tracking-wider" style={{ color: "#8A6BE4" }}>
            QUANTITY
          </h3>
          <div
            className="flex items-center justify-between px-8 py-3"
            style={{
              backgroundColor: "#8A6BE4",
              clipPath:
                "polygon(8% 0%, 40% 0%, 43% 12%, 70% 12%, 73% 0%, 92% 0%, 95% 15%, 100% 50%, 95% 85%, 92% 100%, 73% 100%, 70% 88%, 30% 88%, 27% 100%, 8% 100%, 5% 85%, 0% 50%, 5% 15%)",
              width: "200px",
              height: "60px",
            }}
          >
            <button
              type="button"
              onClick={() => onQuantityChange(Math.max(0, quantity - 1))}
              className="text-black text-3xl font-bold select-none w-10 h-10 flex items-center justify-center hover:scale-110 transition-transform"
            >
              −
            </button>
            <input
              type="text"
              name="quantity"
              readOnly
              value={quantity}
              className="text-black text-3xl font-bold text-center bg-transparent w-12 outline-none"
            />
            <button
              type="button"
              onClick={() => onQuantityChange(Math.min(1, quantity + 1))}
              className="text-black text-3xl font-bold select-none w-10 h-10 flex items-center justify-center hover:scale-110 transition-transform"
              disabled={quantity >= 1}
              style={{ opacity: quantity >= 1 ? 0.5 : 1 }}
            >
              +
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="flex justify-center items-center">
          <img
            src="/merch/Partition.svg"
            alt="Partition"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}

// Main page component
export default function TecnoTshirt() {
  const [tecnoesis, setTecnoesis] = useState<TshirtState>({ size: null, quantity: 0 });
  const [spark, setSpark] = useState<TshirtState>({ size: null, quantity: 0 });

  const updateQuantity = (type: TshirtType, newQuantity: number) => {
    // Max quantity is 1 for each t-shirt
    const clampedQuantity = Math.max(0, Math.min(1, newQuantity));
    if (type === "tecnoesis") {
      setTecnoesis({ ...tecnoesis, quantity: clampedQuantity });
    } else {
      setSpark({ ...spark, quantity: clampedQuantity });
    }
  };

  const updateSize = (type: TshirtType, size: SizeType) => {
    if (type === "tecnoesis") {
      setTecnoesis({ ...tecnoesis, size });
    } else {
      setSpark({ ...spark, size });
    }
  };

  const handleOrder = () => {
    const items = [];

    if (tecnoesis.quantity > 0) {
      if (!tecnoesis.size) {
        alert("Please select a size for the Tecnoesis t-shirt");
        return;
      }
      items.push({ type: 'Tecnoesis', size: tecnoesis.size, quantity: tecnoesis.quantity });
    }

    if (spark.quantity > 0) {
      if (!spark.size) {
        alert("Please select a size for the Spark t-shirt");
        return;
      }
      items.push({ type: 'Spark', size: spark.size, quantity: spark.quantity });
    }

    if (items.length === 0) {
      alert("Please select at least one t-shirt");
      return;
    }

    console.log("Order:", items);
    // Here you would handle the order submission
    alert(`Order placed successfully!\n${JSON.stringify(items, null, 2)}`);
  };

  return (
    <>
      {/* DESKTOP VIEW */}
      <div className="hidden lg:flex flex-col min-h-screen w-full bg-black text-white pt-24 md:pt-32 lg:pt-40" style={{
        backgroundImage: "url('/merch/merchbg.svg')",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
        {/* TECNOESIS T-SHIRT SECTION */}
        <div className="px-10">
          <div className="text-center mb-12">
            <h1 className="text-5xl lg:text-6xl font-bold tracking-wider font-bankGothik">
              TECNOESIS TSHIRT
            </h1>
          </div>
          <TshirtSectionDesktop
            title="TECNOESIS"
            imageSrc="/merch/tshirt.svg"
            description="Not just a T-shirt. This is a limited-edition Tron-inspired drop built for comfort, style, and pure futuristic vibes. Glow with the energy of Tecno Fest — once it's gone, it's gone."
            size={tecnoesis.size}
            quantity={tecnoesis.quantity}
            onSizeChange={(size: SizeType) => updateSize("tecnoesis", size)}
            onQuantityChange={(qty: number) => updateQuantity("tecnoesis", qty)}
          />
        </div>

        {/* SPARK T-SHIRT SECTION */}
        <div className="px-10">
          <div className="text-center mb-12">
            <h1 className="text-5xl lg:text-6xl font-bold tracking-wider font-bankGothik">
              SPARK TSHIRT
            </h1>
          </div>
          <TshirtSectionDesktop
            title="SPARK"
            imageSrc="/merch/tshirt.svg"
            description="Ignite your style with the Spark edition. Designed for those who dare to stand out, this t-shirt embodies innovation and energy in every thread."
            size={spark.size}
            quantity={spark.quantity}
            onSizeChange={(size: SizeType) => updateSize("spark", size)}
            onQuantityChange={(qty: number) => updateQuantity("spark", qty)}
          />
        </div>

        {/* ORDER NOW BUTTON */}
        <div className="flex justify-center items-center py-10">
          <button
            type="button"
            onClick={handleOrder}
            className="text-black text-2xl font-bankGothik font-bold tracking-wide transition-transform active:scale-95 hover:scale-105"
            style={{
              backgroundColor: "#8A6BE4",
              clipPath:
                "polygon(6% 0%, 38% 0%, 41% 14%, 68% 14%, 71% 0%, 94% 0%, 97% 15%, 100% 50%, 97% 85%, 94% 100%, 71% 100%, 68% 86%, 32% 86%, 29% 100%, 6% 100%, 3% 85%, 0% 50%, 3% 15%)",
              width: "280px",
              height: "70px",
            }}
          >
            ORDER NOW
          </button>
        </div>
      </div>

      {/* MOBILE VIEW */}
      <div className="lg:hidden min-h-screen w-full bg-black text-white pt-24 md:pt-32">
        {/* TECNOESIS T-SHIRT SECTION */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-wider font-bankGothik">
            TECNOESIS TSHIRT
          </h1>
        </div>
        <TshirtSectionMobile
          title="TECNOESIS"
          imageSrc="/merch/tshirt.svg"
          description="Not just a T-shirt. This is a limited-edition Tron-inspired drop built for comfort, style, and pure futuristic vibes. Glow with the energy of Tecno Fest — once it's gone, it's gone."
          size={tecnoesis.size}
          quantity={tecnoesis.quantity}
          onSizeChange={(size: SizeType) => updateSize("tecnoesis", size)}
          onQuantityChange={(qty: number) => updateQuantity("tecnoesis", qty)}
        />

        {/* SPARK T-SHIRT SECTION */}
        <div className="my-16 md:my-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-wider font-bankGothik">
            SPARK TSHIRT
          </h1>
        </div>
        <TshirtSectionMobile
          title="SPARK"
          imageSrc="/merch/tshirt.svg"
          description="Ignite your style with the Spark edition. Designed for those who dare to stand out, this t-shirt embodies innovation and energy in every thread."
          size={spark.size}
          quantity={spark.quantity}
          onSizeChange={(size: SizeType) => updateSize("spark", size)}
          onQuantityChange={(qty: number) => updateQuantity("spark", qty)}
        />

        {/* ORDER NOW BUTTON */}
        <div className="flex justify-center items-center py-10">
          <button
            type="button"
            onClick={handleOrder}
            className="text-black text-2xl font-bankGothik font-bold tracking-wide transition-transform active:scale-95 hover:scale-105"
            style={{
              backgroundColor: "#8A6BE4",
              clipPath:
                "polygon(6% 0%, 38% 0%, 41% 14%, 68% 14%, 71% 0%, 94% 0%, 97% 15%, 100% 50%, 97% 85%, 94% 100%, 71% 100%, 68% 86%, 32% 86%, 29% 100%, 6% 100%, 3% 85%, 0% 50%, 3% 15%)",
              width: "280px",
              height: "70px",
            }}
          >
            ORDER NOW
          </button>
        </div>
      </div>
    </>
  );
}