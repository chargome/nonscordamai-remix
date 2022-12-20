import { Link } from "@remix-run/react";
import Image from "remix-image";
import Button from "~/components/Button";
import { Frame } from "~/components/Frame";
import { Logo } from "~/components/Logo";

const TITLE =
  "NONSCORDAMAI is a geo-based diary for keeping your thoughts in the place where you had them.";

export default function Index() {
  return (
    <div className="min-h-screen p-5">
      <div className="flex justify-center py-5">
        <Logo />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 md:px-20">
        <Frame className="col-span-2">
          <div className="relative -z-10 h-[70vh] overflow-hidden">
            <Image
              loaderUrl="/api/image"
              src="/images/diary_1.webp"
              alt="Diary"
              className="absolute h-full w-full object-cover"
              responsive={[
                {
                  size: {
                    width: 400,
                    height: 400,
                  },
                  maxWidth: 200,
                },
              ]}
              dprVariants={[1, 3]}
            />
          </div>
        </Frame>
        <Frame className="z-10 mx-10 -mt-20 self-center justify-self-start rounded-sm bg-base-100 md:mt-0 md:-ml-20 md:mr-20">
          <div className="flex flex-col items-center gap-4 p-8 text-center">
            {TITLE}
            <Link to="/login">
              <Button color="secondary">GET STARTED</Button>
            </Link>
          </div>
        </Frame>
      </div>
      <div className="pt-10 text-sm text-right">
        <Link to="/gdpr">Privacy policy</Link>
      </div>
    </div>
  );
}
