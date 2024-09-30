import type { Meta, StoryObj } from "@storybook/react";

import SocialFacebook from "../Icons/SocialFacebook";
import SocialInstragram from "../Icons/SocialInstragram";
import SocialTikTok from "../Icons/SocialTikTok";
import SocialX from "../Icons/SocialX";
import SocialYoutube from "../Icons/SocialYoutube";
import { Footer } from "./Footer";

const meta = {
  title: "UI Library/Footer",
  component: Footer,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    followUsTitle: "Follow us",
    followUs: [
      {
        title: "Instagram",
        href: "#",
        icon: SocialInstragram,
      },
      {
        title: "TikTok",
        href: "#",
        icon: SocialTikTok,
      },
      {
        title: "Youtube",
        href: "#",
        icon: SocialYoutube,
      },
      {
        title: "Facebook",
        href: "#",
        icon: SocialFacebook,
      },
      {
        title: "X",
        href: "#",
        icon: SocialX,
      },
    ],
    links: [
      {
        title: "Terms & Conditions",
        href: "https://www.bauerlegal.co.uk/website-terms.html",
      },
      {
        title: "Privacy Policy",
        href: "https://www.bauerlegal.co.uk/privacy-policy",
      },
      {
        title: "Speak Up",
        href: "https://www.bauerlegal.co.uk/speak-up/",
      },
      {
        title: "Competition Terms & Conditions",
        href: "http://www.bauerlegal.co.uk/competition-terms.html",
      },
      {
        title: "Cookie Policy",
        href: "https://www.bauerlegal.co.uk/cookie-policy",
      },
      {
        title: "Careers",
        href: "https://www.bauermedia.co.uk/join/careers/",
      },
      {
        title: "Support",
        href: "https://support.hellorayo.co.uk/",
      },
      {
        title: "Advertise with us",
        href: "https://www.bauermedia.co.uk/brands",
      },
    ],
    legal: (
      <>
        Bauer Media Group consists of : Bauer Consumer Media Ltd, Company number
        01176085; Bauer Radio Limited, Company number: 1394141
        <br />
        Registered office: Media House, Peterborough Business Park, Lynch Wood,
        Peterborough PE2 6EA and H Bauer Publishing, Company number: LP003328;
        <br />
        Registered office: The Lantern, 75 Hampstead Road, London NW1 2PL
        <br />
        All registered in England and Wales. VAT no 918 5617 01
        <br />H Bauer Publishing are authorised and regulated for credit broking
        by the FCA (Ref No: 845898)
      </>
    ),
  },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
