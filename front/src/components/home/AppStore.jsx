import AppleStoreBadge from "../../../public/logos/AppleStoreBadge.png";
import GooglePlayBadge from "../../../public/logos/GoogleStoreBadge.png";
import Gif from "../../../public/logos/bubble-gum-social-media.gif";

function AppStore() {
  return (
    <div className="bg-Primary-blue/200 py-14">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4">
          <div className="space-y-6 max-w-xl mx-auto">
            <h2 className="text-2xl text-bold text-center sm:text-left sm:text-4xl font-[ClashDisplay-SemiBold] bg-clip-text text-transparent bg-gradient-to-r from-Primary-blue/500 to-Primary-Purple/400 ">
              The Spoune est aussi disponible pour Android et IOS
            </h2>
            <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2">
              <a href="#">
                <img
                  src={AppleStoreBadge}
                  alt="applestore"
                  className="max-w-[150px] sm:max-w-[120px] md:max-w-[200px]"
                />
              </a>
              <a href="#">
                <img
                  src={GooglePlayBadge}
                  alt="playstore"
                  className="max-w-[150px] sm:max-w-[120px] md:max-w-[200px]"
                />
              </a>
            </div>
          </div>
          <div>
            <img src={Gif} alt="" className="max-w-[300px] mx-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppStore;
