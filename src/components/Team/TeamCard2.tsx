//clip-path: polygon(0% 0%, 29% 0, 29% 42%, 37% 53%, 92% 53%, 100% 64%, 100% 82%, 92% 93%, 78% 93%, 67% 100%, 47% 100%, 41% 93%, 26% 93%, 20% 100%, 4% 100%, 0 93%);  bottom-left
//clip-path: polygon(0% 0%, 66% 0, 75% 8%, 86% 8%, 100% 16%, 100% 91%, 86% 100%, 85% 22%, 22% 22%, 10% 45%, 0 38%);right
const Card2 = () => {
    return(
        <div className="relative w-[320px] h-[400px] z-0 TeamCard2">
            <div className="relative w-full h-full px-6 py-8">
                <div className="flex flex-row items-center justify-center border-1 border-red-500 w-full h-full rounded-lg">
                    <img src="https://res.cloudinary.com/dhry5xscm/image/upload/v1717873621/nitsmun/samarjit_kk2y5m.webp" alt="Samarjit" className="z-0 w-[235px] h-[240px]" />
                </div>
            </div>
            {/* Top right corner */}
            <div className="absolute top-0 right-0 z-1 text-[#ffffff]" style={{
                minWidth:'300px',
                width:'300px',
                minHeight:'360px',
                height:'360px',
                borderRight:'4px solid #ff0000',
                borderRadius:'20px',
                background: 'linear-gradient(90deg, rgba(52, 52, 52, 1) 0%, #000000 100%)',
                clipPath:"polygon(0% 0%, 66% 0, 75% 8%, 86% 8%, 100% 16%, 100% 91%, 86% 100%, 85% 22%, 10% 22%, 10% 35%, 0 28%)"
            }}>
                <span>
                    <h2 className="text-xl font-bold mb-2 text-center mt-10">Samarjit Roy</h2>
                    <h2
                        style={{
                            transform: 'rotate(-90deg)',
                            display: 'inline-block',
                            WebkitTextStroke: '2px #ff0000',
                            color:'#ff000055'
                        }}
                        className="absolute top-[180px] -right-[130px] text-4xl select-none"
                    >
                        TECNOESIS
                    </h2>
                </span>
            </div>
            {/* Bottom left corner */}
            <div className="BottomLeft flex flex-row absolute bottom-0 left-0 z-1 text-[#ffffff]" style={{
                minWidth:'250px',
                width:'250px',
                minHeight:'250px',
                height:'250px',
                border:'1px solid #505050ff',
                clipPath:"polygon(0% 0%, 35% 0, 35% 42%, 37% 53%, 92% 53%, 100% 64%, 100% 82%, 92% 93%, 78% 93%, 67% 100%, 47% 100%, 41% 93%, 26% 93%, 20% 100%, 4% 100%, 0 93%)",
            }}>
                <div className="flex flex-row p-5 font-nyxerin">
                    <span className="text-[1rem]" style={{ transform: 'rotate(-90deg)', display: 'inline-block' }}>
                        TECHNICAL HEAD
                    </span>
                    <div className="absolute top-[60px] left-[20px]" style={{ transform: 'rotate(-90deg)' }}>
                        <div className="flex flex-row items-center gap-3 socialBar">
                            <a href="#" aria-label="Instagram" className="text-white hover:opacity-80">
                                {/* Instagram */}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm0 2h10c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3zm5 3.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9zm0 2a2.5 2.5 0 11.001 5.001A2.5 2.5 0 0112 9.5zM17.8 6.2a.9.9 0 11-1.8 0 .9.9 0 011.8 0z"/></svg>
                            </a>
                            <a href="#" aria-label="Facebook" className="text-white hover:opacity-80">
                                {/* Facebook */}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M22 12a10 10 0 10-11.5 9.9v-7H8.9v-2.9h1.6V9.4c0-1.6 1-2.5 2.4-2.5.7 0 1.4.1 1.4.1v1.5h-.8c-.8 0-1 0-1 1v1.2h1.7l-.3 2.9h-1.4v7A10 10 0 0022 12z"/></svg>
                            </a>
                            <a href="#" aria-label="LinkedIn" className="text-white hover:opacity-80">
                                {/* LinkedIn */}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4V24h-4zM8.5 8h3.8v2.2h.1c.5-.9 1.6-2.2 3.4-2.2 3.6 0 4.3 2.4 4.3 5.5V24h-4v-7.2c0-1.7 0-3.9-2.4-3.9-2.4 0-2.8 1.9-2.8 3.8V24h-4z"/></svg>
                            </a>
                        </div>
                    </div>
                </div>
                <img src="/Team/team4.svg" className="absolute right-5 bottom-5 w-20 h-20"/>
            </div>
            {/* Content container */}
        </div>
    );
}

export default Card2;