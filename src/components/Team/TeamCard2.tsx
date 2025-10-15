//clip-path: polygon(0% 0%, 29% 0, 29% 42%, 37% 53%, 92% 53%, 100% 64%, 100% 82%, 92% 93%, 78% 93%, 67% 100%, 47% 100%, 41% 93%, 26% 93%, 20% 100%, 4% 100%, 0 93%);  bottom-left
//clip-path: polygon(0% 0%, 66% 0, 75% 8%, 86% 8%, 100% 16%, 100% 91%, 86% 100%, 85% 22%, 22% 22%, 10% 45%, 0 38%);right
const Card2 = () => {
    return(
        <div className="relative w-[320px] h-[400px] z-0">
            {/* Top right corner */}
            <div className="absolute top-0 right-0 z-0 text-[#ffffff]" style={{
                minWidth:'300px',
                width:'300px',
                minHeight:'360px',
                height:'360px',
                borderRight:'4px solid #ff0000',
                background: 'linear-gradient(90deg, rgba(52, 52, 52, 0.95) 0%, #000000 100%)',
                clipPath:"polygon(0% 0%, 66% 0, 75% 8%, 86% 8%, 100% 16%, 100% 91%, 86% 100%, 85% 22%, 10% 22%, 10% 35%, 0 28%)"
            }}></div>
            {/* Bottom left corner */}
            <div className="absolute bottom-0 left-0 z-0 text-[#ffffff]" style={{
                minWidth:'250px',
                width:'250px',
                minHeight:'250px',
                height:'250px',
                border:'1px solid #505050ff',
                background: 'linear-gradient(190deg, rgba(22, 22, 22, 0.95) 0%, #111111 100%)',
                clipPath:"polygon(0% 0%, 35% 0, 35% 42%, 37% 53%, 92% 53%, 100% 64%, 100% 82%, 92% 93%, 78% 93%, 67% 100%, 47% 100%, 41% 93%, 26% 93%, 20% 100%, 4% 100%, 0 93%)",
            }}></div>
            
            {/* Content container */}
            <div className="relative w-full h-full px-6 py-8">
                <div className="border-1 border-red-500 w-full h-full rounded-lg -z-1">

                </div>
            </div>
        </div>
    );
}

export default Card2;