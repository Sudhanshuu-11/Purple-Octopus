import { services } from "../data/services.js";

export const routes = {
  "/services": {
    kind: "directory",
    eyebrow: "WHAT WE DO",
    title: "Built for\nmomentum.",
    description: "Choose a service to explore how we can help your brand grow. Our work spans social, paid media, search, video and content.",
    items: [],
  },
  "/work": {
    eyebrow: "SELECTED WORK",
    title: "Work that\nmoves.",
    description: "We connect bold creative ideas to business outcomes people can measure.",
    items: ["NOVA · Brand launch · +184%", "KINDA · Social growth · 3.2×", "ARC / 01 · Digital experience · +71%"],
  },
  "/about": {
    kind: "about",
    eyebrow: "WHO WE ARE",
    title: "Attention into\naction.",
    description: "Purple Octopus is an independent digital marketing studio for ambitious brands. We connect strategy, creative and digital execution to help businesses grow with purpose.",
    items: ["Founded by Sudhanshu and Avinash", "Gorakhpur · Noida · Everywhere", "Strategy · Creative · Growth"],
  },
  "/contact": {
    eyebrow: "HAVE A CHALLENGE?",
    title: "Let's make\nsomething loud.",
    description: "Tell us what you’re building and where you want to take it.",
    items: ["purpleoctopus@outlook.in", "Gorakhpur · Noida · Everywhere"],
  },
  ...Object.fromEntries(services.map((service) => [service.path, { ...service, kind: "service", eyebrow: service.name, items: service.points }])),
};
