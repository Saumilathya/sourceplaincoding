import React from "react";

const HeroSection = () => {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
    <div className="relative">
      {/* Blurred background dots */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-orange-400/30"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              transform: `scale(${Math.random() + 1})`
            }}
          ></div>
        ))}
      </div>

      {/* Blurred gradient */}
      <div className="absolute pointer-events-none w-[500px] h-[500px] rounded-full opacity-20 bg-gradient-to-r from-orange-500 to-amber-500 blur-[100px]" style={{ transform: "translateX(88px) translateY(71px)" }}></div>

      {/* Content */}
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6">
            <span className="inline-flex items-center justify-center rounded-md border text-xs font-medium w-fit whitespace-nowrap px-4 py-1.5 border-gray-700 bg-black/50 backdrop-blur-sm text-white">
              <span className="mr-2 text-sm">Simple Start</span>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
            <span className="inline-block relative">
              No Rush 
              {/* <span className="absolute -bottom-2 left-0 h-1 bg-orange-800 w-full"></span> */}
            </span>
            , {" "}
            <span className="inline-block relative">
              Just Learn and Work
              {/* <span className="absolute -bottom-2 left-0 h-1 bg-amber-500 w-full"></span> */}
            </span>
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-orange-300 via-red-500 to-pink-500 text-transparent bg-clip-text">
             Level Up Your Skills in Web, App, and AI Development
            </span>
          </h2>
          <p className="text-lg text-gray-300 mb-8  max-w-3xl mx-auto">
            Take your time, explore at your own pace, and grow your skills without pressure — but don’t waste your time. Learning is a journey, not a race.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <Feature icon="users" text="Peer learning" color="text-orange-400" />
            <Feature icon="git-pull-request" text="Code reviews" color="text-amber-400" />
            <Feature icon="video" text="Virtual hostel" color="text-orange-500" />
            <Feature icon="message-square" text="Doubt sessions" color="text-yellow-500" />
            <Feature icon="sparkles" text="Bounties" color="text-amber-500" />
          </div>

          <div>
            <a href="/" target="_blank" rel="noopener noreferrer">
              <button className="inline-flex items-center justify-center gap-2 text-white px-8 py-4 text-lg rounded-xl bg-gradient-to-r via-red-500 to-pink-500 bg-clip-text  shadow-lg shadow-orange-500/20 relative overflow-hidden group">
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r  from-orange-300 via-red-500 to-pink-500  "></span>
               
                <span className="relative z-10">Check all Cohorts</span>
              </button>
            </a>
          </div>

          {/* <div className="mt-16 max-w-3xl mx-auto">
            <div className="aspect-video bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 overflow-hidden shadow-xl relative">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-amber-500/10 pointer-events-none"></div>
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/VNb_LawBBWU?si=vVRslxXgcd4DckCN"
                title="ChaiCode Introduction"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div> */}
        </div>
      </div>
    </div>
    </div>
  );
};

const Feature = ({ icon, text, color }: { icon: string; text: string; color: string }) => {
  const icons = {
    users: (
      <svg className={`lucide lucide-users h-5 w-5 ${color}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    ),
    "git-pull-request": (
      <svg className={`lucide lucide-git-pull-request h-5 w-5 ${color}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <circle cx="18" cy="18" r="3"></circle>
        <circle cx="6" cy="6" r="3"></circle>
        <path d="M13 6h3a2 2 0 0 1 2 2v7"></path>
        <line x1="6" x2="6" y1="9" y2="21"></line>
      </svg>
    ),
    video: (
      <svg className={`lucide lucide-video h-5 w-5 ${color}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"></path>
        <rect x="2" y="6" width="14" height="12" rx="2"></rect>
      </svg>
    ),
    "message-square": (
      <svg className={`lucide lucide-message-square h-5 w-5 ${color}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
    ),
    sparkles: (
      <svg className={`lucide lucide-sparkles h-5 w-5 ${color}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path>
        <path d="M20 3v4"></path>
        <path d="M22 5h-4"></path>
        <path d="M4 17v2"></path>
        <path d="M5 18H3"></path>
      </svg>
    )
  };

  return (
    <div className="flex items-center gap-2 bg-gray-900/50 backdrop-blur-sm px-3 py-2 rounded-full border border-gray-800">
      {icons[icon as keyof typeof icons]}
      <span className="text-sm">{text}</span>
    </div>
  );
};

export default HeroSection;
