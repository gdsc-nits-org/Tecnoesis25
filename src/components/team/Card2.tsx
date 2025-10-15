//clip-path: polygon(0% 0%, 29% 0, 29% 42%, 37% 53%, 92% 53%, 100% 64%, 100% 82%, 92% 93%, 78% 93%, 67% 100%, 47% 100%, 41% 93%, 26% 93%, 20% 100%, 4% 100%, 0 93%);  bottom-left
//clip-path: polygon(0% 0%, 66% 0, 75% 8%, 86% 8%, 100% 16%, 100% 91%, 86% 100%, 85% 22%, 22% 22%, 10% 45%, 0 38%);right
const Card2 = () => {
    return(
        <div className="relative top-0 left-0 z-0">
            <div className="absolute top-0 left-0 z-0" style={{
                minWidth:'90%',
                width:'90%',
                minHeight:'40%',
                height:'40%',
                background: 'linear-gradient(90deg, rgba(207,205,255,0.95) 0%, rgba(109,24,228,0.9) 100%)',
                clipPath:"polygon(0 0, 76% 0, 97% 21%, 100% 31%, 27% 31%, 26% 76%, 16% 76%, 4% 69%, 0 60%)"
            }}></div>

        </div>
    );
}

export default Card2;