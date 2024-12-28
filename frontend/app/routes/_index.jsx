import { Link } from "@remix-run/react";
import { Button } from "../components/ui/button";
import MainNav from "../components/MainNav";
import { ThemeToggle } from "~/components/theme-toggle";

export const meta = () => {
  return [
    { title: "Remix Chat App" },
    { name: "description", content: "Welcome to Remix Chat App!" },
  ];
};

export default function Index() {
  return (
    <>
      <MainNav />
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col gap-4 justify-center items-center">
          <h1 className="text-4xl block">Start Chat with Our AI</h1>
          <Button>
            <Link to={"/chat/new-chat"}>Let's Chat</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
