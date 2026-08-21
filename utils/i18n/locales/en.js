export const en = {
  metadata: {
    title: 'Portfolio of Israel Rojas - Software Developer',
    description:
      'This is the portfolio of Israel Rojas. I am a full stack developer and a self taught developer. I love to learn new things and I am always open to collaborating with others. I am a quick learner and I am always looking for new challenges.',
  },
  language: {
    label: 'Language',
    select: 'Select language',
  },
  nav: {
    about: 'ABOUT',
    experience: 'EXPERIENCE',
    skills: 'SKILLS',
    education: 'EDUCATION',
    gallery: 'GALLERY',
    projects: 'PROJECTS',
  },
  hero: {
    greeting: 'Hello,',
    beforeName: 'This is ',
    afterName: ", I'm a Professional ",
    afterDesignation: '.',
    contactMe: 'Contact me',
    getResume: 'Get Resume',
    codeCard: {
      hardWorker: 'hardWorker',
      quickLearner: 'quickLearner',
      problemSolver: 'problemSolver',
      hireable: 'hireable',
    },
  },
  about: {
    badge: 'ABOUT ME',
    whoAmI: 'Who am I?',
  },
  experience: {
    title: 'Experiences',
  },
  skills: {
    title: 'Skills',
  },
  education: {
    title: 'Educations',
  },
  gallery: {
    title: 'Gallery',
    close: 'Close',
    previous: 'Previous',
    next: 'Next',
  },
  contact: {
    badge: 'CONTACT',
    title: 'Contact with me',
    intro:
      "If you have any questions or concerns, please don't hesitate to contact me. I am open to any work opportunities that align with my skills and interests.",
    name: 'Your Name: ',
    email: 'Your Email: ',
    message: 'Your Message: ',
    send: 'Send Message',
    sending: 'Sending Message...',
    invalidEmail: 'Please provide a valid email!',
    requiredFields: 'All fields are required!',
    resumeHint:
      "PS: after my CV? It lives behind this form. Send me a message and it unlocks — think of it as a 401 with the friendliest fix in the world.",
    resumeUnlocked: 'Thanks for writing. Your copy is ready:',
    downloadResume: 'Download CV',
    restoreNote: 'Enjoy the read. Bringing the form back, in case you want to add something:',
    console: {
      sendLabel: 'message.send()',
      sendResult: '200 OK',
      restoreLabel: 'form.restore()',
      unlockLabel: 'resume.unlock()',
      unlockResult: 'ACCESS GRANTED',
    },

    success: 'Message sent successfully!',
    error: 'Something went wrong, please try again.',
  },
  blog: {
    title: 'Blogs',
    allBlogs: 'All Blog',
    viewMore: 'View More',
  },
  footer: {
    rights: 'All rights reserved by',
  },
  notFound: {
    title: 'Page Not Found',
    description: 'Sorry, the page you are looking for does not exist.',
    goHome: 'Go to Home',
  },
  personal: {
    designation: 'Software Developer',
    address: 'Táchira, Venezuela',
    description:
      'I am a professional and enthusiastic programmer in my daily life. I am a quick learner with a self-learning attitude. I love to learn and explore new technologies and am passionate about problem-solving. I love almost all the stacks of web application development and love to make the web more open to the world. My core skill is based on JavaScript and I love to do most of the things using JavaScript. I am available for any kind of job opportunity that suits my skills and interests.',
  },
  experiences: {
    1: { title: 'Freelance', duration: '(Jun 2025 - Present)' },
    2: { title: 'Full Stack Developer', duration: '(Jan 2023 - Jun 2025)' },
    3: { title: 'Web/Mobile Developer', duration: '(Oct 2022 - Nov 2023)' },
    4: { title: 'Web Developer', duration: '(Oct 2021 - Oct 2022)' },
  },
  educations: {
    1: {
      title: 'Professional Frontend Developer',
      duration: 'Jan 2021 - May 2021',
      institution: 'Platzi',
    },
    2: {
      title: 'Frontend/Backend Development general knowledge',
      duration: '2021 - present',
      institution:
        "University? come on!, Youtube/Stack Overflow that's how the better ones learn 😎",
    },
  },
  projects: {
    title: 'PROJECTS',
    labels: {
      name: 'name:',
      tools: 'tools:',
      role: 'myRole:',
      description: 'Description:',
    },
    items: {
      1: {
        name: 'Web3/Web2 Marketplace',
        role: 'Frontend Developer',
        description:
          'Me and my team built a Web3/Web2 marketplace for buying and selling digital assets. I have developed frontend using NextJs, Typescript and Zustand. For the API we used NestJS, Typescript, PostgreSQL, Jest and Prisma. Used our own authentication system (VGN Auth) for the authentication system. The app fetches data from Google Sheets, this data is used in the main game of the app.',
      },
      2: {
        name: 'Telegram Web App Mini Game',
        role: 'Frontend Developer',
        description:
          'I have developed the frontend for a Telegram Web App mini game. The UI uses NextJS, TypeScript, Tailwind CSS, Zustand and Shadcn UI, with support for multiple languages and currencies. Because it runs inside Telegram’s in-app WebView, we optimized for low battery usage and smooth performance—smaller bundles, fewer re-renders, and lightweight animations. We also worked within WebView constraints (limited storage, no background tasks, variable network conditions) and integrated the Telegram WebApp API for context and initialization.',
      },
      3: {
        name: 'Gamified Web page',
        role: 'Frontend Developer',
        description:
          'I have developed the frontend web page for a gamified website. I created the UI using NextJS, Typescript, TailwindCSS, Shadcn UI and Framer for animations. The app supports multiple languages and currencies, it has a gamified system where the user can see the progress of the tournament and redeem code for rewards.',
      },
    },
  },
  galleryPacks: {
    'gaming-web': {
      title: 'Gaming Web',
      images: {
        gameplay: 'Gameplay screen',
        home: 'Home screen',
        news: 'News section',
        spines: 'Spines / UI',
        tournaments: 'Tournaments view',
      },
    },
    telegram: {
      title: 'Telegram App',
      images: {
        gaming: 'Gaming chat',
        missions: 'Missions screen',
        pve: 'PVE section',
        referals: 'Referrals view',
        settings: 'Settings',
        store: 'In-app store',
        taptap: 'TapTap integration',
      },
    },
  },
};
