import { getProviders, signIn as SignIntoProvider } from "next-auth/react";
import { useState, useEffect } from "react";
import Header from "../../components/Header";

function SignIn({ providers }: { providers: Object }) {
  const [welcomeText, setWelcomeText] = useState("");

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

  return (
    <>
      <Header />
      <div className="h-screen bg-slate-800 flex flex-col items-center justify-center min-h-screen py-2 -mt-55 px-14 text-center">
        <img className="w-80" src="" alt="" />
        <p className="font-md italic text-white">{welcomeText}</p>

        <div className="mt-40">
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                className="p-3 bg-blue-500 rounded-lg text-white"
                onClick={() =>
                  SignIntoProvider(provider.id, { callbackUrl: "/" })
                }
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
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
