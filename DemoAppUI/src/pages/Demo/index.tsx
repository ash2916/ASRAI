import React, { useRef } from "react";
import AppInfo from "../../components/AppInfo/AppInfo";
import Hero from "../../components/Hero/Hero";

function Page() {
  const resultRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <Hero resultRef={resultRef} />
      <AppInfo ref={resultRef} />
    </>
  );
}

export default Page;
