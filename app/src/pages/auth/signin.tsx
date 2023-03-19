import { getProviders, signIn as SignIntoProvider } from "next-auth/react";
import { useState, useEffect } from "react";
import Header from "../../components/Header";

function SignIn({ providers }: { providers: Object }) {
  const [welcomeText, setWelcomeText] = useState("");
  //const [Globe, setGlobe] = useState(null);

  useEffect(() => {
    const welcomeString =
      "The best place for all developers to learn about each other and interact.";
    let index = 0;
    const typeEffect = setInterval(() => {
      if (index === welcomeString.length) {
        clearInterval(typeEffect);
      } else {
        setWelcomeText(welcomeString.slice(0, index + 1));
        index++;
      }
    }, 50);
    return () => clearInterval(typeEffect);
  }, []);

  // useEffect(() => {
  //   import("react-globe.gl").then((module1) => {
  //     setGlobe(module1.default);
  //   });
  // }, []);

  //if (!Globe) return null;

  return (
    <>
      <Header />
      <div className="h-screen bg-slate-800 flex flex-col items-center justify-center min-h-screen py-2 -mt-55 px-14 text-center">
        <div className="mt-16 relative">
          {/* <div className="mt-40 absolute top-0 left-0 right-0 z-50"> */}
            {Object.values(providers).map((provider) => (
              <div key={provider.name}>
                <button
                  style={{ pointerEvents: "auto" }}
                  className="p-3 bg-white rounded-lg text-black"
                  onClick={() =>
                    SignIntoProvider(provider.id, { callbackUrl: "/" })
                  }
                >
                  <div className="flex items-center">
                    <img className="h-10 w-10" src="/google.png"></img> Sign in
                    with {provider.name}
                  </div>
                </button>
                <p className="font-md italic text-white mt-16">{welcomeText}</p>
              </div>
            ))}
          {/* </div> */}
          {/* <Globe
            height="300px"
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
            backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
          /> */}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}

export default SignIn;
