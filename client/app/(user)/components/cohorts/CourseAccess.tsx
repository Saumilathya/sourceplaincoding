// "use client";
// import Link from "next/link";
// import { useEffect, useState } from "react";


// interface itemsProps {
//   title: string;
//   to: string;
//   icon: any;
//   selected: string;
//   setSelected: any;
// }

// const CourseAccess = () => {
//   const [mounted, setMounted] = useState(false);
//   const [selected, setSelected] = useState("Dashborad");
//   const [isCollapsed, setIsCollapsed] = useState<Boolean>(false);

//   const dummyVideos = [
//     {
//       title: "Introduction to React",
//       description:
//         "Learn the basics of React including JSX, components, and state.",
//       videoUrl: "https://example.com/videos/react-intro.mp4",
//       videoThumbnail: {
//         url: "https://example.com/images/react-thumbnail.jpg",
//         alt: "React Thumbnail",
//       },
//       videoSection: "Frontend Development",
//       videoLength: 600,
//       videoPlayer: "YouTube",
//       links: [
//         { label: "React Docs", url: "https://reactjs.org/docs" },
//         {
//           label: "JSX Guide",
//           url: "https://reactjs.org/docs/introducing-jsx.html",
//         },
//       ],
//       suggestion: "Practice creating functional components.",
//       questions: [
//         {
//           user: "dev01",
//           text: "What is the virtual DOM?",
//           timestamp: "2025-06-29T13:00:00Z",
//         },
//       ],
//     },
//     {
//       title: "Async JavaScript",
//       description:
//         "Understand async/await, promises, and callbacks in JavaScript.",
//       videoUrl: "https://example.com/videos/async-js.mp4",
//       videoThumbnail: {
//         url: "https://example.com/images/async-thumbnail.jpg",
//         alt: "Async JS Thumbnail",
//       },
//       videoSection: "JavaScript Core",
//       videoLength: 720,
//       videoPlayer: "Vimeo",
//       links: [
//         {
//           label: "MDN Promises",
//           url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise",
//         },
//       ],
//       suggestion: "Try converting callback code to async/await.",
//       questions: [
//         {
//           user: "js_ninja",
//           text: "Can I use async in loops?",
//           timestamp: "2025-06-29T13:10:00Z",
//         },
//       ],
//     },
//     {
//       title: "Git & GitHub Crash Course",
//       description:
//         "Get started with Git version control and GitHub collaboration.",
//       videoUrl: "https://example.com/videos/git-course.mp4",
//       videoThumbnail: {
//         url: "https://example.com/images/git-thumbnail.jpg",
//         alt: "Git Thumbnail",
//       },
//       videoSection: "DevOps",
//       videoLength: 900,
//       videoPlayer: "YouTube",
//       links: [
//         {
//           label: "Git Handbook",
//           url: "https://guides.github.com/introduction/git-handbook/",
//         },
//       ],
//       suggestion: "Practice `git clone`, `commit`, and `push` on a test repo.",
//       questions: [
//         {
//           user: "learner123",
//           text: "What is the difference between `merge` and `rebase`?",
//           timestamp: "2025-06-29T13:20:00Z",
//         },
//       ],
//     },
//     {
//       title: "Node.js Fundamentals",
//       description:
//         "Learn about Node.js architecture, modules, and creating APIs.",
//       videoUrl: "https://example.com/videos/node-fundamentals.mp4",
//       videoThumbnail: {
//         url: "https://example.com/images/node-thumbnail.jpg",
//         alt: "Node.js Thumbnail",
//       },
//       videoSection: "Backend Development",
//       videoLength: 800,
//       videoPlayer: "YouTube",
//       links: [{ label: "Node.js Docs", url: "https://nodejs.org/en/docs/" }],
//       suggestion: "Try building a simple API with Express.js.",
//       questions: [
//         {
//           user: "backend_dev",
//           text: "How do I handle file uploads in Node?",
//           timestamp: "2025-06-29T13:30:00Z",
//         },
//       ],
//     },
//     {
//       title: "CSS Flexbox Guide",
//       description:
//         "Master the CSS Flexbox layout model with practical examples.",
//       videoUrl: "https://example.com/videos/flexbox-guide.mp4",
//       videoThumbnail: {
//         url: "https://example.com/images/flexbox-thumbnail.jpg",
//         alt: "Flexbox Thumbnail",
//       },
//       videoSection: "UI Design",
//       videoLength: 550,
//       videoPlayer: "Vimeo",
//       links: [
//         {
//           label: "CSS Tricks Flexbox",
//           url: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/",
//         },
//       ],
//       suggestion: "Create a responsive navbar using Flexbox.",
//       questions: [
//         {
//           user: "ui_master",
//           text: "What is the default direction of Flexbox?",
//           timestamp: "2025-06-29T13:45:00Z",
//         },
//       ],
//     },
//   ];

//   return (
//     <div className="flex w-[100vw] h-[90vh]">
//       <div className={`${isCollapsed ? "w-[0%]" : "w-[20%]"} bg-red-500 p-3`}>
//         {dummyVideos.map((item, idx) => (
//           <h1 className="py-1 text-lg">{item.title}</h1>
//         ))}
//       </div>
//       <div
//         className={`${
//           isCollapsed ? "w-[80%]" : "w-[100%]"
//         } overflow-scroll bg-amber-500`}
//       >
//         {dummyVideos.map((item, idx) => (
//           <div className="p-5">
//             <h1 className="text-[3rem] md:text-[4rem] font-bold mt-4 md:leading-[8rem] bg-clip-text  capitalize">
//               {item.title}
//             </h1>
//             <p>{item.description}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CourseAccess;
