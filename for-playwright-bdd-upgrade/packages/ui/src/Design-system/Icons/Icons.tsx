import {
  BroadcastFilledIcon,
  BroadcastIcon,
} from "../../components/Icons/Broadcast";
import { BurgerIcon } from "../../components/Icons/Burger";
import { ChevronDown } from "../../components/Icons/ChevronDown";
import { ChevronLeft } from "../../components/Icons/ChevronLeft";
import { ChevronRight } from "../../components/Icons/ChevronRight";
import { CloseIcon } from "../../components/Icons/Close";
import EditIcon from "../../components/Icons/Edit";
import { LibraryFilledIcon, LibraryIcon } from "../../components/Icons/Library";
import Loader from "../../components/Icons/Loader";
import LocationIcon from "../../components/Icons/Location";
import { NewsFilledIcon, NewsIcon } from "../../components/Icons/News";
import { NowPlayingIcon } from "../../components/Icons/NowPlaying";
import {
  OnDemandFilledIcon,
  OnDemandIcon,
} from "../../components/Icons/OnDemand";
import { PlayFilledIcon, PlayIcon } from "../../components/Icons/Play";
import { PodcastIcon, PodcastIconFilled } from "../../components/Icons/Podcast";
import { PremiumIcon } from "../../components/Icons/Premium";
import {
  PremiumUserFilledIcon,
  PremiumUserIcon,
} from "../../components/Icons/PremiumUser";
import { ProfileFilledIcon, ProfileIcon } from "../../components/Icons/Profile";
import { SearchFilledIcon, SearchIcon } from "../../components/Icons/Search";
import SettingsIcon from "../../components/Icons/Settings";
import SocialFacebook from "../../components/Icons/SocialFacebook";
import SocialInstragram from "../../components/Icons/SocialInstragram";
import SocialTikTok from "../../components/Icons/SocialTikTok";
import SocialX from "../../components/Icons/SocialX";
import SocialYoutube from "../../components/Icons/SocialYoutube";
import TickIcon from "../../components/Icons/Tick";
import { TrophyFilledIcon, TrophyIcon } from "../../components/Icons/Trophy";

function Icon({
  children,
  title,
}: {
  children: React.ReactElement;
  title: string;
}) {
  return (
    <div className="group relative">
      <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-neutral-dark px-2 py-1 text-neutral opacity-0 transition-all duration-200 label-s-semibold group-hover:-bottom-6 group-hover:opacity-100">
        {title}
      </span>
      {children}
    </div>
  );
}

export default function Icons() {
  return (
    <div className="container mx-auto flex flex-col gap-12">
      <div>
        <h2 className="text-primary heading-m-bold">Media</h2>
        <div className="mt-4 grid grid-cols-2">
          <div className="grid grid-cols-9 place-items-center items-center gap-10">
            <Icon title="Play">
              <PlayIcon className="fill-neutral" />
            </Icon>
            <Icon title="Library">
              <LibraryIcon className="fill-neutral" />
            </Icon>
            <Icon title="News">
              <NewsIcon className="fill-neutral" />
            </Icon>
            <Icon title="Trophy">
              <TrophyIcon className="fill-neutral" />
            </Icon>
          </div>
          <div className="grid grid-cols-9 place-items-center items-center gap-10">
            <Icon title="Play">
              <PlayFilledIcon className="fill-neutral" />
            </Icon>
            <Icon title="Library">
              <LibraryFilledIcon className="fill-neutral" />
            </Icon>
            <Icon title="News">
              <NewsFilledIcon className="fill-neutral" />
            </Icon>
            <Icon title="Trophy">
              <TrophyFilledIcon className="fill-neutral" />
            </Icon>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-primary heading-m-bold">Arrows and navigation</h2>
        <div className="mt-4 grid grid-cols-2">
          <div className="grid grid-cols-9 place-items-center items-center gap-10">
            <Icon title="Chevron Left">
              <ChevronLeft className="fill-neutral" />
            </Icon>
            <Icon title="Chevron Right">
              <ChevronRight className="fill-neutral" />
            </Icon>
            <Icon title="Chevron Down">
              <ChevronDown className="fill-neutral" />
            </Icon>
            <Icon title="Chevron Right">
              <ChevronRight className="fill-neutral" />
            </Icon>
            <Icon title="Close">
              <CloseIcon className="fill-neutral" />
            </Icon>
            <Icon title="Tick">
              <TickIcon className="fill-neutral" />
            </Icon>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-primary heading-m-bold">System</h2>
        <div className="mt-4 grid grid-cols-2">
          <div className="grid grid-cols-9 place-items-center items-center gap-10">
            <Icon title="Edit">
              <EditIcon className="fill-neutral" />
            </Icon>
            <Icon title="Settings">
              <SettingsIcon className="fill-neutral" />
            </Icon>
            <Icon title="Now Playing">
              <NowPlayingIcon className="fill-neutral" />
            </Icon>
            <Icon title="Location">
              <LocationIcon className="fill-neutral" />
            </Icon>
            <Icon title="Burger">
              <BurgerIcon className="fill-neutral" />
            </Icon>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-primary heading-m-bold">Social</h2>
        <div className="mt-4 grid grid-cols-2">
          <div className="grid grid-cols-9 place-items-center items-center gap-10">
            <Icon title="Profile">
              <ProfileIcon className="fill-neutral" />
            </Icon>
            <Icon title="Premium User">
              <PremiumUserIcon className="fill-neutral" />
            </Icon>
            <Icon title="Premium">
              <PremiumIcon />
            </Icon>
            <Icon title="Instagram">
              <SocialInstragram className="fill-neutral" />
            </Icon>
            <Icon title="TikTok">
              <SocialTikTok className="fill-neutral" />
            </Icon>
            <Icon title="Youtube">
              <SocialYoutube className="fill-neutral" />
            </Icon>
            <Icon title="Facebook">
              <SocialFacebook className="fill-neutral" />
            </Icon>
            <Icon title="X">
              <SocialX className="fill-neutral" />
            </Icon>
          </div>
          <div className="grid grid-cols-9 place-items-center items-center gap-10">
            <Icon title="Profile">
              <ProfileFilledIcon className="fill-neutral" />
            </Icon>
            <Icon title="Premium User">
              <PremiumUserFilledIcon className="fill-neutral" />
            </Icon>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-primary heading-m-bold">Bottom Nav</h2>
        <div className="mt-4 grid grid-cols-2">
          <div className="grid grid-cols-9 place-items-center items-center gap-10">
            <Icon title="Podcast">
              <PodcastIcon className="fill-neutral" />
            </Icon>
            <Icon title="Search">
              <SearchIcon className="fill-neutral" />
            </Icon>
            <Icon title="On-Air">
              <BroadcastIcon className="fill-neutral" />
            </Icon>
            <Icon title="On-Demand">
              <OnDemandIcon className="fill-neutral" />
            </Icon>
          </div>
          <div className="grid grid-cols-9 place-items-center items-center gap-10">
            <Icon title="Podcast">
              <PodcastIconFilled className="fill-neutral" />
            </Icon>
            <Icon title="Search">
              <SearchFilledIcon className="fill-neutral" />
            </Icon>
            <Icon title="On-Air">
              <BroadcastFilledIcon className="fill-neutral" />
            </Icon>
            <Icon title="On-Demand">
              <OnDemandFilledIcon className="fill-neutral" />
            </Icon>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-primary heading-m-bold">Spinner</h2>
        <div className="mt-4 grid grid-cols-2">
          <div className="grid grid-cols-9 place-items-center items-center gap-10">
            <Icon title="Spinner">
              <Loader className="fill-secondary-pink" />
            </Icon>
          </div>
        </div>
      </div>
    </div>
  );
}
