// Reusable text styles
const headingStyles = "font-bold text-white font-sans leading-[1] tracking-[0.19em]";
const paragraphStyles = "text-white font-sans font-medium leading-[1.6] md:leading-[36px] tracking-[0.03em] text-justify";

export const AboutSection = () => {
  return (
    <section 
      id="about" 
      className="relative py-16 bg-cover bg-center"
      style={{
        backgroundImage: 'url("/robotron/aboutBackground.svg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="container px-4 mx-auto max-w-5xl">
        {/* Mobile Frame */}
        <div className="md:hidden relative p-6 rounded-2xl bg-gradient-to-br from-red-500/20 to-blue-400/20 backdrop-blur-sm border border-white/10">
          {/* Content */}
          <div className="relative z-10">
            <h2 className={`${headingStyles} text-4xl mb-6`}>
              <span className="block">ABOUT</span>
              <span className="block mt-1">ROBOTRON</span>
            </h2>
            <div className="w-full">
              <p className={`${paragraphStyles} text-sm`}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris quam mi, 
                interdum eu volutpat eget, fermentum vitae odio. Quisque dui sem, auctor 
                nec tempus in, convallis et nunc. Ut at tellus et enim dictum sagittis vel 
                id tellus. Sed id tellus quis libero pretium blandit nec at lorem.
              </p>
            </div>
          </div>
          
          {/* Corner decorations */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-red-400 rounded-tl-lg"></div>
          <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-blue-400 rounded-tr-lg"></div>
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-blue-400 rounded-bl-lg"></div>
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-red-400 rounded-br-lg"></div>
        </div>

        {/* Desktop/Tablet Frame */}
        <div className="hidden md:block relative">
          <img 
            src="/robotron/aboutFrame.svg" 
            alt="About Robotron Frame" 
            className="w-full h-auto"
            loading="lazy"
            width={1296}
            height={859}
          />
          
          {/* Content Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center md:p-12">
            <div className="w-full px-4 md:px-8 lg:px-12 xl:px-16">
              <h2 className={`${headingStyles} text-4xl sm:text-5xl md:text-6xl lg:text-7xl`}>
                <span className="block">ABOUT</span>
                <span className="block mt-1 sm:mt-2">ROBOTRON</span>
              </h2>
              <div className="w-full max-w-full mx-auto mt-4 sm:mt-6 md:mt-8">
                <p className={`${paragraphStyles} text-xs sm:text-sm md:text-[15px] lg:text-base xl:text-lg leading-relaxed md:leading-loose`}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris quam mi, 
                  interdum eu volutpat eget, fermentum vitae odio. Quisque dui sem, auctor 
                  nec tempus in, convallis et nunc. Ut at tellus et enim dictum sagittis vel 
                  id tellus. Sed id tellus quis libero pretium blandit nec at lorem. Mauris 
                  sit amet finibus odio. Nunc non condimentum odio. Vestibulum gravida posuere 
                  orci eu dapibus. Nunc mattis hendrerit aliquet. Pellentesque magna magna, 
                  sagittis vel placerat non, euismod eget lectus. Curabitur aliquet libero 
                  vel massa eleifend.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
