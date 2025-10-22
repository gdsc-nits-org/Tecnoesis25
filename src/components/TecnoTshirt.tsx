"use client";

import { useState } from "react";
import { toast } from "sonner";

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
            className="w-[320px] rounded-md shadow-lg md:w-[400px]"
          />
          <img
            src="/merch/ConnectorPhone.svg"
            alt="Connector"
            className="absolute left-[60%] top-[70%] w-[7.5rem] md:w-[80px]"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-center">
          <img
            src="/merch/Partition.svg"
            alt="Partition"
            className="block w-[90%] pt-5 md:hidden"
          />
        </div>

        <div className="mx-auto flex w-full max-w-lg flex-col items-center justify-center p-6 md:p-8 lg:mx-0 lg:max-w-none">
          <h2 className="font-bankGothik text-[1.875rem] font-bold tracking-wider sm:text-2xl">
            {title}
          </h2>
          <p className="text-justify font-bankGothik text-[1.125rem]">
            {description}
          </p>
        </div>

        <div className="flex items-center justify-center">
          <img
            src="/merch/Partition.svg"
            alt="Partition"
            className="block w-[90%] md:hidden"
          />
        </div>

        {/* SIZE SECTION */}
        <div className="flex flex-col items-center py-5">
          <div className="flex flex-col items-center">
            <p className="font-bankGothik text-[1.875rem] font-bold tracking-wider sm:text-2xl">
              SIZE
            </p>
            <div className="flex gap-4">
              {(["XS", "S", "M", "L", "XL", "XXL"] as SizeType[]).map((s) => {
                const active = size === s;
                return (
                  <button
                    key={s}
                    onClick={() => onSizeChange(s)}
                    className="relative flex h-11 w-11 items-center justify-center"
                    style={{
                      clipPath:
                        "polygon(15% 0%, 85% 0%, 100% 15%, 100% 85%, 85% 100%, 15% 100%, 0% 85%, 0% 15%)",
                      background: "white",
                      padding: "3px",
                    }}
                  >
                    <div
                      className="flex h-full w-full items-center justify-center font-bankGothik text-sm"
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

        <div className="flex items-center justify-center">
          <img
            src="/merch/Partition.svg"
            alt="Partition"
            className="block w-[90%] md:hidden"
          />
        </div>

        {/* QUANTITY SECTION */}
        <div className="flex flex-col items-center pt-4">
          <h2 className="font-bankGothik text-[1.875rem] font-bold tracking-wider sm:text-2xl">
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
                className="flex h-10 w-10 select-none items-center justify-center text-3xl font-bold text-black transition-transform hover:scale-110"
              >
                −
              </button>
              <input
                type="text"
                name="quantity"
                readOnly
                value={quantity}
                className="w-12 bg-transparent text-center text-3xl font-bold text-black outline-none"
              />
              <button
                type="button"
                onClick={() => onQuantityChange(Math.min(1, quantity + 1))}
                className="flex h-10 w-10 select-none items-center justify-center text-3xl font-bold text-black transition-transform hover:scale-110"
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
    <div className="mb-10 grid grid-cols-2 items-start gap-80">
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
            className="absolute left-[60%] top-[70%] w-[100px]"
          />
        </div>
        {/* Price Card */}
      </div>

      {/* RIGHT SIDE - Glassmorphism Panel */}
      <div
        className="flex max-w-sm flex-col gap-6 rounded-lg p-8"
        style={{
          background: "rgba(138, 107, 228, 0.08)",
          border: "1px solid rgba(138, 107, 228, 0.25)",
          backdropFilter: "blur(40px)",
          WebkitBackdropFilter: "blur(40px)",
        }}
      >
        {/* DETAILS Section */}
        <div>
          <div className="mb-4 flex items-center justify-center">
            <img
              src="/merch/Partition.svg"
              alt="Partition"
              className="w-full"
            />
          </div>
          <h3
            className="mb-4 font-bankGothik text-2xl font-bold uppercase tracking-wider"
            style={{ color: "#8A6BE4" }}
          >
            DETAILS
          </h3>
          <p className="font-bankGothik text-sm uppercase leading-relaxed text-gray-200">
            {description}
          </p>
        </div>

        {/* SIZE Section */}
        <div>
          <div className="mb-4 flex items-center justify-center">
            <img
              src="/merch/Partition.svg"
              alt="Partition"
              className="w-full"
            />
          </div>
          <h3
            className="mb-4 font-bankGothik text-2xl font-bold uppercase tracking-wider"
            style={{ color: "#8A6BE4" }}
          >
            SIZE
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {(["XS", "S", "M", "L", "XL", "XXL"] as SizeType[]).map((s) => {
              const active = size === s;
              return (
                <button
                  key={s}
                  onClick={() => onSizeChange(s)}
                  className="relative flex h-11 w-11 items-center justify-center"
                  style={{
                    clipPath:
                      "polygon(15% 0%, 85% 0%, 100% 15%, 100% 85%, 85% 100%, 15% 100%, 0% 85%, 0% 15%)",
                    background: "white",
                    padding: "3px",
                  }}
                >
                  <div
                    className="flex h-full w-full items-center justify-center font-bankGothik text-sm"
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
          <h3
            className="mb-4 font-bankGothik text-2xl font-bold uppercase tracking-wider"
            style={{ color: "#8A6BE4" }}
          >
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
              className="flex h-10 w-10 select-none items-center justify-center text-3xl font-bold text-black transition-transform hover:scale-110"
            >
              −
            </button>
            <input
              type="text"
              name="quantity"
              readOnly
              value={quantity}
              className="w-12 bg-transparent text-center text-3xl font-bold text-black outline-none"
            />
            <button
              type="button"
              onClick={() => onQuantityChange(Math.min(1, quantity + 1))}
              className="flex h-10 w-10 select-none items-center justify-center text-3xl font-bold text-black transition-transform hover:scale-110"
              disabled={quantity >= 1}
              style={{ opacity: quantity >= 1 ? 0.5 : 1 }}
            >
              +
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center">
          <img src="/merch/Partition.svg" alt="Partition" className="w-full" />
        </div>
      </div>
    </div>
  );
}

// Main page component
export default function TecnoTshirt() {
  const [tecnoesis, setTecnoesis] = useState<TshirtState>({
    size: null,
    quantity: 0,
  });
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
        toast.error("Please select a size for the Tecnoesis t-shirt");
        return;
      }
      items.push({
        type: "Tecnoesis",
        size: tecnoesis.size,
        quantity: tecnoesis.quantity,
      });
    }

    if (spark.quantity > 0) {
      if (!spark.size) {
        toast.error("Please select a size for the Spark t-shirt");
        return;
      }
      items.push({ type: "Spark", size: spark.size, quantity: spark.quantity });
    }

    if (items.length === 0) {
      toast.error("Please select at least one t-shirt");
      return;
    }

    console.log("Order:", items);
    // Here you would handle the order submission
    toast.success(`Order placed successfully!\n${JSON.stringify(items, null, 2)}`);
  };

  return (
    <>
      {/* DESKTOP VIEW */}
      <div
        className="hidden min-h-screen w-full flex-col bg-black pt-24 text-white md:pt-32 lg:flex lg:pt-40"
        style={{
          backgroundImage: "url('/merch/merchbg.svg')",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* TECNOESIS T-SHIRT SECTION */}
        <div className="px-10">
          <div className="mb-12 text-center">
            <h1 className="font-bankGothik text-5xl font-bold tracking-wider lg:text-6xl">
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
          <div className="mb-12 text-center">
            <h1 className="font-bankGothik text-5xl font-bold tracking-wider lg:text-6xl">
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
        <div className="flex items-center justify-center py-10">
          <button
            type="button"
            onClick={handleOrder}
            className="font-bankGothik text-2xl font-bold tracking-wide text-black transition-transform hover:scale-105 active:scale-95"
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
      <div className="min-h-screen w-full bg-black pt-24 text-white md:pt-32 lg:hidden">
        {/* TECNOESIS T-SHIRT SECTION */}
        <div className="mb-8 text-center md:mb-12">
          <h1 className="font-bankGothik text-4xl font-bold tracking-wider md:text-5xl">
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
        <div className="my-16 text-center md:my-20">
          <h1 className="font-bankGothik text-4xl font-bold tracking-wider md:text-5xl">
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
        <div className="flex items-center justify-center py-10">
          <button
            type="button"
            onClick={handleOrder}
            className="font-bankGothik text-2xl font-bold tracking-wide text-black transition-transform hover:scale-105 active:scale-95"
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
