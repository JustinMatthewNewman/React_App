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
      <div className="p-10">

<ul>
<li><strong>Disclaimer:</strong> CS Code is not responsible for any user-generated content and accounts. The content submitted expresses the opinions of the users and not that of the platform. The content is not intended to malign any religion, ethnic group, club, organization, company, or individual.</li><br/><br/>
<li><strong>Privacy:</strong> We collect certain data and information from users in order to provide the service. This includes but is not limited to IP addresses, usage data, and personal information provided during account creation. All user data is encrypted and protected in accordance with Google's policies.</li><br/><br/>
<li><strong>Acceptable Use:</strong> Users agree not to post or upload any content that is illegal, harmful, harassing, or in any way objectionable. Any user who engages in such behavior may be banned from using the platform.</li><br/><br/>
<li><strong>Intellectual Property:</strong> The content posted by users remains their intellectual property. However, by submitting content to CS Code, users grant the platform a worldwide, non-exclusive, royalty-free, transferable, and sub-licensable license to use, reproduce, distribute, prepare derivative works of, display, and perform the content.</li><br/><br/>
<li><strong>Changes to Terms and Conditions:</strong> CS Code reserves the right to modify these terms and conditions at any time without prior notice. Users are responsible for reviewing these terms and conditions regularly to ensure they are aware of any changes.</li><br/><br/>
</ul>
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
