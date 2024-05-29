import { MapPin, Phone } from "lucide-react";
import Logo from "/logos/Logo.svg";
import Facebook from "/logos/facebook-logo.png";
import Github from "/logos/github-logo.png";
import Instagram from "/logos/instagram-logo.png";
import Linkedin from "/logos/linkedin-logo.png";
import Portfolio from "/logos/portfolio-logo.png";

function Footer() {
  return (
    <div className="bg-Primary-blue/200">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid md:grid-cols-3 py-5">
          <div className="py-8 px-4">
            <img src={Logo} alt="" className="max-w-[150px]" />
            <p>
              Réservez en un clic votre table dans le meilleur restaurant près
              de chez vous. Découvrez TheSpoune dès aujourd'hui
            </p>
            <br />
            <div className="flex items-center gap-3">
              <MapPin size={24} />
              <p className="text-sm w-2/5">
                41 boulevard Jeanne d'arc, 13005, MARSEILLE
              </p>
            </div>
            <div className="text-sm flex items-center gap-3 mt-3">
              <Phone />
              <p>0601020304</p>
            </div>
            {/* Socials */}
            <div className="flex items-center gap-3 mt-6">
              <a href="#">
                <img src={Instagram} alt="instagram" className="max-w-[30px]" />
              </a>
              <a href="#">
                <img src={Facebook} alt="facebook" className="max-w-[30px]" />
              </a>
              <a href="#">
                <img src={Linkedin} alt="linkedin" className="max-w-[30px]" />
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 col-span-2 md:pl-10">
            <div>
              <div className="py-8 px-4">
                <h1 className="text-xl sm:text-3xl font-[ClashDisplay-Semibold] text-justify sm:text-left  bg-clip-text text-transparent bg-gradient-to-r from-Primary-Purple/300 to-Primary-blue/600 mb-3">
                  Toufik Spinec
                </h1>
                <ul className="flex flex-col gap-3">
                  <li className="flex items-center">
                    <a href="#">
                      <img
                        src={Portfolio}
                        alt=""
                        className="max-w-[28px] pr-2"
                      />
                    </a>
                    Mon Portfolio
                  </li>
                  <li className="flex items-center">
                    <a href="#">
                      <img src={Github} alt="" className="max-w-[28px] pr-2" />
                    </a>
                    Mon Github
                  </li>
                  <li className="flex items-center">
                    <a href="#">
                      <img
                        src={Linkedin}
                        alt=""
                        className="max-w-[28px] pr-2"
                      />
                    </a>
                    Mon Linkedin
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <div className="py-8 px-4">
                <h1 className="text-xl sm:text-3xl font-[ClashDisplay-Semibold] text-justify sm:text-left  bg-clip-text text-transparent bg-gradient-to-r from-Primary-Purple/300 to-Primary-blue/600 mb-3">
                  Julie Lambert
                </h1>
                <ul className="flex flex-col gap-3">
                  <li className="flex items-center">
                    <a href="#">
                      <img
                        src={Portfolio}
                        alt=""
                        className="max-w-[28px] pr-2"
                      />
                    </a>
                    Mon Portfolio
                  </li>
                  <li className="flex items-center">
                    <a href="#">
                      <img src={Github} alt="" className="max-w-[28px] pr-2" />
                    </a>
                    Mon Github
                  </li>
                  <li className="flex items-center">
                    <a href="#">
                      <img
                        src={Linkedin}
                        alt=""
                        className="max-w-[28px] pr-2"
                      />
                    </a>
                    Mon Linkedin
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <div className="py-8 px-4">
                <h1 className="text-xl sm:text-3xl font-[ClashDisplay-Semibold] text-justify sm:text-left  bg-clip-text text-transparent bg-gradient-to-r from-Primary-Purple/300 to-Primary-blue/600 mb-3">
                  Amine Necib
                </h1>
                <ul className="flex flex-col gap-3">
                  <li className="flex items-center">
                    <a href="#">
                      <img
                        src={Portfolio}
                        alt=""
                        className="max-w-[28px] pr-2"
                      />
                    </a>
                    Mon Portfolio
                  </li>
                  <li className="flex items-center">
                    <a href="#">
                      <img src={Github} alt="" className="max-w-[28px] pr-2" />
                    </a>
                    Mon Github
                  </li>
                  <li className="flex items-center">
                    <a href="#">
                      <img
                        src={Linkedin}
                        alt=""
                        className="max-w-[28px] pr-2"
                      />
                    </a>
                    Mon Linkedin
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
