"use client";
import { useState } from "react";
import Navbar from "../components/header/Navbar";
import Link from "next/link";
import Image from "next/image";
import { styles } from "../styles/styles";
import CourseContentList from "../components/cohorts/Contentlist";

type Props ={
  id:string,
  user:any
}

const Page = ({ id, user }: Props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [question, setQueestion] = useState("");
  const [route, setRoute] = useState("login");
  const [activeVideo, setActiveVideo] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeBar, setActiveBar] = useState(0);
  //  const data = contentData?.content;

  const data = [
    {
      videoUrl: "https://www.youtube.com/watch?v=JTmgi0vO5Ug&t=424s",
      title: "langchain",
      videoSection: " Introduction to LangChain",
      description:
        "What is LangChain?\n\nLangChain is an open-source framework built to help developers build powerful applications with large language models (LLMs) like OpenAI’s GPT, Google’s Gemini, Cohere, and Anthropic. It provides modular components that make it easy to connect LLMs with external tools, APIs, documents, memory, and user interfaces — all using Python (or JavaScript).\n\nInstead of writing complex logic from scratch, LangChain helps you chain together logic and data sources, turning a language model into a real-world smart application.\n💡 Why Use LangChain?\n\nLLMs like ChatGPT are powerful, but on their own, they can't:\n\n    Remember past conversations (long-term)\n\n    Access live web or custom data\n\n    Perform calculations or interact with APIs\n\nLangChain fills these gaps by letting LLMs:\n\n    Use tools (like a calculator or search engine)\n\n    Remember context using memory modules\n\n    Access and process files, APIs, or databases\n\n    Chain together logic for multi-step workflows\n\n🔧 What Can You Build with LangChain?\n\n    Chatbots and Virtual Assistants (with memory)\n\n    Document-based Q&A systems (PDF, CSV, etc.)\n\n    Retrieval-Augmented Generation (RAG) pipelines\n\n    AI agents that reason and take actions\n\n    LLM-powered web apps and automation tools\n\n🧱 LangChain Core Components\n\n    LLMs – Connect to models like GPT-4, Gemini, Cohere\n\n    Prompts – Format and manage inputs to the model\n\n    Chains – Link multiple steps into a single workflow\n\n    Memory – Store and reuse chat history or summaries\n\n    Tools – Let the LLM use calculators, APIs, or databases\n\n    Agents – Models that decide which tools to use and when\n\n    Retrievers – Access external knowledge from documents or vector stores\n\n    Vector Stores – Store and search text embeddings (e.g., FAISS, Chroma)\n\n📈 Real-World Use Cases\n\n    AI customer support agents\n\n    PDF summarizers and document search tools\n\n    Voice assistants powered by LLMs\n\n    Personal AI research or coding assistants\n\n    Smart chatbot interfaces for websites and apps",
      links: [
        {
          title: "source code ",
          url: "https://www.youtube.com/watch?v=JTmgi0vO5Ug&t=424s",
          _id: "686ab568811ea8e3688192c4",
        },
      ],
      suggestion: "",
      _id: "686ab568811ea8e3688192c3",
      questions: [],
    },
    {
      videoUrl: "",
      title: "Chain in LangChain",
      videoSection: "Chains",
      description: `Chains allow you to link multiple LLM calls or steps into a pipeline. Great for building workflows.`,
      links: [
        {
          title: "Video Link",
          url: "https://www.youtube.com/watch?v=JTmgi0vO5Ug&t=424s",
        },
      ],
    },
    {
      videoUrl: "",
      title: "Memory & Tools",
      videoSection: "Advanced",
      description: `Use memory to retain conversation context. Use tools like calculators, retrievers, etc.`,
      links: [
        {
          title: "Docs",
          url: "https://docs.langchain.com",
        },
      ],
    },
  ];

  return (
    <>
      {isLoading ? (
        <h1>loading...</h1>
      ) : (
        <>
          <Navbar
            activeItem={activeItem}
            open={open}
            setOpen={setOpen}
            route={route}
            setRoute={setRoute}
          />

          <div className="w-full grid lg:grid-cols-10">
              
            <div className="col-span-7">
              <div className="w-[95%] lg:w-[86%] py-4 m-auto">
                <iframe
                  className="w-full h-[500]"
                  src={data[activeVideo].videoUrl}
                  allowFullScreen
                />

                <div className="w-full flex justify-between"></div>
                <h1 className="pt-2 text-2xl font-[600] ">
                  {data[activeVideo].title}
                </h1>
                <br />
                <div className="w-full p-3 flex items-center justify-between backdrop-blur-md rounded-sm bg-slate-700 shadow-[bg-slate-700] ">
                  {["Overview", "Resource", "Q/A", "Review"].map(
                    (text: any, index: number) => (
                      <h5
                        key={index}
                        className={`text-[20px] font-[400] opacity-100 cursor-pointer  ${
                          activeBar === index ? "text-red-500" : "text-white"
                        }`}
                        onClick={() => setActiveBar(index)}
                      >
                        {text}
                      </h5>
                    )
                  )}
                </div>
                <br />
                {activeBar === 0 && (
                  <div className="text-[17px] text-white">
                    {data[activeVideo].description}
                  </div>
                )}

                {activeBar === 1 && (
                  <div className="text-[17px] text-white">
                    {data[activeVideo].links.map((item: any, index: number) => (
                      <>
                        <div className="text-[17px] flex items-center text-white">
                          {item.title} :
                          <Link href={item.url} download target="blank">
                            <div className="text-[17px] text-white ml-2 hover:text-blue-400">
                              {item.url}
                            </div>
                          </Link>
                        </div>
                      </>
                    ))}
                  </div>
                )}

                {activeBar === 2 && (
                  <>
                    <div className="w-full flex">
                      <div className="w-[40px] h-[40px]">
                        <Image
                          src={
                            "https://media.istockphoto.com/id/1477583639/vector/user-profile-icon-vector-avatar-or-person-icon-profile-picture-portrait-symbol-vector.jpg?s=612x612&w=0&k=20&c=OWGIPPkZIWLPvnQS14ZSyHMoGtVTn1zS8cAgLy1Uh24="
                          }
                          height={40}
                          width={40}
                          alt="user"
                          className=" bg-cover rounded-full"
                        />
                      </div>

                      <textarea
                        name=""
                        value={question}
                        onChange={(e) => setQueestion(e.target.value)}
                        id=""
                        cols={30}
                        maxLength={100}
                        rows={5}
                        placeholder="write your question related to topic"
                        className="outline-none bg-transparent ml-3 border border-[#f4f4e4] lg:w-full p-2 rounded w-[90%] text-[18px] "
                      ></textarea>
                    </div>
                    <div className="w-full flex justify-end">
                      <div
                        className={`${styles.button} !w-[150px] mt-4 rounded-sm`}
                      >
                        Submit
                      </div>
                    </div>
                  </>
                )}

                {activeBar === 3 && (
                  <>
                    <div className="w-full flex">
                      <div className="w-[40px] h-[40px]">
                        <Image
                          src={
                            "https://media.istockphoto.com/id/1477583639/vector/user-profile-icon-vector-avatar-or-person-icon-profile-picture-portrait-symbol-vector.jpg?s=612x612&w=0&k=20&c=OWGIPPkZIWLPvnQS14ZSyHMoGtVTn1zS8cAgLy1Uh24="
                          }
                          height={40}
                          width={40}
                          alt="user"
                          className=" bg-cover rounded-full"
                        />
                      </div>

                      <textarea
                        name=""
                        value={question}
                        onChange={(e) => setQueestion(e.target.value)}
                        id=""
                        cols={30}
                        maxLength={100}
                        rows={5}
                        placeholder="write your question related to topic"
                        className="outline-none bg-transparent ml-3 border border-[#f4f4e4] lg:w-full p-2 rounded w-[90%] text-[18px] "
                      ></textarea>
                    </div>
                    <div className="w-full flex justify-end">
                      <div
                        className={`${styles.button} !w-[150px] mt-4 rounded-sm`}
                      >
                        Submit
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          <div className="hidden lg:block mt-4 bg-[#090909]  mr-7 right-0 lg:col-span-3">
              <CourseContentList
                setActiveVideo={setActiveVideo}
                data={data}
                activeVideo={activeVideo}
              />
            </div>
          </div>
          
        </>
      )}
    </>
  );
};

export default Page;
